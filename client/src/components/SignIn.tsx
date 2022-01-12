import React, { useState, useRef, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignIn = () => {
  const emailRef = useRef<any>("");
  const passwordRef = useRef<any>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();

    try {
      setError(null);
      await auth.signin(emailRef.current.value, passwordRef.current.value);
      navigate("/all", { replace: true });
    } catch {
      setError("Invalid credentials, please try again.");
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h1>Sign In</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <br />
                <Button className="w-100" type="submit">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <h6>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </h6>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
