// FormContainer.jsx

import React from "react";

const FormContainer = ({ children }) => (
  <div className="w-full border-t-8 border-r-0 border-race-red bg-gray-200 px-12 py-6 text-gray-600 shadow-xl dark:bg-gray-700 dark:text-gray-300 sm:rounded-bl-xl sm:rounded-tr-3xl sm:border-r-8 sm:p-6 transition-all duration-200">
    {children}
  </div>
);

export default FormContainer;
