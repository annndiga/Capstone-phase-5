import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import "../styles/SIgnup.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email_icon.png";
import password_icon from "../assets/password.png";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role is user
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = async () => {
      if (!name || !email || !password) {
        setErrorMessage("Please fill in all the fields.");
        return;
      }
  
      setLoading(true);
  
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: name,
            Email: email,
            Password: password,
            Role: role,
          }),
        });
  
        if (response.status === 201) {
          setErrorMessage("");
          setLoading(false); // Turn off the loader
          navigate("/login");
        } else if (response.status === 409) {
          setErrorMessage("Username or email already exists.");
          setLoading(false); // Turn off the loader
        } else {
          setErrorMessage("An error occurred while signing up.");
          setLoading(false); // Turn off the loader
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        setLoading(false); // Turn off the loader
      }
    };
  
    return (
      <div>
        <HashLoader
          className={`loader ${loading ? "show-loader" : "hide-loader"}`}
          color={"#3d2514"}
          loading={loading}
          size={500}
        />
        <div className="container">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="forgot-password">
            Already Signed Up?
            <span>
              <Link to="/login">Click Here</Link>{" "}
            </span>
          </div>
          <div className="submit-container">
            <div onClick={handleSubmit}>
              <button className="submit">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SignUp;