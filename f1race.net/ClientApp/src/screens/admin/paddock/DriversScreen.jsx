// Path: frontend/src//screens/admin/DriversScreen.jsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocketIO } from "../../../features/socket/SocketContext.jsx";
import LoadingCircle from "../../../components/images/LoadingCircle.jsx";
const DriversScreen = () => {
    var _a, _b;
    const [isScraping, setIsScraping] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const io = useSocketIO();
    const logElement = useRef();
    const setLogText = useCallback((text) => {
        if (logElement.current) {
            logElement.current.innerText = text;
        }
    }, [logElement]);
    useEffect(() => {
        var _a, _b, _c, _d;
        let timeout;
        if (io) {
            (_a = io.adminSocket) === null || _a === void 0 ? void 0 : _a.on("scrape:started", () => {
                console.log("scrape:started");
                setIsScraping(true);
            });
            (_b = io.adminSocket) === null || _b === void 0 ? void 0 : _b.on("scrape", (data) => {
                var _a, _b;
                console.log((_a = data === null || data === void 0 ? void 0 : data.info) === null || _a === void 0 ? void 0 : _a.message);
                setLogText((_b = data === null || data === void 0 ? void 0 : data.info) === null || _b === void 0 ? void 0 : _b.message);
            });
            (_c = io.adminSocket) === null || _c === void 0 ? void 0 : _c.on("scrape:success", () => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Scraping successful");
                setIsScraping(false);
                setLogText("Scraping successful");
                timeout = setTimeout(() => {
                    setLogText("");
                }, 5000);
            }));
            (_d = io.adminSocket) === null || _d === void 0 ? void 0 : _d.on("scrape:error", (err) => {
                console.log(`Error: ${err}`);
                setIsScraping(false);
                setLogText(`Error: ${err}`);
                timeout = setTimeout(() => {
                    setLogText("");
                }, 3000);
            });
        }
        return () => {
            var _a;
            if (io) {
                (_a = io.adminSocket) === null || _a === void 0 ? void 0 : _a.off("scrape");
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
    return (<>
      <h2>Drivers</h2>
      {user.isAdmin && (<section id="admin-section" className="mt-2">
          <div id="sync-buttons" className="flex flex-row">
            <button className="btn" onClick={handleClickSyncStatsF1} disabled={!((_a = io.adminSocket) === null || _a === void 0 ? void 0 : _a.connected) || isScraping}>
              {<div className="relative">
                  <span className={isScraping ? "invisible" : "visible"}>
                    Sync from statsF1.com
                  </span>
                  <LoadingCircle className={[
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    isScraping ? "visible" : "invisible",
                ]
                    .join(" ")
                    .trim()}/>
                </div>}
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
              {((_b = io.adminSocket) === null || _b === void 0 ? void 0 : _b.connected) ? (<span className="not-italic text-green-600 dark:text-green-400">
                  Ready
                </span>) : (<span className="not-italic text-race-red">Ready</span>)}
            </div>
            <div ref={logElement} id="log"></div>
          </div>
        </section>)}
    </>);
};
export default DriversScreen;
//# sourceMappingURL=DriversScreen.jsx.map