import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    onSubmit: () => {
      // Wired to the password reset flow in the next phase.
    }
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex flex-row justify-center items-center mb-6 w-full sm:max-w-md">
          <Link href="/login">
            <FaArrowLeft />
          </Link>
          <a
            href="#"
            className="m-auto flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a>
        </div>
        <div className="w-full p-6 bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
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
              label="New Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextInput
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  name="acceptTerms"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <SubmitButton>Reset passwod</SubmitButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
