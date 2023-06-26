import React from "react";
import Image from "next/image";
import images from "../../assets";
import styles from "./UserCard.module.css";
const UserCard = ({ element, i, addFriends }) => {
  return (
    <div className={styles.UserCard}>
      <div className={styles.UserCard_box}>
        <Image
        className={styles.UserCard_box_img}
          src={images[`image${(i % 6) + 1}`]}
          alt="user"
          height={100}
          width={100}
        ></Image>
        <div className={styles.UserCard_box_info}>
          <h3>{element.name}</h3>
          <p>{element.key.slice(0, 15)}...</p>
          <button
            onClick={() => {
              addFriends({ name: element.name, accountAddress: element.key });
            }}
          >
            Add Friend
          </button>
        </div>
      </div>
      <small className={styles.number}>{i+1}</small>
    </div>
  );
};

export default UserCard;
