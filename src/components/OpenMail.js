import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OpenMail = () => {
  const params = useParams();
  const type = params.type;
  // if (type === "sent") {
  let sentMails = useSelector((state) => state.items.sentItems);
  // } else {
  let recMails = useSelector((state) => state.items.recieveItems);
  // }

  const id = params.id;

  const mail1 = recMails.filter((v) => v.itemId === id);
  const mail2 = sentMails.filter((v) => v.itemId === id);
  return (
    <>
      {console.log(params)}
      {type === "sent" && (
        <p
          style={{ width: "600px" }}
          dangerouslySetInnerHTML={{
            __html: mail2[0].mail,
          }}
        ></p>
      )}
      {type === "recieved" && (
        <p
          style={{ width: "600px" }}
          dangerouslySetInnerHTML={{
            __html: mail1[0].mail,
          }}
        ></p>
      )}
    </>
  );
};

export default OpenMail;
