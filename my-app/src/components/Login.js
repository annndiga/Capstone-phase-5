import React, { useState } from 'react';
import "./Login.css"
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    const data = {
      username,
      password,
    };

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
      
      } else {
      
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    const data = {
      username,
      password,
      email,
      userRole,
    };

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
      
      } else {
      
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {!isLogin && (
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        )}
        <button onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </p>
      </div>
      <div className="login-image">
        <p>Welcome to Kenya's leading ticketing platform</p>
        <img src="https://media.istockphoto.com/id/1289481350/photo/a-crowded-concert-hall-with-scene-stage-lights-rock-show-performance-with-people-silhouette.webp?s=170667a&w=0&k=20&c=6h4JqNCU_v1RjU1Tp3xUDF0RLh7e_xmmE8E6hlkG8Dg=" alt="Login Image" />

      </div>
    </div>
  );
}

export default LoginForm;
