// Path: ClientApp/src/components/Breadcrumbs.tsx

import React from "react";
import { useMatches } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

interface Match {
  handle: {
    crumb: any;
  };
}

const hasCrumb = (match: any): match is Match => {
  return match && match.handle && match.handle.crumb;
};

const Breadcrumbs = () => {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => hasCrumb(match))
    .map((match) => (match as Match)?.handle.crumb(match.data));

  return (
    <ol className="flex flex-row text-sm">
      {
        // Create list items for each crumb and separate them with a slash
        crumbs.map((crumb, index) => (
          <li key={index} className="flex flex-row items-center">
            {crumb}
            {index < crumbs.length - 1 && (
              <ChevronRightIcon className="mx-2 mt-1 inline-block h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </li>
        ))
      }
    </ol>
  );
};

export default Breadcrumbs;
