import React, { useRef, useState } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../../store/Redux";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaEI6pGIBPzbztuW8GztNXfQqB0kB4S7o",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    localStorage.setItem("tokenId", res.data.idToken);
    localStorage.setItem("userId", res.data.localId);
    localStorage.setItem("userMail", email);

    const obj = {
      token: res.data.idToken,
      userId: email,
    };
    dispatch(authActions.login(obj));

    // emailInputRef.current.value = null;
    // passwordInputRef.current.value = null;
    navigate("/home");
  };

  return (
    <>
      <section className={classes.auth} style={{ marginTop: "100px" }}>
        <h1>Login </h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <button
            type="submit"
            style={{
              cursor: "pointer",
              width: "100px",
              height: "30px",
              color: "blue",
              fontWeight: "600",
              border: "none",
              borderRadius: "4px",
            }}
          >
            LOGIN
          </button>
          <Link
            style={{
              color: "white",
              cursor: "pointer",
              display: "block",
              width: "150px",
              margin: "auto",
            }}
            to="/resetPassword"
          >
            Forget Password
          </Link>
          <div className={classes.actions}>
            <button type="button" className={classes.toggle}>
              <Link style={{ color: "white" }} to={"/"}>
                Create new account
              </Link>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
