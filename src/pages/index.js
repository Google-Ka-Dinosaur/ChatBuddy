import React, { useState, useEffect, useContext } from "react";
import { ChatAppContext } from "../Context/ChatAppContext";
import { Fikter, Filter, Friend } from "../components/index";
const chatApp = () => {
  const {} = useContext(ChatAppContext);
  return (
    <div>
      <Filter></Filter>
      <Friend></Friend>
    </div>
  );
};

export default chatApp;
