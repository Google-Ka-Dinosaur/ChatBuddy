import React, { useState, useContext } from "react";
import styles from "./Filter.module.css";
import Image from "next/image";
import images from "../../assets";
import { Model } from "../../components/index";
import { ChatAppContext } from "@/Context/ChatAppContext";
const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={styles.Filter}>
      <div className={styles.Filter_box}>
        <div className={styles.Filter_box_left}>
          <div className={styles.Filter_box_left_search}>
            <Image
              src={images.search}
              alt="search"
              height={20}
              width={20}
            ></Image>
            <input
              className={styles.Filter_box_left_search_input}
              type="text"
              placeholder="search..."
            ></input>
          </div>
        </div>
        <div className={styles.Filter_box_right}>
          <button>
            <Image
              src={images.close}
              alt="clear"
              width={20}
              height={20}
            ></Image>
            CLEAR CHAT
          </button>
          <button
            onClick={() => {
              setAddFriend(true);
            }}
          >
            <Image
              src={images.friendslist}
              alt="clear"
              width={20}
              height={20}
            ></Image>
            ADD FRIEND
          </button>
        </div>
      </div>
      {addFriend && (
        <div className={styles.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="djejdi 2kjsowjdkn iw9id-wod jjo2i9d ppoi u8uiui ijuihjb ug8u9 ju9 jio jio hi killl  hsond wkjwdjkwjndw kdjwojndkw "
            smallInfo="Kindly select your friend name and address"
            image={images.friendslist}
            functionName={addFriend}
          ></Model>
        </div>
      )}
    </div>
  );
};

export default Filter;
