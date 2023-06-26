import React from "react";
import styles from "./Error.module.css";
import Image from "next/image";
const Error = ({ error }) => {
  return (
    <div className={styles.Error}>
      <div className={styles.Error_box}>
        <h1>Please fix this error and reload the browser</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;
