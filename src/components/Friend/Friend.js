import React, { useState, useContext } from "react";
import styles from "./Friend.module.css";
import Image from "next/image";
import images from "../../assets";
import { Card, Chat } from "../index";
import { ChatAppContext } from "@/Context/ChatAppContext";
const Friend = () => {
  const {
    readUser,
    sendMessage,
    account,
    friendLists,
    loading,
    error,
    userName,
    readMessage,
    currentUserAddress,
    currentUserName,
    friendMsg,
  } = useContext(ChatAppContext);
  return (
    <div className={styles.Friend}>
      <div className={styles.Friend_box}>
        <div className={styles.Friend_box_left}>
          {friendLists.map((element, i) => (
            <Card
              key={i + 1}
              element={element}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            ></Card>
          ))}
        </div>
        <div className={styles.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          ></Chat>
        </div>
      </div>
    </div>
  );
};

export default Friend;
