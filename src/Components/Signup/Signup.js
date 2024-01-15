import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false)
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name }).then(() => {
          Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
          });
        });
      })
      .then(() => {
        history.push("/login");
      });
  };
  return (<>
    {loading && <SignUpLoading />}
    {/* <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <br />
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>  */ }
    <div className="BODY2">
    <div className="wrapper2">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" required />
            <label>Full Name</label>
            <i className="fas fa-user"></i>
          </div>

          <div className="form-group">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
            <label>Email</label>
            <i className="fas fa-at"></i>
          </div>


          <div className="form-group">
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" required />
            <label>Phone</label>
            <i className="fas fa-lock"></i>
          </div>

          <div className="form-group">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
            <label>Password</label>
            <i className="fas fa-lock"></i>
          </div>

          <button type="submit" className="btn">
            Sign-Up
          </button>
          <div className="link">
            <p>
              {/* {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <a href="#" onClick={toggleForm} className="signin-link">
                {isSignUp ? 'Sign in' : 'Sign up'}
              </a> */}
              <Link to="/login" className="signin-link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  </>
  );
}
