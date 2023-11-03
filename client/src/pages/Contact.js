import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";

function Contact() {
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    border-color: red;
    margin-top: 20%;
  `;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(""); // Clear any previous error messages

      // Replace the URL below with your server endpoint for handling contact form submissions.
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Message: message,
        }),
      });

      setLoading(false);

      if (response.status === 201) {
        console.log("Message sent successfully!");
        navigate("/home");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        setErrorMessage("An error occurred while sending the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("An error occurred while sending the message.");
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
        <>
          <Navbar />
          <div className="container">
            <div className="header">
              <div className="text">Contact Us</div>
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
              {/* Styled the message input */}
              <div className="input message-input">
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="submit-container">
              <div onClick={handleSubmit}>
                <button className="submit">Send Message</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Contact;
