import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import meovvLogo from "./icon.png";
import discover from "./assets/discover.png";
import discover_2 from "./assets/discover_y.png";
import add from "./assets/add.png";
import add_2 from "./assets/add_2.png";
import likes from "./assets/likes.png";
import likes_2 from "./assets/likes_2.png";
import messages from "./assets/messages.png";
import messages_2 from "./assets/messages_2.png";
import me from "./assets/me.png";
import me_2 from "./assets/me_2.png";
import lamp from "./assets/lamp.png";

function Discover() {
  return <h1>Discover Page</h1>;
}

function Messages() {
  return <h1>Messages Page</h1>;
}

function Add() {
  return <h1>Add Page</h1>;
}

function Likes() {
  return <h1>Likes Page</h1>;
}

function Me() {
  return <h1>Me Page</h1>;
}

function App() {
  const [color, setColor] = useState("white");
  useEffect(() => {
    console.log("color is now: ", color);
  }, [color]);
  return (
    <>
      <BrowserRouter>
        <div class="background">
          <div class="container">
            <img src={meovvLogo} alt="Meovv Logo" />
            <h2 class="item">
              Find Your
              <br /> People Here at
              <br />
              Northwestern
            </h2>
            <button class="item account" style={{ backgroundColor: color }}>
              Create Account
            </button>
            <button class="item signin" style={{ color: color }}>
              SSO Sign In
            </button>
            <h3 class="item" style={{ color: color }}>
              <span>Trouble signing in?</span>
            </h3>
            <footer class="item" style={{ color: color }}>
              By signing up, you agree to our <span>Terms</span>. Learn
              <br /> how we use your data in our <span>Privacy Policy.</span>
            </footer>
          </div>
          <NavBar></NavBar>
          <Lamp setColor={setColor}></Lamp>
        </div>
      </BrowserRouter>
    </>
  );
}

function NavBar() {
  return (
    <>
      <nav class="nav">
        <NavLink to="/discover">
          {({ isActive }) => (
            <img src={isActive ? discover_2 : discover} alt="discover icon" />
          )}
        </NavLink>
        <NavLink to="/messages">
          {({ isActive }) => (
            <img
              src={isActive ? messages_2 : messages}
              alt="messages icon"
            ></img>
          )}
        </NavLink>
        <NavLink to="/add">
          {({ isActive }) => (
            <img src={isActive ? add_2 : add} alt="add icon"></img>
          )}
        </NavLink>
        <NavLink to="/likes">
          {({ isActive }) => (
            <img src={isActive ? likes_2 : likes} alt="likes icon"></img>
          )}
        </NavLink>
        <NavLink to="/me">
          {({ isActive }) => (
            <img src={isActive ? me_2 : me} alt="home icon"></img>
          )}
        </NavLink>

        <Routes>
          <Route path="/discover" element={<Discover />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/add" element={<Add />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </nav>
    </>
  );
}

function Lamp({ setColor }) {
  const toggleColor = () => {
    setColor((prev) => (prev === "#FFE893" ? "white" : "#FFE893"));
  };

  return (
    <>
      <p>click me!</p>
      <img class="lamp" src={lamp} onClick={toggleColor}></img>
    </>
  );
}

export default App;
