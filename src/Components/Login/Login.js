import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Firebase } from "../../firebase/config";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const history = useHistory()
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push("/")
    }).catch((error)=>{
      alert(error.message)
    })

  };
  return (<>
    {loading && <RoundLoading/> }
    
    <div className="BODY">
    <div className="wrapper">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h2>LogIn</h2>
          
          
            <div className="form-group">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
              <label>Email</label>
              <i className="fas fa-at"></i>
            </div>

          <div className="form-group">
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} name="password" required />
            <label>Password</label>
            <i className="fas fa-lock"></i>
          </div>
         
          <button type="submit" className="btn">
            LogIn
          </button>
          <div className="link">
            <p>
              <Link to="/signup" className="signin-link">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
    
    </>
  );
}

export default Login;
