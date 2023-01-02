// Path: frontend/src//screens/admin/DriversScreen.jsx

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocketIO } from "../../../features/socket/SocketContext.jsx";
import LoadingCircle from "../../../components/images/LoadingCircle.jsx";
import StoreState from "../../../StoreState";

type ScrapeInfo = {
  message: string;
};

type ScrapeData = {
  info: ScrapeInfo;
};

const DriversScreen = () => {
  const [isScraping, setIsScraping] = useState(false);
  const { user } = useSelector((state: StoreState) => state.auth);

  const dispatch = useDispatch();
  const io = useSocketIO();

  const logElement = useRef<HTMLDivElement | null>();

  const setLogText = useCallback(
    (text: string) => {
      if (logElement.current) {
        logElement.current.innerText = text;
      }
    },
    [logElement]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (io) {
      io.adminSocket?.on("scrape:started", () => {
        console.log("scrape:started");
        setIsScraping(true);
      });
      io.adminSocket?.on("scrape", (data: ScrapeData) => {
        console.log(data?.info?.message);
        setLogText(data?.info?.message);
      });
      io.adminSocket?.on("scrape:success", async () => {
        console.log("Scraping successful");
        setIsScraping(false);
        setLogText("Scraping successful");
        timeout = setTimeout(() => {
          setLogText("");
        }, 5000);
      });
      io.adminSocket?.on("scrape:error", (err) => {
        console.log(`Error: ${err}`);
        setIsScraping(false);
        setLogText(`Error: ${err}`);
        timeout = setTimeout(() => {
          setLogText("");
        }, 3000);
      });
    }

    return () => {
      if (io) {
        io.adminSocket?.off("scrape");
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [io]);

  const handleClickSyncStatsF1 = useCallback(() => {
    io.adminSocket.emit("syncStatsF1");
    console.log("syncStatsF1");
    // dispatch(scrapeDrivers({ source: "statsF1" }));
  }, []);

  return (
    <>
      <h2>Drivers</h2>
      {user.isAdmin && (
        <section id="admin-section" className="mt-2">
          <div id="sync-buttons" className="flex flex-row">
            <button
              className="btn"
              onClick={handleClickSyncStatsF1}
              disabled={!io.adminSocket?.connected || isScraping}
            >
              {
                <div className="relative">
                  <span className={isScraping ? "invisible" : "visible"}>
                    Sync from statsF1.com
                  </span>
                  <LoadingCircle
                    className={[
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      isScraping ? "visible" : "invisible",
                    ]
                      .join(" ")
                      .trim()}
                  />
                </div>
              }
            </button>
            <button className="btn ml-1" disabled>
              Sync from Ergast API
            </button>
            <button className="btn ml-1" disabled>
              Sync from formula1.com
            </button>
          </div>

          <div id="log-container" className="mt-2 text-xs italic text-gray-400">
            <div>
              Connection status:&nbsp;
              {io.adminSocket?.connected ? (
                <span className="not-italic text-green-600 dark:text-green-400">
                  Ready
                </span>
              ) : (
                <span className="not-italic text-race-red">Ready</span>
              )}
            </div>
            <div ref={logElement} id="log"></div>
          </div>
        </section>
      )}
    </>
  );
};

export default DriversScreen;
