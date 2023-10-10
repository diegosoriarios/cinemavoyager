import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import {
  MdAddAlarm,
  MdDarkMode,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLogout,
  MdSend,
} from "react-icons/md";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn, selectUser } from "../stores/authSlice";
import { selectTheme, toggleTheme } from "../stores/themeSlice";
import { SITE_NAME } from "../utils/labels";

const user = {
  name: "Diego Soria Rios",
  email: "diegosoriarios@gmail.com",
};

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const theme = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(user.email));
  };

  const setTheme = () => {
    dispatch(toggleTheme({}));
  };

  if (!isLoggedIn) {
    return (
      <nav className="flex flex-row justify-between bg-gray-300-500 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <a href="http://localhost:3000/" className="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={100}
            height={100}
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
            {SITE_NAME}
          </span>
        </a>
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  alt="user photo"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    <Link
                      href="/login"
                      type="button"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login
                    </Link>
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={setTheme}
                        className={`${
                          theme === "dark"
                            ? "bg-blue-500 text-white"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {theme === "dark" ? (
                          <MdDarkMode
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <MdOutlineDarkMode
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Dark Mode
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex flex-row justify-between bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <a href="http://localhost:3000/" className="flex items-center">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          width={100}
          height={100}
          className="h-6 mr-3 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          {SITE_NAME}
        </span>
      </a>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={user.avatar_url}
                alt="user photo"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-gray-900">
                  {user.name}
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/bookmarks"
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdAddAlarm className="mr-2 h-5 w-5" aria-hidden="true" />
                      Quero ver
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/addNewMovie"
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdSend className="mr-2 h-5 w-5" aria-hidden="true" />
                      Enviar filme
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlineAccountCircle
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Minha conta
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={setTheme}
                      className={`${
                        theme === "dark"
                          ? "bg-blue-500 text-white"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {theme === "dark" ? (
                        <MdDarkMode
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <MdOutlineDarkMode
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Dark Mode
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlineLogout
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Sair
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
