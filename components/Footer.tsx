import React from "react";
import Link from "next/link";
import { SITE_NAME } from "@/utils/labels";
import Logo from "./Logo";

const Footer = () => {
    return (
      <footer className="border-t border-black/5 bg-white/95 px-4 py-8 backdrop-blur md:px-6 md:py-8 dark:border-white/10 dark:bg-gray-950/90">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Logo className="h-8 w-8 mr-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">{SITE_NAME}</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-white/10 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©<Link href="/" className="hover:underline">{SITE_NAME}</Link>. All Rights Reserved.
        </span>
      </footer>
    );
};

export default Footer;
