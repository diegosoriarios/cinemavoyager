import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";
import supabase from "@/utils/supabase-browser";

const ResetPassword = () => {
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasRecoverySession(Boolean(data.session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setHasRecoverySession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);

      if (values.password.length < 6) {
        setStatus("Password must be at least 6 characters long.");
        setSubmitting(false);
        return;
      }

      if (values.password !== values.confirmPassword) {
        setStatus("Passwords do not match.");
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        setStatus(error.message);
      } else {
        setDone(true);
      }

      setSubmitting(false);
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Choose a new password
          </h2>
          {done ? (
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                Your password has been updated.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Go to login
              </Link>
            </div>
          ) : (
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={formik.handleSubmit}
            >
              {!hasRecoverySession && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Open the reset link from your email to verify your identity,
                  then set a new password here.
                </p>
              )}
              <TextInput
                label="New password"
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
              {formik.status && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {formik.status}
                </p>
              )}
              <SubmitButton disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Saving..." : "Reset password"}
              </SubmitButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
