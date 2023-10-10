import { useFormik } from "formik";
import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import CountrySelect from "../components/CountrySelect";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/authSlice";
import api from "../utils/api";
import PasswordField from "./PasswordField";

const Profile = () => {
  const user = useSelector(selectUser);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const initialValues = {
      name: user?.full_name,
      email: user?.email,
      avatar: user?.avatar_url,
      location: user?.location,
      password: "",
      confirmPassword: "",
    }

    formik.setValues(initialValues, false);
  }

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar,
      location: user?.location,
      password: "",
      confirmPassword: "",
    },
    onSubmit: values => {

    }
  });

  return (
    <section className="bg-gray-300 dark:bg-gray-900">
      <Navbar />
    <form className="flex flex-col py-8 mx-auto md:h-screen lg:py-0 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
      <div className="items-center mx-auto my-5">
        <label>
          <input className="hidden block w-full text-sm text-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-200 dark:placeholder-gray-500" aria-describedby="file_input_help" id="file_input" type="file" />
          <img className="w-32 h-32 rounded-full" src={formik.values.avatar} alt="Rounded avatar" />
        </label>
      </div>
      <div className="mb-6">
        <input
          type="name"
          id="name"
          className="h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-6">
        <input
          type="email"
          id="email"
          className="h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@flowbite.com"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <CountrySelect />
      </div>
      <span className="w-full my-6 h-px bg-gray-300 lg:w-full"></span>
      <PasswordField />
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
      <p className="my-5 text-sm font-light text-gray-500 dark:text-gray-400">
        <a href="#" className="font-small text-red-600 hover:underline dark:text-red-500">Delete account here</a>
      </p>
    </form>
    </section>
  );
}

export default Profile;

