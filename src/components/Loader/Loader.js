import React from "react";
import styles from "./Loader.module.css";
import images from "../../assets";
import Image from "next/image";
const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.Loader_box}>
        <Image
          src={images.loading}
          alt="loading"
          height={100}
          width={100}
        ></Image>
      </div>
    </div>
  );
};

export default Loader;
