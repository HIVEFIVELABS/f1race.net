// ./screens/admin/general/PaddockScreen.jsx

import { NavLink, Outlet } from "react-router-dom";
import DriversScreen from "./DriversScreen";
import CircuitsScreen from "./CircuitsScreen";
import TeamsScreen from "./TeamsScreen";

export const subScreens = [
  {
    path: "teams",
    text: "Teams",
    element: <TeamsScreen />,
  },
  {
    path: "drivers",
    text: "Drivers",
    element: <DriversScreen />,
  },
  {
    path: "circuits",
    text: "Circuits",
    element: <CircuitsScreen />,
  },
];

const PaddockScreen = () => {
  return (
    <div className="flex flex-col">
      <nav>
        <ul id="tabs" className="tabs">
          {subScreens.map(({ path, text }) => (
            <li key={path}>
              <NavLink
                to={`/administrate/paddock/${path}`}
                className="tab flex flex-row items-center"
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default PaddockScreen;
