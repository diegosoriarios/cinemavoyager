import React from "react";

const buttonClasses =
  "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton({
  children,
  className = buttonClasses,
}: SubmitButtonProps) {
  return (
    <button type="submit" className={className}>
      {children}
    </button>
  );
}
