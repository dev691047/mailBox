import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Mailbox from "../components/Mailbox";
import classes from "./Home.module.css";
import ComposeMail from "./ComposeMail";
const Home = () => {
  const [showEditor, setShowEditor] = useState(false);
  function hide(v) {
    setShowEditor(v);
  }
  function show(v) {
    setShowEditor(v);
  }
  return (
    <>
      <Header />
      <div className={classes.mainCont}>
        <div className={classes.sideBar}>
          <SideBar showEditor={show} />
        </div>
        <div className={classes.mailBox}>
          <Mailbox />
        </div>
      </div>
      {showEditor && <ComposeMail hide={hide} />}
    </>
  );
};

export default Home;
