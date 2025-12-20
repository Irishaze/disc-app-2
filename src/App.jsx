import "./App.css";
import vectorLogo from "./icon.png";
import discover from "./assets/discover.png";
import add from "./assets/add.png";
import likes from "./assets/likes.png";
import messages from "./assets/messages.png";
import me from "./assets/me.png";

function App() {
  return (
    <>
      <div class="background">
        <div class="container">
          <img src={vectorLogo} alt="Vector Logo" />
          <h2 class="item">
            Find Your
            <br /> People Here at
            <br />
            Northwestern
          </h2>
          <button class="item account">Create Account</button>
          <button class="item signin">SSO Sign In</button>
          <h3 class="item">
            <span>Trouble signing in?</span>
          </h3>
          <footer class="item">
            By signing up, you agree to our <span>Terms</span>. Learn
            <br /> how we use your data in our <span>Privacy Policy.</span>
          </footer>
        </div>
        <NavBar></NavBar>
      </div>
    </>
  );
}

function NavBar() {
  return (
    <>
      <div class="nav">
        <img src={discover}></img>
        <img src={messages}></img>
        <img src={add}></img>
        <img src={likes}></img>
        <img src={me}></img>
      </div>
    </>
  );
}

export default App;
