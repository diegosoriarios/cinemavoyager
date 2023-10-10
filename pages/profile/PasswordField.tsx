import React from "react";

const PasswordField = () => {
  return (<></>)
  return (
    <>
      <div className="mb-6 divide-y divide-gray-300">
        <input
          type="password"
          id="password"
          placeholder="change password"
          className="h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-6">
        <input
          type="confirmPassword"
          id="confirmPassword"
          placeholder="confirm change password"
          className="h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={!!formik.values.password}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </div>
    </>
  );
};

export default PasswordField;
