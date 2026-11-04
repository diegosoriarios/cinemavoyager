import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAddAlarm,
  MdDarkMode,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLogout,
  MdSend,
} from "react-icons/md";
import type { ReactNode } from "react";
import { logout } from "@/stores/authSlice";
import { selectTheme, toggleTheme } from "@/stores/themeSlice";
import type { AppDispatch } from "@/stores/store";
import type { AuthUser } from "@/types/user";

const itemBaseClasses =
  "group flex w-full items-center rounded-md px-2 py-2 text-sm";
const itemActiveClasses = "bg-blue-500 text-white";
const itemIdleClasses = "text-gray-900";

type NavMenuItemProps = {
  href?: string;
  onClick?: () => void;
  highlighted?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

const NavMenuItem = ({
  href,
  onClick,
  highlighted = false,
  icon,
  children,
}: NavMenuItemProps) => {
  const classes = `${
    highlighted ? itemActiveClasses : itemIdleClasses
  } ${itemBaseClasses}`;
  const content = (
    <>
      {icon && (
        <span className="mr-2 flex h-5 w-5 items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  );

  return (
    <Menu.Item>
      {({ active }) =>
        href ? (
          <Link
            href={href}
            className={`${active ? itemActiveClasses : classes}`}
          >
            {content}
          </Link>
        ) : (
          <button
            onClick={onClick}
            className={`${active ? itemActiveClasses : classes}`}
          >
            {content}
          </button>
        )
      }
    </Menu.Item>
  );
};

const NavThemeToggle = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <NavMenuItem
      onClick={() => dispatch(toggleTheme())}
      highlighted={theme === "dark"}
      icon={
        theme === "dark" ? (
          <MdDarkMode className="h-5 w-5" />
        ) : (
          <MdOutlineDarkMode className="h-5 w-5" />
        )
      }
    >
      Dark Mode
    </NavMenuItem>
  );
};

const loginButtonClasses =
  "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const GuestMenuItems = () => (
  <>
    <div className="px-1 py-1">
      <Menu.Item>
        <Link href="/login" className={loginButtonClasses}>
          Login
        </Link>
      </Menu.Item>
    </div>
    <div className="px-1 py-1">
      <NavThemeToggle />
    </div>
  </>
);

const UserMenuItems = ({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout(user.email ?? ""));
    onLogout?.();
  };

  return (
    <>
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900">
          {user.full_name ?? user.email}
        </span>
        <span className="block truncate text-sm font-medium text-gray-500">
          {user.email}
        </span>
      </div>
      <div className="px-1 py-1 ">
        <NavMenuItem href="/bookmarks" icon={<MdAddAlarm className="h-5 w-5" />}>
          Quero ver
        </NavMenuItem>
        <NavMenuItem href="/addNewMovie" icon={<MdSend className="h-5 w-5" />}>
          Enviar filme
        </NavMenuItem>
      </div>
      <div className="px-1 py-1">
        <NavMenuItem
          href="/profile"
          icon={<MdOutlineAccountCircle className="h-5 w-5" />}
        >
          Minha conta
        </NavMenuItem>
        <NavThemeToggle />
      </div>
      <div className="px-1 py-1">
        <NavMenuItem
          onClick={handleLogout}
          icon={<MdOutlineLogout className="h-5 w-5" />}
        >
          Sair
        </NavMenuItem>
      </div>
    </>
  );
};

export { GuestMenuItems, UserMenuItems };
