import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBook,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/styles.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

function AsideMenu(props) {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [error, setError] = useState(null);
  const setUser = (user) =>
    dispatch({
      type: "SET_USER",
      payload: {
        name: user.username,
        id: user._id,
        picture: user.image ? user.image : "https://picsum.photos/100",
      },
    });
  const unsetUser = (user) => dispatch({ type: "UNSET_USER" });
  async function handleLoginStatus(option = "login") {
    try {
      const headers = { "Content-Type": "application/json" };
      const url = process.env.REACT_APP_API_URL;
      const refreshAuthLogic = (failedRequest) =>
        axios({
          url: `${url}/users/refreshToken`,
          method: "POST",
          headers,
          withCredentials: true,
        }).then((tokenRefreshResponse) => {
          return Promise.resolve();
        });
      createAuthRefreshInterceptor(axios, refreshAuthLogic);
      console.log(option);
      const { data } = await axios({
        method: option === "login" ? "GET" : "POST",
        url: option === "login" ? `${url}/users/me` : `${url}/users/${option}`,
        headers,
        withCredentials: true,
      });
      if (option === "login") {
        setUser(data);
        console.log(user);
      } else if (option === "logout") {
        unsetUser();
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoginStatus();
  }, [handleLoginStatus]);

  const loginButton = () => {
    if (isNaN(user.id)) {
      return (
        <div>
          Hello {user.name}{" "}
          <img
            src={user.picture}
            alt="profile-pic"
            style={{ height: "2rem" }}
          />
          <button
            className="login-button-index mt-3"
            onClick={() => {
              handleLoginStatus("logout");
            }}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="login-button-index"
          onClick={() => props.history.push("/login")}
        >
          Login
        </button>
      );
    }
  };
  return (
    <aside>
      <div styles={{ width: "80%", padding: "1rem" }}>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="menu d-flex column justify-content-start align-items-center">
          <div className="col">
            <Link to="/">
              {" "}
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </div>
        </div>
        <div className="menu d-flex column justify-content-start align-items-center">
          <div className="col">
            <Link to="/search">
              {" "}
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search
            </Link>
          </div>
        </div>
        <div className="menu d-flex column justify-content-start align-items-center">
          <div className="col">
            <Link to="/playList">
              {" "}
              <FontAwesomeIcon icon={faBook} className="mr-2" /> Your library
            </Link>
          </div>
        </div>

        <div className="stick-to-bottom-index-page">
          {/* <Link to="/login">
            <div className="login-button-index">
              <span>SIGN UP</span>
            </div>
          </Link>
          <Link to="/login">
            <div className="login-button-index">
              <span>LOGIN</span>
            </div>
          </Link> */}
          <div>{loginButton()}</div>
          <div className="install-btn">
            <a href="#">
              <FontAwesomeIcon icon={faArrowCircleDown} /> Install
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
