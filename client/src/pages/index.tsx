import { useRef } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import { AppStore, AppDispatch } from "@/store/store";
import { setUsername } from "@/store/reducers/appReducer";

import RoomsContainer from "@/containers/Rooms";
import MessagesContainer from "@/containers/Messages";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useSelector((state: AppStore) => ({
    username: state.app.username,
  }));

  const usernameRef = useRef<HTMLInputElement>(null);

  function handleUsername() {
    const value = usernameRef.current?.value;
    if (!value) {
      return;
    }
    dispatch(setUsername(value));
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
