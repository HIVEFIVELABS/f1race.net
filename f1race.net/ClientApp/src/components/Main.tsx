// ClientApp/src/components/Main.tsx

import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Main = ({ children }: Props) => (
  <main className="mx-auto flex w-full max-w-7xl grow flex-col content-center justify-start">
    {children}
  </main>
);

export default Main;
