import React, { useState, useRef, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef<any>("");
  const passwordRef = useRef<any>("");
  const passwordConfirmRef = useRef<any>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match.");

    try {
      setError(null);
      await auth.signup(emailRef.current.value, passwordRef.current.value);
      navigate("/welcome", { replace: true });
    } catch {
      setError("Sorry, we couldn't sign you up.");
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
              <h1>Sign Up</h1>
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
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <br />
                <Button className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <h6>
              Already have an account? <Link to="/sign-in">Sign In</Link>
            </h6>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
