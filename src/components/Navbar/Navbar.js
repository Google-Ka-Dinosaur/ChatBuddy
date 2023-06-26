import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Error, Model } from "../index";
import images from "../../assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "allUsers",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Settings",
      link: "/",
    },
    {
      menu: "FAQ",
      link: "/",
    },
    {
      menu: "Terms Of Service",
      link: "/",
    },
  ];
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const { error, createAccount, userName, account, connectWallet } =
    useContext(ChatAppContext);
  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBar_box}>
        <div className={styles.NavBar_box_left}>
          <Image src={images.logo} alt="Logo" height={45} width={40}></Image>
        </div>
        <div className={styles.NavBar_box_right}>
          {/* //DESKTOP VERSION */}
          <div className={styles.NavBar_box_right_menu}>
            {menuItems.map((item, i) => (
              <div
                onClick={() => {
                  setActive(i + 1);
                }}
                key={i + 1}
                className={`${styles.NavBar_box_right_menu_items} ${
                  active == i + 1 ? styles.active_btn : ""
                }`}
              >
                <Link
                  className={styles.Navbar_box_right_menu_items_link}
                  href={item.link}
                >
                  {item.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* //MOBILE VERSION */}
          {open && (
            <div className={styles.mobile_menu}>
              {menuItems.map((item, i) => (
                <div
                  onClick={() => {
                    setActive(i + 1);
                  }}
                  key={i + 1}
                  className={`${styles.mobile_menu_items} ${
                    active == i + 1 ? styles.active_btn : ""
                  }`}
                >
                  <Link
                    className={styles.mobile_menu_items_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
                </div>
              ))}
              <p className={styles.mobile_menu_btn}>
                <Image
                  src={images.close}
                  width={40}
                  height={40}
                  alt="close"
                  onClick={() => {
                    setOpen(false);
                  }}
                ></Image>
              </p>
            </div>
          )}
          {/* //CONNECT WALLET */}
          <div className={styles.NavBar_box_right_connect}>
            {account == "" ? (
              <button
                onClick={() => {
                  connectWallet();
                }}
              >
                {" "}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenModel(true);
                }}
              >
                {" "}
                <Image
                  src={userName ? images.user : images.create}
                  alt="account Image"
                  width={20}
                  height={20}
                ></Image>{" "}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          {/* //OPENER */}
          {!open && (
            <div
              className={styles.NavBar_box_right_open}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Image
                src={images.open}
                alt="open"
                width={40}
                height={40}
              ></Image>
            </div>
          )}
        </div>
      </div>
      {/* //MODEL COMPONENT */}
      {openModel && (
        <div className={styles.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="djejdi 2kjsowjdkn iw9id-wod jjo2i9d ppoi u8uiui ijuihjb ug8u9 ju9 jio jio hi killl  hsond wkjwdjkwjndw kdjwojndkw "
            smallInfo="Kindly select Your name"
            image={images.user}
            functionName={createAccount}
            address={account}
          ></Model>
        </div>
      )}
      {(error == "" )? "" : <Error error={error}/>}
    </div>
  );
};

export default Navbar;
