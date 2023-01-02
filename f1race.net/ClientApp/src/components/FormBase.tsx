// FormBase.jsx

import React from "react";

const FormBase = ({ title, children }) => (
  <div className="flex flex-col">
    {title && (
      <div>
        <h2 className="mb-6 font-f1 font-medium text-3xl">{title}</h2>
        <hr className="mb-8" />
      </div>
    )}
    {children}
  </div>
);

export default FormBase;
