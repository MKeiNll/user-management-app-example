import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";

const LoginPage: React.FC = () => {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );

  useEffect(() => {
    sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
  }, [isUserLoggedIn]);

  const loginUser = () => {
    fetch("/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: usernameValue,
        password: passwordValue
      })
    }).then(res => {
      if (res.status === 200) {
        setIsUserLoggedIn("true");
      }
    });
  };

  return isUserLoggedIn ? (
    <Redirect to="/users" />
  ) : (
    <>
      <MenuComponent />
      <div className="login-block">
        <div className="login-header">Login</div>

        <div className="login-input">
          Username:
          <br />
          <input
            id="email-input"
            value={usernameValue}
            onChange={e =>
              setUsernameValue((e.target as HTMLInputElement).value)
            }
            type="text"
          />
        </div>

        <div className="login-input">
          Password:
          <br />
          <input
            id="pwd-input"
            value={passwordValue}
            onChange={e =>
              setPasswordValue((e.target as HTMLInputElement).value)
            }
            type="password"
          />
        </div>

        <div>
          <button id="login-btn" onClick={loginUser}>
            Login
          </button>
          <Link to="/login/recover">
            <button>Forgot password?</button>
          </Link>
        </div>

        <div className="default-login-user">
          // Default admin user (Email: "sean.maxwell@gmail.com", Password:
          "Password@1")
        </div>
      </div>
    </>
  );
};

export default LoginPage;
