// Main.jsx

import React from "react";

const Main = ({ children }) => (
  <main className="mx-auto flex w-full max-w-7xl grow flex-col content-center justify-start">
    {children}
  </main>
);

export default Main;
