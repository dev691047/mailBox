import React from "react";
import RenderMails from "./RenderMails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SearchBtn from "./SearchBtn";
const Unread = () => {
  const Mails = useSelector((state) => state.items.recieveItems);
  const unseenMails = Mails.filter((v) => v.seen === false);

  return (
    <>
      <SearchBtn />
      <div>
        <div
          style={{
            width: "98%",
            border: "none",

            margin: "auto",
            height: "40px",
          }}
        >
          {unseenMails.map((v, i) => (
            <RenderMails
              type="recieved"
              id={v.itemId}
              mail={v.mail}
              key={v.itemId}
              receiverId={v.receiverId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Unread;
