// Administration.jsx

import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import {NavLink, Outlet, RouteObject} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import GeneralScreen, * as generalScreen from "./general/GeneralScreen";
import PaddockScreen, * as paddockScreen from "./paddock/PaddockScreen";

type Screen = {
  path: string;
  text: string;
  element?: React.ReactNode;
  children?: Screen[];
}

const subScreens: Screen[] = [
  {
    path: "general",
    text: "General",
    element: <GeneralScreen/>,
    children: generalScreen.subScreens,
  },
  {
    path: "editorial",
    text: "Editorial",
    children: [
      {
        path: "categories",
        text: "Categories",
      },
      {
        path: "posts",
        text: "Posts",
      },
    ],
  },
  {
    path: "paddock",
    text: "Paddock",
    element: <PaddockScreen/>,
    children: paddockScreen.subScreens,
  },
  {
    path: "campaigns",
    text: "Campaigns",
    children: [
      {
        path: "banners",
        text: "Banners",
      },
      {
        path: "mailing",
        text: "Mailing",
      },
    ],
  },
  {
    path: "users",
    text: "Users",
  },
];

export const createChildRoutes = () => {
  // Create routes recursively
  const createRoutes = (screens: Screen[], parentPath: string | null): RouteObject[] => {
    return screens.map((screen) => {

      const fullPath = parentPath ? `${parentPath}/${screen.path}` : screen.path;

      const route: RouteObject = {
        path: screen.path,
        element: screen.element,
        handle: {
          crumb: () => (
            <NavLink
              to={fullPath}
              className="[&.active]:pointer-events-none [&.active]:text-gray-500 dark:[&.active]:text-gray-400"
            >
              {screen.text}
            </NavLink>
          ),
        },
        children: screen.children ? createRoutes(screen.children, fullPath) : [],
      };

      return route;
    });
  };

  // Create routes
  return createRoutes(subScreens, null);
};

const AdministrationScreen = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <AdminNavbar/>
      </header>
      <main className="flex min-h-full grow flex-row items-stretch">
        {/* Left Sidebar */}
        <div
          id="left-sidebar"
          className="fixed flex max-h-full w-[20rem] flex-row overflow-y-auto p-4 pb-6"
        >
          <nav className="w-full">
            {
              // Menu items
              subScreens.map(({path, text, children}) => (
                <ul key={path} className="menu">
                  <NavLink
                    to={`/administrate/${
                      children ? `${path}/${children[0].path}` : path
                    }`}
                    className="menu-item focus-visible:offset-ring"
                  >
                    {text}
                  </NavLink>
                  {children && (
                    <ul className="submenu">
                      {children.map(({path: subPath, text}) => (
                        <li key={subPath}>
                          <NavLink
                            to={`/administrate/${path}/${subPath}`}
                            className="menu-item"
                          >
                            {text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>
              ))
            }
          </nav>
        </div>

        {/* Center Column */}
        <div
          id="center-column"
          className="m-4 flex min-h-full grow flex-col px-[20rem]"
        >
          {/* Breadcrumbs */}
          <div className="mb-4 flex flex-row flex-wrap">
            <Breadcrumbs/>
          </div>
          {/* Main Content */}
          <div id="main-content" className="flex flex-grow flex-col flex-wrap">
            <Outlet/>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          id="right-sidebar"
          className="fixed right-0 flex max-h-full w-[20rem] flex-row overflow-y-auto"
        >
          <nav className="w-full px-3">
            <ul className="menu"></ul>
          </nav>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default AdministrationScreen;
