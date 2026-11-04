import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";
import supabase from "@/utils/supabase-browser";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);

      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setStatus(error.message);
      } else {
        setSent(true);
      }

      setSubmitting(false);
    },
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
            Forgot your password?
          </h2>
          {sent ? (
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                We sent a password reset link to your email. Open it to choose a
                new password.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                Enter the email associated with your account and we will send
                you a link to reset your password.
              </p>
              <TextInput
                label="Your email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.status && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {formik.status}
                </p>
              )}
              <SubmitButton disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Sending..." : "Send reset link"}
              </SubmitButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
