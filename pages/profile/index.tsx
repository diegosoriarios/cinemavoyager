import { useFormik } from "formik";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/NavBar";
import CountrySelect from "@/components/CountrySelect";
import TextInput from "@/components/forms/TextInput";
import SubmitButton from "@/components/forms/SubmitButton";
import { fetchProfile, locationChanged, selectUser } from "@/stores/authSlice";
import type { AppDispatch } from "@/stores/store";
import { getCountryAlpha2ByName, getCountryNameByAlpha2 } from "@/utils/flags";
import api from "@/utils/api";
import supabase from "@/utils/supabase-browser";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      avatar: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setStatus(undefined);

      if (values.password && values.password !== values.confirmPassword) {
        setStatus("Passwords do not match.");
        setSubmitting(false);
        return;
      }

      try {
        await api.patch("/profile", {
          full_name: values.name,
          avatar_url: values.avatar,
          location: values.location,
        });

        if (values.password) {
          const { error } = await supabase.auth.updateUser({
            password: values.password,
          });
          if (error) throw error;
        }

        await dispatch(fetchProfile());
        if (values.location) dispatch(locationChanged(values.location));

        resetForm({
          values: { ...values, password: "", confirmPassword: "" },
        });
        setStatus("Profile saved.");
      } catch (e) {
        setStatus("Could not save your profile. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!user) return;
    formik.setValues(
      {
        name: user.full_name ?? "",
        email: user.email ?? "",
        avatar: user.avatar_url ?? "",
        location: user.location ?? "",
        password: "",
        confirmPassword: "",
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.full_name, user?.email, user?.avatar_url, user?.location]);

  return (
    <section className="bg-gray-100 dark:bg-gray-950">
      <Navbar />
      <form
        className="flex flex-col py-8 mx-auto md:h-screen lg:py-0 rounded-lg md:mt-0 sm:max-w-md xl:p-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="items-center mx-auto my-5">
          <Image
            className="w-32 h-32 rounded-full object-cover"
            src={formik.values.avatar || "/favicon.svg"}
            alt="Avatar"
            width={128}
            height={128}
            unoptimized
          />
        </div>
        <div className="mb-6">
          <TextInput
            label="Name"
            name="name"
            placeholder="name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-6">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="email@flowbite.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled
          />
        </div>
        <div className="mb-6">
          <TextInput
            label="Avatar URL"
            name="avatar"
            placeholder="https://..."
            value={formik.values.avatar}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <CountrySelect
            defaultValue={getCountryNameByAlpha2(formik.values.location)}
            handleSelect={(country) =>
              formik.setFieldValue("location", getCountryAlpha2ByName(country))
            }
          />
        </div>
        <span className="w-full my-6 h-px bg-gray-300 dark:bg-white/10 lg:w-full"></span>
        <div className="mb-6">
          <TextInput
            label="New password (optional)"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-6">
          <TextInput
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        </div>
        {formik.status && (
          <p
            className={`mb-4 text-sm ${
              formik.status === "Profile saved."
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
            role="status"
          >
            {formik.status}
          </p>
        )}
        <SubmitButton disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Saving..." : "Save"}
        </SubmitButton>
        <p className="my-5 text-sm font-light text-gray-500 dark:text-gray-400">
          <a href="#" className="font-small text-red-600 hover:underline dark:text-red-500">
            Delete account here
          </a>
        </p>
      </form>
    </section>
  );
};

export default Profile;
