import React, { useState, useEffect, useContext } from "react";
import { UserCard } from "../components/index";
import styles from "../styles/allUsers.module.css";
import { ChatAppContext } from "@/Context/ChatAppContext";
const allUsers = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);

  return (
    <div>
      <div className={styles.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={styles.alluser}>
        {userLists.map((ele, i) => (
          <UserCard
            key={i + 1}
            i={i}
            element={ele}
            addFriends={addFriends}
          ></UserCard>
        ))}
      </div>
    </div>
  );
};

export default allUsers;
