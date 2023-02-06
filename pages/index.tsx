import Head from 'next/head'
import { Inter } from '@next/font/google'
import Map from "./components/Map"
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { SelectedProps } from './types/stateProps';
import { FaArrowRight } from "react-icons/fa";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selected, setSelected] = useState<SelectedProps>({ name: "", id: "" });
  return (
    <>
      <main className={styles.main}>
        <Map selected={selected} setSelected={setSelected} />
      </main>
      <footer style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "black",
        height: 100,
        zIndex: 2,
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
      }}>
        {
          selected.name && (
            <><p>{selected.name}</p><a href={`/${selected.name}`}><FaArrowRight /></a></>
          )
        }
      </footer>
    </>
  )
}
