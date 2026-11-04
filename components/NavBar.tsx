import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "@/stores/authSlice";
import { SITE_NAME } from "@/utils/labels";
import { GuestMenuItems, UserMenuItems } from "./NavBarMenu";

const PLACEHOLDER_AVATAR =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const transitionProps = {
  as: Fragment,
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <nav className="flex flex-row justify-between bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <Link href="/" className="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-6 mr-3 sm:h-9"
          alt="Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
          {SITE_NAME}
        </span>
      </Link>
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
                src={user?.avatar_url || PLACEHOLDER_AVATAR}
                alt="user photo"
              />
            </Menu.Button>
          </div>
          <Transition {...transitionProps}>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isLoggedIn && user ? (
                <UserMenuItems user={user} />
              ) : (
                <GuestMenuItems />
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
