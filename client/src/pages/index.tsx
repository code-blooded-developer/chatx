import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { useSocket } from "@/context/socket";

import RoomsContainer from "@/containers/Rooms";
import MessagesContainer from "@/containers/Messages";
import { useRef } from "react";

export default function Home() {
  const { username, setUsername } = useSocket();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleUsername() {
    const value = usernameRef.current?.value;
    if (!value) {
      return;
    }
    setUsername(value);
  }

  return (
    <>
      <Head>
        <title>ChatX</title>
        <meta name="description" content="Chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {!username && (
            <div>
              <input placeholder="Enter username" ref={usernameRef} />
              <button onClick={handleUsername}>Enter</button>
            </div>
          )}
          {username && (
            <>
              <RoomsContainer />
              <MessagesContainer />
            </>
          )}
        </div>
      </main>
    </>
  );
}
