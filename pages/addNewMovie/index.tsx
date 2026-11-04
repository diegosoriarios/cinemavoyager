import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import CountrySelect from "@/components/CountrySelect";
import Multiselect from "@/components/Multiselect";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";
import { useFormik } from "formik";
import { getCountryCodeByName } from "@/utils/country_code";

type AddNewMovieValues = {
  name: string;
  image: string;
  year: string;
  genres: string[];
  country: string;
  sinopsis: string;
};

const AddNewMovieForm = () => {
  const formik = useFormik<AddNewMovieValues>({
    initialValues: {
      name: "",
      image: "",
      year: "",
      genres: [],
      country: "",
      sinopsis: ""
    },
    onSubmit: () => {
      // Wired to the movie suggestion submission in the next phase.
    }
  });

  const handleChange = (genresArray: { name: string }[]) => {
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
          <TextInput
            label="Name"
            name="name"
            placeholder="Name of the movie"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextInput
            label="Image"
            name="image"
            placeholder="Add the image url"
            required
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          <TextInput
            label="Year"
            name="year"
            placeholder="Release year"
            required
            value={formik.values.year}
            onChange={formik.handleChange}
          />
          <div>
            <Multiselect handleChange={handleChange} />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
            <CountrySelect handleSelect={handleSelect} />
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
              value={formik.values.sinopsis}
              onChange={formik.handleChange}
            />
          </div>
          <SubmitButton className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Send movie request
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default AddNewMovieForm;
