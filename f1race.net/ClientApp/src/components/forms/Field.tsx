// ClientApp/src/components/forms/Field.tsx

import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid/index.js";
import PropTypes from "prop-types";
import { FieldError } from "react-hook-form";

type Props = {
  autoFocus?: boolean;
  error?: FieldError;
  label?: string;
  className?: string;
  register?: any;

  [key: string]: any;
};

const Field = ({
  autoFocus,
  label,
  error,
  className,
  register,
  ...rest
}: Props) => {
  const inputParams = register && rest.name ? register(rest.name) : null;

  const classNames = [
    "field aria-[invalid=true]:text-race-red aria-[invalid=true]:ring-race-red",
    className,
  ].join(" ");

  return (
    <div className="mb-4 flex flex-col text-left">
      {label && rest.name && (
        <label className="label" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <input
        className={classNames}
        aria-invalid={error ? "true" : "false"}
        autoFocus={autoFocus}
        {...inputParams}
        {...rest}
      />
      {error && (
        <div className="mt-0.5 flex flex-row items-center text-sm text-race-red">
          <ExclamationCircleIcon className="mr-1.5 h-[20x] w-[20px]" />
          <span className="mt-1 font-bold" role="alert">
            {error.message}
          </span>
        </div>
      )}
    </div>
  );
};

Field.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.object,
  className: PropTypes.string,
  register: PropTypes.func,
};

export default Field;
