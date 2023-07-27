import React from "react";
import RenderMails from "./RenderMails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SearchBtn from "./SearchBtn";
const Sent = () => {
  const sentMails = useSelector((state) => state.items.sentItems);

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
        {sentMails.map((v, i) => (
          <RenderMails
            type="sent"
            id={v.itemId}
            mail={v.mail}
            key={v.itemId}
            receiverId={v.receiverId}
          />
        ))}
      </div>
    </>
  );
};

export default Sent;
