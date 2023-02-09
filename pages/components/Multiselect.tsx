import { Listbox } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

type GenreProp = {
  id: number;
  name: string;
}

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adult' },
  { id: 3, name: 'Adventure' },
  { id: 4, name: ' Animation' },
  { id: 5, name: ' Biography' },
  { id: 6, name: ' Comedy' },
  { id: 7, name: ' Crime' },
  { id: 8, name: ' Documentary' },
  { id: 9, name: ' Drama' },
  { id: 10, name: ' Family' },
  { id: 11, name: ' Fantasy' },
  { id: 12, name: ' Film Noir' },
  { id: 13, name: ' Game Show' },
  { id: 14, name: ' History' },
  { id: 15, name: ' Horror' },
  { id: 16, name: ' Musical' },
  { id: 17, name: ' Music' },
  { id: 18, name: ' Mystery' },
  { id: 19, name: ' News' },
  { id: 20, name: ' Reality-TV' },
  { id: 21, name: ' Romance' },
  { id: 22, name: ' Sci-Fi' },
  { id: 23, name: ' Short' },
  { id: 24, name: ' Sport' },
  { id: 25, name: ' Talk-Show' },
  { id: 26, name: ' Thriller' },
  { id: 27, name: ' War' },
  { id: 28, name: ' Western' }
]

const Multiselect = () => {
  const [selectedGenre, setSelectedPerson] = useState<GenreProp[]>([])

  const handleSelect = (item: GenreProp) => {
    const checkIfExists = selectedGenre.some(genre => genre.name === item.name);
    if (checkIfExists) return;

    const newArray = [...selectedGenre];
    newArray.push(item);
    setSelectedPerson(newArray);
  }

  const handleRemove = (item: string) => {
    console.log(selectedGenre);
    const newArray = selectedGenre.filter(genre => genre.name !== item);
    console.log(newArray);
    setSelectedPerson(newArray);
  }

  return (
    <>
      <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genres</label>
      <Listbox value={selectedGenre} onChange={handleSelect}>
        <Listbox.Button className="h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{
          selectedGenre.map(genre => (
            <button
              onClick={() => handleRemove(genre.name)}
                key={genre.id}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {genre.name}
              </button>
          ))
        }</Listbox.Button>
        <Listbox.Options>
          {genres.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              className={"h-10 flex flex-row items-center px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
}

export default Multiselect;