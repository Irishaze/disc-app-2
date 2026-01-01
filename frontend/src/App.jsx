import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import AuthContext from "./AuthContext.js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

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
          <img src="./assets/logo.png" alt="Meovv Logo" />
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
  return (
    <>
      <div className="flex-container-2">
        <img id="menu" src="./src/assets/menu_bar.png" />
        <img id="logo" src="./src/assets/logo.png" />
        <img id="search" src="./src/assets/search.png" />
      </div>
    </>
  );
}

function UsersPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      console.log("API URL:", apiUrl);
      const res = await fetch(`${apiUrl}/api/users/profiles`);
      const data = await res.json();
      console.log(data);
      setUsers(data);
    }

    getAllUsers();
  }, []);
  return (
    <>
      <Header />
      <div className="flex-container">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <img
              className="profile"
              src={user.profile_picture || "./src/assets/larryQian.jpg"}
            />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <br />
            <p>{user.user_profiles.bio || "Undeclared"}</p>
            <div className="heart">
              <img src="./src/assets/heart.png" />
              <p>{user.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </>
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

function ProtectedPage() {
  return <h2>You need to log in to view this page.</h2>;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);
  const { login, logout, isLoggedIn } = useContext(AuthContext);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Check if we have token_hash in URL (magic link callback)
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      // Verify the OTP token
      supabase.auth
        .verifyOtp({
          token_hash,
          type: type || "email",
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params
            window.history.replaceState({}, document.title, "/");
          }
          setVerifying(false);
        });
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        login(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        login(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [login, logout]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Show auth success (briefly before session loads)
  if (authSuccess && !session) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }
  // If user is logged in, show welcome screen
  if (isLoggedIn) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OpeningPage />} />
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
  } else {
    <ProtectedPage />;
    console.log("unsuccessful");
  }

  // Show login form
  return (
    <div className="login">
      <img src="./src/icon.png" alt="Meovv Logo" />
      <br />
      <p className="tangerine-regular">
        Sign in via magic link with your email below
      </p>
      <form onSubmit={handleLogin}>
        <input
          className="raleway-thin"
          type="email"
          placeholder="Your email:"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="raleway-thin" disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
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
      <p className="click">click me!</p>
      <img
        className="lamp"
        src="./src/assets/lamp.png"
        onClick={toggleColor}
      ></img>
    </>
  );
}

export default App;
