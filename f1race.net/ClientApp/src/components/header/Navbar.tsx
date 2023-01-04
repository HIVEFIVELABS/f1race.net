// Navbar.jsx

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarLink from "./NavbarLink.jsx";
import Hamburger from "./Hamburger.jsx";
import Logo from "./Logo";

type LocationState = string | null;

const Navbar = () => {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationState>(null);

  const location = useLocation();

  // Close the hamburger menu when the user navigates to a new page
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      setHamburgerOpened(false);
      setLastLocation(location.pathname);
    }
  });

  const toggleHamburgerMenu = () => {
    setHamburgerOpened(!hamburgerOpened);
    console.log("Hamburger opened: " + hamburgerOpened);
  };

  return (
    <nav className="flex flex-row items-stretch justify-start uppercase tracking-wider text-white">
      <Link
        to="#"
        onClick={toggleHamburgerMenu}
        className="mr-4 block self-center md:hidden"
      >
        <Hamburger opened={hamburgerOpened} />
      </Link>
      <Link className="focus-visible-offset-dark my-5 mr-8" to="/">
        <Logo className="logo h-[24px]" />
      </Link>
      <ul className="hidden flex-row items-stretch md:flex">
        <li>
          <NavbarLink to="/">Home</NavbarLink>
        </li>
        <li>
          <NavbarLink to="/standings">Standings</NavbarLink>
        </li>
        <li>
          <NavbarLink to="/drivers">Drivers</NavbarLink>
        </li>
        <li>
          <NavbarLink to="/teams">Teams</NavbarLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
