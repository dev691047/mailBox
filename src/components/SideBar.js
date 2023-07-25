import React, { useEffect, useState } from "react";
import classes from "./Side.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SideBar = (props) => {
  let unseenMails = [];
  let recMails = [];
  const res = useSelector((state) => state.items.recieveItems);
  if (res) {
    unseenMails = res.filter((v) => v.seen === false);
    recMails = res;
  }

  return (
    <>
      <button
        onClick={() => props.showEditor(true)}
        style={{
          width: "200px",
          height: "40px",
          margin: "20px",
          border: "none",
          backgroundColor: "rgb(107, 107, 234)",
          color: "white",
          fontSize: "20px",
          letterSpacing: "3px",
          borderRadius: "5px",
          fontWeight: "400",
          cursor: "pointer",
        }}
      >
        COMPOSE
      </button>
      <div className={classes.div}>
        <Link to={"/home"}>
          <div
            className={classes.btn}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>Inbox</div>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "20px",
                backgroundColor: "blue",
                color: "white",
                textAlign: "center  ",
                margin: "5px 5px 0 0",
                fontSize: "15px",
                padding: "0 0 3px 2px",
              }}
            >
              {recMails.length}
            </div>
          </div>
        </Link>
        <Link to={"/home/unread"}>
          <div
            className={classes.btn}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>Unread</div>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "20px",
                backgroundColor: "blue",
                color: "white",
                textAlign: "center  ",
                margin: "5px 5px 0 0",
                fontSize: "15px",
                padding: "0 0 3px 2px",
              }}
            >
              {unseenMails.length}
            </div>
          </div>
        </Link>
        <Link to={"/home/sent"}>
          <div className={classes.btn}>Sent</div>
        </Link>
      </div>
    </>
  );
};

export default SideBar;
