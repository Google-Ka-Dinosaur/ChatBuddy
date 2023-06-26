import React, { useState, useContext } from "react";
import Image from "next/image";
import styles from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Loader } from "../../components/index";
const Model = ({
  openBox,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  address,
}) => {
  //USE STATES
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const { loading} = useContext(ChatAppContext);
  // console.log(name);
  return (
    <div className={styles.Model}>
      <div className={styles.Model_box}>
        <div className={styles.Model_box_left}>
          <Image src={images.logo} alt="buddy" width={600} height={700} />
        </div>
        <div className={styles.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader></Loader>
          ) : (
            <div className={styles.Model_box_right_name}>
              <div className={styles.Model_box_right_name_info}>
                <Image src={image} alt="user" width={30} height={30}></Image>
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.Model_box_right_name_info}>
                <Image src={image} alt="user" width={30} height={30}></Image>
                <input
                  type="text"
                  placeholder={address || "Enter address"}
                  onChange={(event) => {
                    setAccountAddress(event.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.Model_box_right_name_btn}>
                <button
                  onClick={() => {
                    console.log(name);
                    functionName({name, accountAddress});
                  }}
                >
                  {" "}
                  <Image
                    src={images.send}
                    alt="send"
                    height={30}
                    width={30}
                  ></Image>{" "}
                  Submit
                </button>
                <button
                  onClick={() => {
                    openBox(false);
                  }}
                >
                  {" "}
                  <Image
                    src={images.close}
                    alt="cancel"
                    height={30}
                    width={30}
                  ></Image>{" "}
                  cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
