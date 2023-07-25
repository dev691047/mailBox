import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const RenderMails = (props) => {
  let mail = props.mail;

  const userId = localStorage.getItem("userMail").split("@")[0];
  const [type, setType] = useState(props.type);
  const deleteHandler = async () => {
    console.log(type);
    console.log(props.id);

    const res = await axios.delete(
      `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${userId}/${type}/${props.id}.json`
    );
    console.log(res);
    alert("deleted");
  };

  const openMailHandler = async () => {
    if (type === "recieved") {
      const resGet = await axios.get(
        `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${userId}/${type}/${props.id}.json`
      );
      console.log(resGet.data);
      const itemId = resGet.data.itemId;
      const mail = resGet.data.mail;
      const seen = true;
      const senderId = resGet.data.senderId;

      const resPut = await axios.put(
        `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${userId}/${type}/${props.id}.json`,
        {
          itemId: itemId,
          mail: mail,
          seen: seen,
          senderId: senderId,
        }
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(233, 232, 232)",
        margin: " 9px 3px",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
        cursor: "pointer",
      }}
    >
      {console.log(type)}
      {console.log(props.id)}
      {props.senderId && (
        <span style={{ color: "grey" }}>from {props.senderId}</span>
      )}
      <Link
        onClick={openMailHandler}
        to={"/home/" + props.type + "/" + props.id}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: mail,
          }}
        ></div>
      </Link>

      <div style={{ color: "white" }}>
        {props.receiverId && (
          <span style={{ color: "grey" }}>to {props.receiverId}</span>
        )}
        <button
          onClick={deleteHandler}
          style={{
            margin: " 0 7px",
            backgroundColor: "red",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RenderMails;
