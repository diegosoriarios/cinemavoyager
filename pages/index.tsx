import Map from "@/components/Map";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { SelectedProps } from "@/types/props";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/NavBar";
import { getFlagByCountryNameMini } from "@/utils/flags";
import Link from "next/link";

export default function Home() {
  const [selected, setSelected] = useState<SelectedProps>({ name: "", id: "" });

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        <Map selected={selected} setSelected={setSelected} />
      </main>
      <footer className="flex flex-row justify-between align-center z-10 dark:bg-gray-900 absolute bottom-0 w-full min-w-full h-24 p-6">
        {selected.name && (
          <>
            <div className="flex align-center flex-row w-60">
              <p className="min-w-fit mr-4 dark:text-white text-black">{selected.name}</p>
              <img
                className="h-7"
                src={getFlagByCountryNameMini(selected.name)}
                alt={selected.id}
              />
            </div>
            <Link href={{ pathname: `/${selected.name}`, query: { country: selected.id }}}>
              <FaArrowRight className="dark:text-white text-black" />
            </Link>
          </>
        )}
      </footer>
    </div>
  );
}
