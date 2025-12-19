import "./App.css";
import vectorLogo from "./Vector.png";

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
      </div>
    </>
  );
}
export default App;
