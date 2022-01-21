import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, Card, Form, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { request, gql } from "graphql-request";

const SignUp = () => {
  const firstNameRef = useRef<any>("");
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
      return await auth.signup(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {
      setError("Sorry, we couldn't sign you up.");
    }
  }

  async function createUser(
    user: string,
    email: string,
    name: string
  ): Promise<any> {
    try {
      const variables = {
        user: {
          user_id: user,
          email: email,
          first_name: name,
        },
      };
      const mutation = gql`
        mutation Mutation($user: UserInput) {
          createUser(user: $user) {
            first_name
            user_id
            email
            date_joined
          }
        }
      `;
      return await request("/", mutation, variables);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    try {
      createUser(
        auth.currentUser.uid,
        emailRef.current.value,
        firstNameRef.current.value
      );
      navigate("/welcome", { replace: true });
    } catch (err) {}
  }, [auth.currentUser]);

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
                <Form.Group id="name-first">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="input" ref={firstNameRef} required />
                </Form.Group>
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
