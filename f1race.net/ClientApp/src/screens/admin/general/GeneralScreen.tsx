// ./screens/admin/general/GeneralScreen.jsx

import { NavLink, Outlet } from "react-router-dom";
import HeaderScreen from "./HeaderScreen";
import FooterScreen from "./FooterScreen";

export const subScreens = [
  {
    path: "header",
    text: "Header",
    element: <HeaderScreen />,
  },
  {
    path: "footer",
    text: "Footer",
    element: <FooterScreen />,
  },
];

export const createChildRoutes = () =>
  subScreens.map(({ path, text, element }) => ({
    path,
    element,
    handle: {
      crumb: () => (
        <NavLink
          to={`/administrate/general/${path}`}
          className="[&.active]:pointer-events-none [&.active]:text-gray-500 dark:[&.active]:text-gray-400"
        >
          {text}
        </NavLink>
      ),
    },
  }));

const GeneralScreen = () => {
  return (
    <div className="flex flex-col">
      <nav>
        <ul id="tabs" className="tabs">
          {subScreens.map(({ path, text }) => (
            <li key={path}>
              <NavLink
                to={`/administrate/general/${path}`}
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

export default GeneralScreen;
