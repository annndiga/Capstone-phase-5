import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import "../styles/SIgnup.css"; // You can reuse the styles from SignUp.css
import email_icon from "../assets/email_icon.png";

function Recover() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const override = css`
    display: block;
    border-color: red;
    margin-top: 20%;
  `;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // Request user data by email for password recovery
      const userDataResponse = await fetch(
        "http://localhost:5000/users/retrieve-by-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (userDataResponse.ok) {
        // If the email exists in the database, retrieve the user data
        const userData = await userDataResponse.json();

        // Now you have the user's data, including User_ID
        const userId = userData.User_ID;

        // Request the user's password by User_ID for password recovery
        const passwordResponse = await fetch(
          `http://localhost:5000/users/retrieve-password/${userId}`
        );

        if (passwordResponse.ok) {
          const userId = userData.User_ID;
          const userPassword = userData.Password;

          // Redirect to the password reset page with userId and userPassword as params
          navigate(`/reset/${userId}/${userPassword}`);
          // Implement your password recovery logic here
          // Send an email with a reset link or provide a form to reset the password
          // For example, you can navigate the user to a password reset page
          // and pass userId and userPassword as query parameters
          // using React Router to create a password reset form
        } else {
          const data = await passwordResponse.json();
          setMessage(data.message || "An error occurred.");
        }
      } else {
        const data = await userDataResponse.json();
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <HashLoader
          className="loader"
          color={"#3d2514"}
          loading={loading}
          css={override}
          size={500}
        />
      ) : (
        <div className="container">
          <div className="header">
            <div className="text">Password Recovery</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" className="submit" disabled={loading}>
                {loading ? "Recovering..." : "Recover Password"}
              </button>
            </form>
          </div>
          {message && <div className="error-message">{message}</div>}
          <div className="forgot-password">
            Back to Login?
            <span>
              <Link to="/login">Click Here</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recover;
