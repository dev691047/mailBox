import React, { useEffect, useState } from "react";
import RenderMails from "./RenderMails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SearchBtn from "./SearchBtn";
const Inbox = () => {
  const recMails = useSelector((state) => state.items.recieveItems);

  return (
    <>
      {/* <SearchBtn /> */}
      <div
        style={{
          width: "98%",
          border: "none",
          margin: "auto",
          height: "40px",
        }}
      >
        {recMails
          ? recMails.map((v, i) => (
              <RenderMails
                type="recieved"
                id={v.itemId}
                mail={v.mail}
                key={v.itemId}
                senderId={v.senderId}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default Inbox;
