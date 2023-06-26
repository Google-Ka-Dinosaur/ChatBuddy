import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./Chat.module.css";
import { useRouter } from "next/router";
import { convertTime } from "@/utils/apiFeatures";
import images from "../../assets";
import Loader from "../Loader/Loader";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Redirect } from "next";
const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({ name: "", address: "" });
  const router = useRouter();
  const { fetchData } = useContext(ChatAppContext);
  useEffect(() => {
    if (!router.isReady) return;

    setChatData(router.query);
  }, [router]);
  useEffect(() => {
    if (chatData.address) {
      readMessage(router.query.address);
      readUser(router.query.address);
      fetchData();
    }
  }, [chatData]);
  // console.log(friendMsg);//
  return (
    <div className={styles.Chat}>
      {currentUserAddress && currentUserName ? (
        <div className={styles.Chat_user_info}>
          <Image
            src={images.friendslist}
            alt="image"
            width={70}
            height={70}
          ></Image>
          <div className={styles.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={styles.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.Chat_box_box}>
        <div className={styles.Chat_box}>
          <div className={styles.Chat_box_left}>
            {friendMsg.map((ele, i) => (
              <div key={i+1}>
                {ele.sender == chatData.address ? (
                  <div className={styles.Chat_box_left_title}>
                    <Image
                      src={images.send}
                      alt="friend"
                      width={50}
                      height={50}
                    ></Image>
                    <span>
                      {chatData.name}{" "}
                      <small>Time: {convertTime(ele.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={styles.Chat_box_left_title}>
                    <Image
                      src={images.user}
                      alt="friend"
                      width={50}
                      height={50}
                    ></Image>
                    <span>
                      {userName}{" "}
                      <small>Time: {convertTime(ele.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>{ele.msg} </p>
              </div>
            ))}
          </div>
        </div>
        {currentUserAddress && currentUserName ? (
          <div className={styles.Chat_boxsend}>
            <div className={styles.Chat_box_send_img}>
              <Image src={images.logo} alt="" height={50} width={50}></Image>
              <input
                type="text"
                placeholder="Enter your message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></input>
              <Image
                src={images.search}
                alt="file"
                width={50}
                height={50}
              ></Image>
              {loading ? (
                <Loader></Loader>
              ) : (
                <Image
                  src={images.send}
                  alt="send"
                  width={50}
                  height={50}
                  onClick={() => {
                    functionName({ msg: message, address: chatData.address });
                  }}
                ></Image>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
