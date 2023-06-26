import React from "react";
import Image from "next/image";
import images from "../../assets";
import Link from "next/link";
import styles from "./Card.module.css";
const Card = ({ element, i, readMessage, readUser }) => {
  return (
    <Link
      href={{
        pathname: "/",
        query: { name: `${element.name}`, address: `${element.pubkey}` },
      }}
    >
      <div
        className={styles.Card}
        onClick={() => (readMessage(element.pubkey), readUser(element.pubkey))}
      >
        <div className={styles.Card_box}>
          <div className={styles.Card_box_left}>
            <Image
              src={images[`image${(i % 6) + 1}`]}
              alt="userName"
              height={50}
              width={50}
              className={styles.Card_box_left_img}
            ></Image>
          </div>
          <div className={styles.Card_box_right}>
            <div className={styles.Card_box_right_middle}>
              <h4>{element.name}</h4>
              <small>{element.pubkey.slice(0, 20)}...</small>
            </div>
            <div className={styles.Card_box_right_middle}>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
