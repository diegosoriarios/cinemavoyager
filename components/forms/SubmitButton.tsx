import React from "react";

const buttonClasses =
  "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function SubmitButton({
  children,
  className = buttonClasses,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button type="submit" className={className} disabled={disabled}>
      {children}
    </button>
  );
}
