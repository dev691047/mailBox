import React from "react";
import { useDispatch } from "react-redux";
import { authActions, listActions } from "../store/Redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logout() {
    dispatch(authActions.logout());
    dispatch(listActions.clearData(""));
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 50px",
        boxShadow: "0 0 15px grey",
      }}
    >
      <div style={{}}>
        <h1
          style={{ display: "inline", fontSize: "80px", letterSpacing: "10px" }}
        >
          MAIL BOX
        </h1>
        <span>MAILbox</span>
      </div>
      <div style={{ paddingTop: "40px" }}>
        {localStorage.getItem("userMail").split("@")[0]}
        <button
          onClick={logout}
          style={{
            cursor: "pointer",
            margin: "10px",
            border: "none",
            height: "33px",
            width: "80px",
            boxShadow: "2px 0 5px grey",
            borderRadius: "5px",
            backgroundColor: "orange",
            color: "white",
            fontWeight: "600",
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Header;
