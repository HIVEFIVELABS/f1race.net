// Footer.jsx

import React, {useMemo} from "react";
import LayoutContainer from "../LayoutContainer.jsx";
import {Link, useLocation} from "react-router-dom";

const Footer = () => {

  const location = useLocation();

  const copyYear = useMemo(() => {
    let year = new Date().getFullYear();
    return year > 2022 ? `2022 - ${year}` : year;
  }, [location.pathname]);

  return (
    <footer className="flex h-24 w-full flex-col items-center justify-center bg-gray-300 text-sm text-gray-700 dark:bg-black dark:text-gray-200">
      <LayoutContainer className="py-3">
        <div className="flex flex-row justify-end">Social media</div>
        <hr className="border-t dark:border-gray-700" />
        <div className="flex flex-row items-center justify-end dark:text-gray-300">
          Copyright &copy; {copyYear} f1race.net | Created by&nbsp;
          <Link to="https://linktr.ee/jiridusek" target="_blank">
            JD
          </Link>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;