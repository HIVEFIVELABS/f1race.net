// LoginForm.jsx

import React, { useEffect } from "react";
import FormBase from "./FormBase.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../validation/loginValidation.jsx";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { loginUser } from "../features/auth/authSlice.jsx";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline/index.js";
import Field from "./forms/Field.jsx";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(validationSchema) });

  const { loading, user, userToken, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { redirectTo } = location.state ?? { redirectTo: "/" };

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [navigate, user]);

  const onSubmit = (formValue) => {
    const { email, password } = formValue;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        console.log("Login successfully!");
      })
      .catch(() => {
        console.log("Login failed!");
      });
  };

  return (
    <FormBase title="Sign in">
      <form onSubmit={handleSubmit(onSubmit)}>
        {success && (
          <div className="mb-4 flex flex-row items-center rounded-md bg-green-500 p-5 text-center font-bold text-white shadow-xl dark:bg-green-700 dark:text-gray-100">
            <CheckCircleIcon className="mr-5 h-[48px] w-[48px]" />
            <span>Welcome back, {user.nickname}!</span>
          </div>
        )}
        {error && (
          <div className="mb-4 flex flex-row items-center rounded-md bg-race-red p-5 text-center font-bold text-white shadow-xl">
            <ExclamationCircleIcon className="mr-5 h-[48px] w-[48px]" />
            <span>{error}</span>
          </div>
        )}
        {!success && (
          <>
            <Field
              autoComplete="username"
              autoFocus={true}
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              register={register}
              error={errors.email}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              register={register}
              error={errors.password}
            />
            <div className="flex flex-row justify-center">
              <button
                type="submit"
                className="btn btn-primary mt-5"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </>
        )}
      </form>
    </FormBase>
  );
};

export default LoginForm;
