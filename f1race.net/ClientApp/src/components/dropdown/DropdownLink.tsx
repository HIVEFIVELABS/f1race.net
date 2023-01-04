// DropdownLink.jsx

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLoggedUserDropdownMenuContext } from "../../features/ui/loggedUserDropdownMenu/LoggedUserDropdownMenuContext.jsx";

type Props = {
  to: string;
  onClick?: () => void;
  iconElement?: React.ReactElement;
  text: string;
};

const DropdownLink = ({ to, onClick, iconElement, text, ...rest }: Props) => {
  const dropdownMenu = useLoggedUserDropdownMenuContext();

  if (iconElement) {
    const classNames = iconElement.props?.className;
    // set className for iconElement
    iconElement = React.cloneElement(iconElement, {
      className: ["icon mr-5", classNames].join(" ").trimEnd(),
    });
  }

  return (
    <Link
      tabIndex={dropdownMenu.isOpen ? 0 : -1}
      className="focus-visible-offset never-underline flex flex-row flex-nowrap items-center px-5 py-3 font-sans normal-case text-black shadow-none transition-all duration-200 focus-visible:bg-race-red focus-visible:shadow-lg focus-visible:shadow-race-red/50 hover:bg-race-red hover:text-white hover:shadow-lg hover:shadow-race-red/50 dark:text-gray-300"
      to={to}
      onClick={() => {
        dropdownMenu.hide();
        if (onClick) onClick();
      }}
      {...rest}
    >
      {iconElement}
      <span className="text-md">{text}</span>
    </Link>
  );
};

DropdownLink.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  iconElement: PropTypes.element,
};

export default DropdownLink;
