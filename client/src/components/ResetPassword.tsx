import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Container, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  const auth = useAuth();
  const emailRef = useRef<any>("");
  const [alert, setAlert] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | undefined>(undefined);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await auth.resetPassword(emailRef.current.value);
      setVariant("success");
      setAlert(`Password reset link has been sent to ${emailRef.current.value}`);
    } catch (error) {
      setVariant("danger");
      setAlert("We could not locate that email.");
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
              <h1>Reset Password</h1>
              {alert && <Alert variant={variant}>{alert}</Alert>}
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <br />
                <Button className="w-100" type="submit">
                  Send Reset Link
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div
            className="d-flex w-100 text-center mt-2"
            style={{ justifyContent: "center", gap: "15px" }}
          >
            <h6>
              <Link to="/sign-in">Sign In</Link>
            </h6>
            <h6>
              <Link to="/sign-up">Sign Up</Link>
            </h6>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
