import React from "react";

const Login = ({ setAuth }) => {
  return (
    <>
      <h1>LOG IN</h1>
      <button onClick={() => setAuth(true)}>Log in</button>
    </>
  );
};

export default Login;
