import { Inter } from "@next/font/google";
import Map from "./components/Map";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { SelectedProps } from "./types/props";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "./components/NavBar";
import { getFlagByCountryNameMini } from "./utils/flags";
import Link from "next/link";
import { wrapper } from "./stores/store";
import { setIsLoggedIn } from "./stores/authSlice";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(setIsLoggedIn(false)); 
      console.log("State on server", store.getState());
      return {
        props: {
          isLoggedIn: false,
        },
      };
    }
);

export default function Home() {
  const [selected, setSelected] = useState<SelectedProps>({ name: "", id: "" });

  const checkDarkMode = () => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    checkDarkMode();
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className={styles.main}>
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
