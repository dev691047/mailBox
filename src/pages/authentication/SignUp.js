import React from "react";
import classes from "./Auth.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Redux";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaEI6pGIBPzbztuW8GztNXfQqB0kB4S7o",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    console.log(res);
    localStorage.setItem("userId", res.data.localId);
    localStorage.setItem("tokenId", res.data.idToken);
    localStorage.setItem("userMail", email);
    const obj = {
      token: res.data.idToken,
      userId: email,
    };
    dispatch(authActions.login(obj));
    alert("signup successful");
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    navigate("/home");
  };

  return (
    <div className={classes.back}>
      <section className={classes.auth} style={{ marginTop: "100px" }}>
        <h1>Sign Up</h1>
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
            style={{ height: "30px", border: "none", borderRadius: "5px" }}
            type="submit"
          >
            Create new account
          </button>
          <div className={classes.actions}>
            <button type="button" className={classes.toggle}>
              <Link style={{ color: "white" }} to="login">
                Login with existing account
              </Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
