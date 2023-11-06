// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import HashLoader from "react-spinners/HashLoader";
// import user_icon from "../assets/person.png";
// import email_icon from "../assets/email_icon.png";
// import password_icon from "../assets/password.png";

// function Login() {
//   const [loading, setLoading] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("user"); 
//   const [csrfToken, setCsrfToken] = useState(""); 
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showLoginForm, setShowLoginForm] = useState(true); 

//   const override = css`
//     display: block;
//     border-color: red;
//     margin-top: 20%;
//   `;

//   useEffect(() => {
//     setLoading(true);
//     // Fetch the CSRF token from your Flask server
//     fetch("http://localhost:5000/get-csrf-token")
//       .then((response) => response.json())
//       .then((data) => {
//         setCsrfToken(data.csrf_token);
//         setLoading(false);
//       });
//   }, []);

//   const handleLoginSubmit = async () => {
//     if (!username || !password) {
//       setErrorMessage("Please fill in both fields.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           Username: username,
//           Password: password,
//         }),
//       });

//       if (response.status === 200) {
//         setLoading(false);
//         navigate("/dashboard");
//       } else if (response.status === 401) {
//         setErrorMessage("Invalid username or password.");
//       } else {
//         setErrorMessage("An error occurred while logging in.");
//       }
//     } catch (error) {
//       setErrorMessage("Network error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignupSubmit = async () => {
//     if (!name || !email || !password) {
//       setErrorMessage("Please fill in all the fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken, 
//         },
//         body: JSON.stringify({
//           Username: name,
//           Email: email,
//           Password: password,
//           Role: role,
//         }),
//       });

//       if (response.status === 201) {
//         setErrorMessage("");
//         setLoading(false); 
//         navigate("/login");
//       } else if (response.status === 409) {
//         setErrorMessage("Username or email already exists.");
//         setLoading(false); 
//       } else {
//         setErrorMessage("An error occurred while signing up.");
//         setLoading(false); 
//       }
//     } catch (error) {
//       setErrorMessage("Network error. Please try again later.");
//       setLoading(false); 
//     }
//   };

//   const toggleForm = () => {
//     setShowLoginForm(!showLoginForm);
//     setErrorMessage(""); 
//   };

//   return (
//     <div>
//       {loading ? (
//         <HashLoader
//           className="loader"
//           color={"#3d2514"}
//           background={"#00000"}
//           loading={loading}
//           css={override}
//           size={500}
//         />
//       ) : (
//         <>
//           <div className="container">
//             <div className="header">
//               <div className="text">{showLoginForm ? "Login" : "Sign Up"}</div>
//               <div className="underline"></div>
//             </div>
//             <div className="inputs">
//               {showLoginForm ? ( 
//                 <>
//                   <div className="input">
//                     <img src={user_icon} alt="" />
//                     <input
//                       type="text"
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </div>
//                   <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                 </>
//               ) : ( 
//                 <>
//                   <div className="input">
//                     <img src={user_icon} alt="" />
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>
//                   <div className="input">
//                     <img src={email_icon} alt="" />
//                     <input
//                       type="email"
//                       placeholder="Email ID"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   <div className="input">
//                     <label>Role:</label>
//                     <select value={role} onChange={(e) => setRole(e.target.value)}>
//                       <option value="user">User</option>
//                       <option value="organizer">Organizer</option>
//                     </select>
//                   </div>
//                 </>
//               )}
//             </div>
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//             <div className="forgot-password">
//               {showLoginForm
//                 ? "Not a member? "
//                 : "Already Signed Up? "}
//               <span>
//                 <Link to={showLoginForm ? "/signup" : "/login"} onClick={toggleForm}>
//                   {showLoginForm ? "Sign Up Here" : "Login Here"}
//                 </Link>
//               </span>
//             </div>
//             <div className="submit-container">
//               <div onClick={showLoginForm ? handleLoginSubmit : handleSignupSubmit}>
//                 <button className="submit">{showLoginForm ? "Login" : "Sign Up"}</button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email_icon.png";
import password_icon from "../assets/password.png";

const formStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0px",
  borderRadius: "5px",
  backgroundColor: "pink",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  fontSize: "32px",
};

function Auth() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true); // Show the login form by default

  const override = css`
    display: block;
    border-color: pink;
    margin-top: 5%;
    back-ground : orange
  `;

  const handleLoginSubmit = async () => {
    if (!username || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000); 
  };

  const handleSignupSubmit = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000); 
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setErrorMessage(""); 
  };

  return (
    <div style = {formStyles}>
      {loading ? (
        <HashLoader
          className="loader"
          color={"#3d2514"}
          background={"#00000"}
          loading={loading}
          css={override}
          size={500}
        />
      ) : (
        <>
          <div className="container">
            <div className="header">
              <div className="text">{showLoginForm ? "Login" : "Sign Up"}</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              {showLoginForm ? ( 
                <>
                  <div className="input">
                    <img src={user_icon} alt="" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                </>
              ) : ( 
                <>
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
                    <img src={user_icon} alt="" />
                    <input
                      type="email"
                      placeholder="Email ID "
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
                </>
              )}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="forgot-password">
              {showLoginForm
                ? "Not a member? "
                : "Already Signed Up? "}
              <span>
                <Link to={showLoginForm ? "/signup" : "/login"} onClick={toggleForm}>
                  {showLoginForm ? "Sign Up Here" : "Login Here"}
                </Link>
              </span>
            </div>
            <div className="submit-container">
              <div onClick={showLoginForm ? handleLoginSubmit : handleSignupSubmit}>
                <button className="submit">{showLoginForm ? "Login" : "Sign Up"}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
