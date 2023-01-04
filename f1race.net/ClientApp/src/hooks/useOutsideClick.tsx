// Path: ClientApp/src/hooks/useOutsideClick.tsx

import React, { ReactNode, useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (evt: MouseEvent) => {
      if (
        evt.target instanceof Element &&
        ref.current &&
        !ref.current.contains(evt.target)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};
