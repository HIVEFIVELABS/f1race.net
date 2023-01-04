// Path: ClientApp/src/components/FormBase.tsx

import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const FormBase = ({ title, children }: Props) => (
  <div className="flex flex-col">
    {title && (
      <div>
        <h2 className="mb-6 font-f1 text-3xl font-medium">{title}</h2>
        <hr className="mb-8" />
      </div>
    )}
    {children}
  </div>
);

export default FormBase;
