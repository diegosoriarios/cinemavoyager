import Head from "next/head";
import { Inter } from "@next/font/google";
import Map from "./components/Map";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { SelectedProps } from "./types/stateProps";
import { FaArrowRight } from "react-icons/fa";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import { getFlagByCountryNameMini } from "./utils/flags";
import Context from "./context/context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selected, setSelected] = useState<SelectedProps>({ name: "", id: "" });

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className={styles.main}>
        <Map selected={selected} setSelected={setSelected} />
      </main>
      <footer
        className="flex flex-row justify-between align-center z-10 dark:bg-gray-900 absolute bottom-0 w-full min-w-full h-24 p-6"
      
      >
        {selected.name && (
          <>
            <div className="flex align-centerflex-row w-60">
              <p className="min-w-fit mr-4">{selected.name}</p>
              <img
                className="h-7"
                src={getFlagByCountryNameMini(selected.name)}
                alt={selected.id}
              />
            </div>
            <a href={`/${selected.name}`}>
              <FaArrowRight />
            </a>
          </>
        )}
      </footer>
    </div>
  );
}
