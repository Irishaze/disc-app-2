import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

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
        <div className="background">
          <div className="container">
            <img src="./src/icon.png" alt="Meovv Logo" />
            <h2 className="item">
              Find Your
              <br /> People Here at
              <br />
              Northwestern
            </h2>
            <button className="item account" style={{ backgroundColor: color }}>
              Create Account
            </button>
            <button className="item signin" style={{ color: color }}>
              SSO Sign In
            </button>
            <h3 className="item" style={{ color: color }}>
              <span>Trouble signing in?</span>
            </h3>
            <footer className="item" style={{ color: color }}>
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
      <nav className="nav">
        <NavLink to="/discover">
          {({ isActive }) => (
            <img
              src={
                isActive
                  ? "./src/assets/discover_2.png"
                  : "./src/assets/discover.png"
              }
              alt="discover icon"
            />
          )}
        </NavLink>
        <NavLink to="/messages">
          {({ isActive }) => (
            <img
              src={
                isActive
                  ? "./src/assets/messages_2.png"
                  : "./src/assets/messages.png"
              }
              alt="messages icon"
            ></img>
          )}
        </NavLink>
        <NavLink to="/add">
          {({ isActive }) => (
            <img
              src={isActive ? "./src/assets/add_2.png" : "./src/assets/add.png"}
              alt="add icon"
            ></img>
          )}
        </NavLink>
        <NavLink to="/likes">
          {({ isActive }) => (
            <img
              src={
                isActive ? "./src/assets/likes_2.png" : "./src/assets/likes.png"
              }
              alt="likes icon"
            ></img>
          )}
        </NavLink>
        <NavLink to="/me">
          {({ isActive }) => (
            <img
              src={isActive ? "./src/assets/me_2.png" : "./src/assets/me.png"}
              alt="home icon"
            ></img>
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
    setColor((initialColor) =>
      initialColor === "white" ? "#FFE893" : "white"
    );
  };

  return (
    <>
      <p>click me!</p>
      <img
        className="lamp"
        src="./src/assets/lamp.png"
        onClick={toggleColor}
      ></img>
    </>
  );
}

export default App;
