import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

//Opening Page
function OpeningPage() {
  const [color, setColor] = useState("white");
  useEffect(() => {
    console.log("color is now: ", color);
  }, [color]);
  return (
    <>
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
      </div>
      <Lamp setColor={setColor} />
    </>
  );
}

//Prototype Pages
function Messages() {
  return <h1>Messages Page</h1>;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Header() {
  return <img src="./src/assets/menu_bar.png" />;
}

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      const res = await fetch(
        "https://disc-assignment-5-users-api-iyct.onrender.com/api/users"
      );
      const data = await res.json();
      console.log(data);
      setUsers(data);
    }

    getAllUsers();
  }, []);
  return (
    <div className="flex-container">
      {users.map((user) => (
        <div className="user" key={user.id}>
          <img className="profile" src={user.profilePicture} />
          <p>
            {user.firstName} {user.lastName}
          </p>
          <br />
          <p>{user.major}</p>
          <div className="heart">
            <img src="./src/assets/heart.png" />
            <p>{randomIntFromInterval(100, 200)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Likes() {
  return <h1>Likes Page</h1>;
}

function Me() {
  return <h1>Me Page</h1>;
}

//Navigation Bar
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
      </nav>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/discover" element={<OpeningPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/add" element={<UsersPage />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/me" element={<Me />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
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
      <p class="click">click me!</p>
      <img
        className="lamp"
        src="./src/assets/lamp.png"
        onClick={toggleColor}
      ></img>
    </>
  );
}

export default App;
