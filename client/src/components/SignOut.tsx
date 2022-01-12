import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignOut = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signout();
    navigate("/sign-in", { replace: true });
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
