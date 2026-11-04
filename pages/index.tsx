import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { SelectedProps } from "@/types/props";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/NavBar";
import { getFlagByCountryNameMini } from "@/utils/flags";
import Link from "next/link";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] w-full items-center justify-center text-gray-500 dark:text-gray-400">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const [selected, setSelected] = useState<SelectedProps>({ name: "", id: "" });

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <Map selected={selected} setSelected={setSelected} />
      </main>
      <footer className="absolute bottom-0 z-10 flex h-20 w-full flex-row items-center justify-between border-t border-black/5 bg-gray-100/95 px-6 backdrop-blur dark:border-white/10 dark:bg-gray-950/95">
        {selected.name && (
          <>
            <div className="flex flex-row items-center w-60">
              <p className="mr-4 min-w-fit text-gray-900 dark:text-gray-100">{selected.name}</p>
              <Image
                className="h-7 w-auto"
                src={getFlagByCountryNameMini(selected.name)}
                alt={selected.id}
                width={40}
                height={28}
                unoptimized
              />
            </div>
            <Link href={{ pathname: `/${selected.name}`, query: { country: selected.id }}}>
              <FaArrowRight className="text-gray-900 dark:text-gray-100" />
            </Link>
          </>
        )}
      </footer>
    </div>
  );
}
