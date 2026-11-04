import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import supabase from "@/utils/supabase-browser";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";
import Logo from "@/components/Logo";
import { SITE_NAME } from "@/utils/labels";

type CreateAccountValues = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const CreateAccount = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const formik = useFormik<CreateAccountValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof CreateAccountValues, string>> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!values.acceptTerms) {
        errors.acceptTerms = "You must accept the terms";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsPending(true);
      setErrorMessage(null);

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      setIsPending(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        // Email confirmation is disabled: user is signed in already.
        router.push("/");
        return;
      }

      setNeedsConfirmation(true);
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex flex-row justify-center items-center mb-6 w-full sm:max-w-md">
          <Link href="/login">
            <FaArrowLeft />
          </Link>
          <Link
            href="/"
            className="m-auto flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Logo className="w-8 h-8 mr-2" />
            {SITE_NAME}
          </Link>
        </div>
        <div className="w-full bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            {needsConfirmation ? (
              <div
                className="p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                Account created! Check your email to confirm your address
                before signing in.
              </div>
            ) : (
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
                {formik.errors.email && formik.touched.email && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {formik.errors.email}
                  </p>
                )}
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {formik.errors.password}
                  </p>
                )}
                <TextInput
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      name="acceptTerms"
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      checked={formik.values.acceptTerms}
                      onChange={formik.handleChange}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
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
                {formik.errors.acceptTerms && formik.touched.acceptTerms && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {formik.errors.acceptTerms}
                  </p>
                )}
                <SubmitButton disabled={isPending}>
                  Create an account
                </SubmitButton>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            )}
            {errorMessage && (
              <div
                className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
