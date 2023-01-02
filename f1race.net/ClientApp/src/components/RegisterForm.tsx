// RegisterForm.jsx

import React, {useEffect} from "react";
import Form from "./FormBase.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {
    clearAuthResponse,
    registerUser,
} from "../features/auth/authSlice.jsx";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Field from "./forms/Field.jsx";
import validationSchema from "../validation/registerValidation.jsx";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline/index.js";
import {UserRegData} from "../features/auth/UserInterfaces";
import {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {ValidationError} from "yup";

const RegisterForm = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<UserRegData>({mode: "onTouched", resolver: yupResolver(validationSchema)});

    const {loading, user, error, success} = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const {redirectTo} = location.state ?? {redirectTo: "/"};

    const navigate = useNavigate();

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (success) {
            // navigate to login page after 3 seconds
            timerId = setTimeout(() => {
                dispatch(clearAuthResponse());
                navigate("/login", {
                    state: {redirectTo: redirectTo},
                });
            }, 3000);
        }
        if (user) {
            navigate("/");
        }
        return () => clearTimeout(timerId);
    }, [dispatch, user, success]);

    const onSubmit: SubmitHandler<UserRegData> = (data) => {

        dispatch(registerUser(data))
            .unwrap()
            .then(() => {
                console.log("Register successfully!");
            })
            .catch(() => {
                console.log("Register failed!");
            });
    };

    return (
        <Form title="Sign up">
            <form onSubmit={handleSubmit(onSubmit)}>
                {success && (
                    <div
                        className="mb-4 flex flex-row items-center rounded-md bg-green-500 p-5 text-center font-bold text-white shadow-xl dark:bg-green-700 dark:text-gray-100">
                        <CheckCircleIcon className="mr-5 h-[48px] w-[48px]"/>
                        <span className="grow">
              Register successfully!
              <br/> You will be redirected to the login page.
            </span>
                    </div>
                )}
                {error && (
                    <div
                        className="mb-4 flex flex-row items-center rounded-md bg-race-red p-5 text-center font-bold text-white shadow-xl">
                        <ExclamationCircleIcon className="h-[48px] w-[48px]"/>
                        <span className="grow">{(error instanceof ValidationError) ? error.message : error}</span>
                    </div>
                )}
                {!success && (
                    <>
                        <Field
                            type="text"
                            name="nickname"
                            label="Nickname"
                            placeholder="Nickname"
                            register={register}
                            error={errors.nickname}
                        />
                        <Field
                            autoComplete="username"
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
                        <Field
                            type="password"
                            name="confirmPassword"
                            label="Confirm password"
                            placeholder="Confirm password"
                            register={register}
                            error={errors.confirmPassword}
                        />
                        <div className="flex flex-row justify-center">
                            <button
                                type="submit"
                                className="btn btn-primary mt-5"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                    </>
                )}
            </form>
        </Form>
    );
};

export default RegisterForm;
