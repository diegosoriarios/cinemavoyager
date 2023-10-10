import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import CountrySelect from "../components/CountrySelect";
import Multiselect from "../components/Multiselect";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/authSlice";
import { useFormik } from "formik";
import { getCountryCodeByName } from "../utils/country_code";
import { selectTheme } from "../stores/themeSlice";

const AddNewMovieForm = (author = "username") => {
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  console.log(theme);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      year: "",
      genres: [],
      country: "",
      sinopsis: ""
    },
    onSubmit: values => {
      const body = {
        ...values,
        id: user
      }
      console.log(body);
    }
  });

  const handleChange = (genresArray: String[]) => {
    const array = genresArray.map(({ name }) => name).toString();
    formik.setFieldValue("genres", array)
  }

  const handleSelect = (value: string) => {
    const code = getCountryCodeByName(value);
    
    formik.setFieldValue("country", code);
  }

  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <Link href="/">
          <FaArrowLeft />
        </Link>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Send a new movie
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Do you know a good movie from a country with less visibility in cinema. Let us know.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Name of the movie"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Add the image url"
              required
              value={formik.values.image}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="year"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Release year"
              required
              value={formik.values.year}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Multiselect handleChange={handleChange} />
          </div>
          <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
            <CountrySelect handleSelect={handleSelect}/>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="sinopsis"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Sinopsis
            </label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              rows={6}
              className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add the sinopsis of the movie"
              defaultValue={""}
              value={formik.values.sinopsis}
              onChange={formik.handleChange}
            />
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send movie request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMovieForm;
