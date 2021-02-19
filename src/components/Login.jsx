import React from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = () => {
  const url = `${process.env.REACT_APP_API_URL}/users`;
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
            <input placeholder="Email address or username" />
            <span>Password</span>
            <input placeholder="Password" type="password" />
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

            <Link to="/">
              <div href="#" className="login-button login-spotify">
                LOG IN
              </div>
            </Link>
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
