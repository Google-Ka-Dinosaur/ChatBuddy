import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT

import {
  checkIfWalletIsConnected,
  connectWallet,
  connectWithContract,
} from "../utils/apiFeatures";
import { compiler } from "../../next.config";

export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendlists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //Chat user data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //the router
  const router = useRouter();

  //FETCH DATA AT TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      const contract = await connectWithContract();
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //Get my userName
      const status = await contract.checkUserExists(connectAccount);
      if (status) {
        const username = await contract.getUserName(connectAccount);
        setUserName(username);
        //Get My Friends List
        const friendList = await contract.getMyFriends();
        setFriendlists(friendList);
        //Get all App User list
        const userList = await contract.getAllUsers();
        setUserLists(userList);
      }
    } catch (error) {
      setError("Please Install and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Read Message
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You have no messages");
    }
  };
  //create account
  const createAccount = async ({ name, accountAddress}) => {
    try {
      // if (name=="") return setError("UserName and account Cant be empty");
      console.log(name)
      const contract = await connectWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      setUserName(name);
      window.location.reload();
    } catch (error) {
      console.log(error)
      setError(
        "Error while creating your account. PLease reload the browser!!"
      );
    }
  };
  //Add Your Friends
  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name && accountAddress)
      //   return setError(
      //     "Please make sure UserName and account address have been provided"
      //   );
      const contract = await connectWithContract();
      const getAddedFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await getAddedFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friend. Try again");
    }
  };
  //sending message to a friend
  const sendMessage = async ({ msg, address }) => {
    try {
      if (!(msg && address)) return setError("Please type your message");
      const contract = await connectWithContract();
      const sendMsg = await contract.sendMessage(address, msg);
      setLoading(true);
      await sendMsg.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("PLease Reload and try again!!!");
    }
  };
  //Read Info
  const readUser = async (userAddress) => {
    try {
      const contract = await connectWithContract();
      const readInfo = await contract.getUserName(userAddress);
      setCurrentUserName(readInfo);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError("Unable To Load User Info");
    }
  };
  return (
    <ChatAppContext.Provider
      value={{
        checkIfWalletIsConnected,
        loading,
        error,
        currentUserAddress,
        currentUserName,
        userName,
        userLists,
        friendLists,
        friendMsg,
        readUser,
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        account,
        fetchData
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
