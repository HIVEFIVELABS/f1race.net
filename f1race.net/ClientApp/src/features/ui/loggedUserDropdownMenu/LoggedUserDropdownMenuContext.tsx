// Path: ClientApp/src/features/ui/loggedUserDropdownMenu/LoggedUserDropdownMenuContext.jsx

import React, {createContext, useContext, useState} from "react";

const LoggedUserDropdownMenuContext = createContext({
  isOpen: false,
  toggle: () => {
  },
  hide: () => {
  },
});

type Props = {
  children?: React.ReactNode;
};

export const LoggedUserDropdownMenuProvider = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const hide = () => {
    setIsOpen(false);
  };
  const show = () => {
    setIsOpen(true);
  };

  const value = {isOpen, toggle, hide};

  return (
    <LoggedUserDropdownMenuContext.Provider value={value}>
      {children}
    </LoggedUserDropdownMenuContext.Provider>
  );
};

export const useLoggedUserDropdownMenuContext = () =>
  useContext(LoggedUserDropdownMenuContext);
