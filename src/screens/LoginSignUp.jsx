import React, { useCallback, useContext } from "react";
import Form from "components/Form";
import firebase from "config/firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "context/auth";

const LoginSignup = (props) => {
  const navigate = useNavigate();
  const { type } = props;

  async function handleLoginSignUp(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      if (type === "login")
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      else
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }


  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="screen-container">
      <div className={"content-box"}>
        <h1 className="login-signup-header">
          <a href="/">Pomodoro Tracker</a>
        </h1>
        <h3 className={"header"}>
          {type === "login"
            ? "Login to your account"
            : "Sign up for an account"}
        </h3>
        <Form
          onSubmit={handleLoginSignUp}
          inputs={["email", "password"]}
          submitText={type === "login" ? "Log In" : "Sign Up"}
        />
        <div className={"login-signup-footer"}>
          <span>{type === "login" ? "New here? " : "Returning? "}</span>
          <a href={type === "login" ? "/signup" : "/login"}>
            {type === "login" ? "Sign Up" : "Log In"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
