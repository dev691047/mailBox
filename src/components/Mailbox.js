import React, { useEffect } from "react";
import classes from "./MailBox.module.css";
import { Route, Routes, useParams } from "react-router-dom";
import Sent from "./Sent";
import Inbox from "./Inbox";
import Unread from "./Unread";
import axios from "axios";
import { listActions } from "../store/Redux";
import { useDispatch } from "react-redux";
import OpenMail from "./OpenMail";
const Mailbox = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userMail").split("@")[0];

  const getDataFromBackend = async () => {
    const resRecievedMails = await axios.get(
      `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${userId}/recieved.json`
    );
    console.log(resRecievedMails);
    const emptyArr1 = [];
    if (resRecievedMails.data) {
      let arr = Object.keys(resRecievedMails.data);
      var newvar1 = [];
      for (let i = 0; i < arr.length; i++) {
        newvar1.push(resRecievedMails.data[arr[i]]);
      }
      const newarr1 = [];
      for (let i = 0; i < newvar1.length; i++) {
        const obj1 = {
          itemId: newvar1[i].itemId,
          senderId: newvar1[i].senderId,
          mail: newvar1[i].mail,
          seen: newvar1[i].seen,
        };
        newarr1.push(obj1);
      }

      console.log(newarr1);
      dispatch(listActions.addRecievedItems(newarr1));
    } else {
      dispatch(listActions.addRecievedItems(emptyArr1));
    }

    /////////////////////////////////////////////////////////////////////////
    const resSentMails = await axios.get(
      `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${userId}/sent.json`
    );
    console.log(resSentMails + "sent mails");

    const emptyArr2 = [];
    if (resSentMails.data) {
      let arr2 = Object.keys(resSentMails.data);
      var newvar2 = [];
      for (let i = 0; i < arr2.length; i++) {
        newvar2.push(resSentMails.data[arr2[i]]);
      }

      const newarr2 = [];
      for (let i = 0; i < newvar2.length; i++) {
        const obj2 = {
          itemId: newvar2[i].itemId,
          receiverId: newvar2[i].receiverId,
          mail: newvar2[i].mail,
          seen: newvar2[i].seen,
        };
        newarr2.push(obj2);
      }
      console.log(newarr2);
      dispatch(listActions.addSentItems(newarr2));
    } else {
      dispatch(listActions.addSentItems(emptyArr2));
    }
  };

  useEffect(() => {
    getDataFromBackend();
    const val = setInterval(() => {
      getDataFromBackend();
      console.log("called");
    }, 1000);
    return () => {
      clearInterval(val);
    };
  }, []);

  return (
    <>
      <div className={classes.mailBox}>
        <Routes>
          <Route path="" element={<Inbox />} />
          <Route path="sent" element={<Sent />} />
          <Route path="unread" element={<Unread />} />
          <Route path=":type/:id" element={<OpenMail />} />
        </Routes>
      </div>
    </>
  );
};

export default Mailbox;
