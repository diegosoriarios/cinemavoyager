import { Listbox } from "@headlessui/react";
import React, { useState } from "react";
import { countriesFlags, getFlagByCountryNameMini } from "../utils/flags";

const CountrySelect = ({ handleSelect }) => {
  const [selectedPerson, changeSelected] = useState("");

  const setSelectedPerson = (value) => {
    changeSelected(value);
    handleSelect(value);
  }

  return (
    <>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button className="h-10 text-gray-900 text-sm dark:text-white flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <span>
            {selectedPerson && (
              <img
                className="h-7 mr-4"
                src={getFlagByCountryNameMini(selectedPerson)}
                alt={selectedPerson}
              />
            )}
          </span>
          {selectedPerson || "Country"}
        </Listbox.Button>
        <Listbox.Options>
          {Object.keys(countriesFlags).map((key) => (
            <Listbox.Option
              key={key}
              value={key}
              className={
                "h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
            >
              <div className="w-10 mr-5">
                <img
                  className="h-7"
                  src={getFlagByCountryNameMini(key)}
                  alt={key}
                />
              </div>
              {key}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
};

export default CountrySelect;
