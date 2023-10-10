import Link from "next/link";
import React from "react";

export default function EmptyState() {
  return (
    <section className="dark:bg-gray-900 bg-gray-100 py-4 bg-neutral-50 overflow-hidden">
      <div className="container px-4 mx-auto">
        <img className="mx-auto" src="dashy-assets/images/empty.png" alt="" />
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-heading mb-3 text-2xl font-semibold">
            It&rsquo;s a bit empty here
          </h2>
          <p className="mb-7 text-neutral-500">
            If you have any movie to recommend from this country send it to us.
          </p>
          <Link
            className="m-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href="/addNewMovie"
          >
            Add First Movie
          </Link>
        </div>
      </div>
    </section>
  );
}
