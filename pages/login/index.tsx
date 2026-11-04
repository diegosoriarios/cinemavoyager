import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogin,
  selectIsLoggedIn,
  selectIsLoggedInError,
  selectIsLoggedInPending,
} from "@/stores/authSlice";
import type { AppDispatch } from "@/stores/store";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";

const Login = () => {
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoginError = useSelector(selectIsLoggedInError);
  const isLoginPending = useSelector(selectIsLoggedInPending);

  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(fetchLogin({
        email: values.email,
        password: values.password
      }));

      if (isLoginError) return;

      router.push("/");
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <TextInput
                label="Your email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="/forgotPassword"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <SubmitButton>Sign in</SubmitButton>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/createAccount"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
            {isLoginPending && (
              <div
                className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                Please wait...
              </div>
            )}
            {isLoggedIn && (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                Success.
              </div>
            )}
            {isLoginError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                Invalid email or password.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
