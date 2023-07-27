import React, { useRef, useState } from "react";
import classes from ".//ComposeMail.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDispatch } from "react-redux";
import { listActions } from "../store/Redux";
import axios from "axios";

const ComposeMail = (props) => {
  const initialToken = localStorage.getItem("tokenId");
  const initialUserId = localStorage.getItem("userMail");
  const dispatch = useDispatch();
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const recieverMail = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const enteredMail = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  function hideEditor() {
    props.hide(false);
  }

  const saveDataToBackend = async () => {
    try {
      const recieverMailId = recieverMail.current.value;
      let itemId1 = `${recieverMailId.split("@")[0]}${Date.now()}`;
      const res = await axios.put(
        `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${
          recieverMailId.split("@")[0]
        }/recieved/${itemId1}.json`,
        {
          itemId: itemId1,
          mail: enteredMail,
          senderId: userId,
          seen: false,
        }
      );
      const obj1 = {
        itemId: itemId1,
        mail: enteredMail,
        senderId: userId,
      };
      // dispatch(listActions.addRecievedItems(obj1));

      let itemId2 = `${userId.split("@")[0]}${Date.now()}`;

      const res2 = await axios.put(
        `https://mailbox-662e4-default-rtdb.firebaseio.com/mails/${
          userId.split("@")[0]
        }/sent/${itemId2}.json`,
        {
          itemId: itemId2,
          mail: enteredMail,
          receiverId: recieverMailId,
        }
      );
      const obj2 = {
        itemId: itemId2,
        mail: enteredMail,
        receiverId: recieverMailId,
      };
      // dispatch(listActions.addSentItems(obj2));
      console.log(res);
      alert("saved");
    } catch (e) {
      console.log(e);
    }
    props.hide(false);
  };

  return (
    <div className={classes.mainDiv}>
      <div className={classes.innerDiv}>
        <input
          ref={recieverMail}
          type="email"
          className={classes.to}
          placeholder="enter email of reciever"
        />
        <button onClick={hideEditor} className={classes.cancelbtn}>
          X
        </button>
        <div style={{ height: "280px" }}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>

        <button onClick={saveDataToBackend} className={classes.send}>
          send
        </button>
      </div>

      {/* {console.log(enteredMail)} */}
    </div>
  );
};

export default ComposeMail;
