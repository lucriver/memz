import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignOut = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signout()
      .then(() => navigate("/sign-in", { replace: true }))
      .catch((err: any) => console.log(err))
  }, []);

  return (
    <>
      <Container>
        <div className="center">
          <h1>Signing out...</h1>
        </div>
      </Container>
    </>
  );
};

export default SignOut;
