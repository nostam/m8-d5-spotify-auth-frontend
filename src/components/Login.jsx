import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = (props) => {
  const url = `${process.env.REACT_APP_API_URL}/users`;
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  async function submitData(e) {
    e.preventDefault();
    try {
      let res = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password: pwd }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // cookie
        SameSite: "none",
        secure: true,
      });
      if (res.ok) {
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="container-fluid login">
        <div className="login-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="login-container">
          <span> To continue, log in to Spotify.</span>
          <a href={`${url}/facebookLogin`}>
            <div className="login-button login-facebook">
              <span>CONTINUE WITH FACEBOOK</span>
            </div>
          </a>
          <div className="login-button login-apple">
            <span>CONTINUE WITH APPLE</span>
          </div>
          <a href={`${url}/googleLogin`}>
            <div className="login-button login-google">
              <span>CONTINUE WITH GOOGLE</span>
            </div>
          </a>
          <div className="d-flex flex-row">
            <hr />
            OR
            <hr />
          </div>
          <div className="input-group">
            <span>Email address or Username</span>
            <input
              placeholder="Email address or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Password</span>
            <input
              placeholder="Password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <p>
            <a className="forgot-password" href="#">
              Forget your password?
            </a>
          </p>
          <div className="login-btn">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" for="customCheck1">
                Remember Me
              </label>
            </div>

            <div
              href="#"
              className="login-button login-spotify"
              onClick={(e) => submitData(e)}
            >
              LOG IN
            </div>
          </div>
          <hr />
          <div className="login-footer">
            <span>Don't have an account?</span>
            <a href={`${url}/spotifyLogin`}>
              <div className="login-button login-signup">
                <span>CONNECT WITH YOUR SPOTIFY ACCOUNT</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
