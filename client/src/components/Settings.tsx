import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert, Button, Card, Container, Modal } from "react-bootstrap";
import { request, gql } from "graphql-request";

const Settings = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const [func, setFunc] = useState<string | undefined>(undefined);
  const [execute, setExecute] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDeleteUser() {
    try {
      await deleteUser(auth.currentUser.uid);
      await auth.deleteCreds();
      navigate("/sign-in", { replace: true });
    } catch {
      setAlert("Sorry, your account couldn't be deleted at this time.");
    }
  }

  async function deleteUser(user_id: string) {
    try {
      const variables = { user: { user_id: user_id } };
      const mutation = gql`
        mutation Mutation($user: UserInput) {
          deleteUser(user: $user) {
            response
          }
        }
      `;
      return await request("/", mutation, variables);
    } catch (err) {
      setTone("warning");
      setAlert("We could not delete you from our database. Sorry.");
    }
  }

  async function handleDeletePosts() {
    try {
      const variables = {
        post: { user_id: auth.currentUser.uid, post_type: "all" },
      };
      const mutation = gql`
        mutation Mutation($post: PostInputDelete) {
          deletePosts(post: $post) {
            response
          }
        }
      `;
      setTone("success");
      setAlert("Success, all posts have been deleted.");
      return await request("/", mutation, variables);
    } catch (err) {
      setTone("warning");
      setAlert("Sorry, we could not delete your posts at this time.");
    }
  }

  async function handlePasswordReset() {
    try {
      await auth.resetPassword(auth.currentUser.email);
      setAlert(`Success, an email has been sent to ${auth.currentUser.email}.`);
    } catch (error) {
      setAlert("Sorry, we could not update your password at this time.");
    }
  }

  useEffect(() => {
    if (execute) {
      const method: string = func + "()";
      eval(method);
    }
  }, [execute]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you wish to proceed?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action will be irreversible.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setFunc(undefined);
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setExecute(true);
              handleClose();
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <h1>Settings</h1>
        <br />
        <Container
          className="d-grid justify-content-center"
          style={{ maxWidth: "500px" }}
        >
          <div className="w-100">
            {alert && <Alert variant={tone!}>{alert}</Alert>}
            <Card className="card__spacing">
              <Card.Header>
                <h3>Reset Password</h3>
              </Card.Header>
              <Card.Body>
                <p>Receive a link via email to reset your password.</p>
                <Button
                  onClick={() => {
                    handleShow();
                    setFunc(handlePasswordReset.name);
                  }}
                  className="w-50"
                  variant="primary"
                >
                  Reset
                </Button>
              </Card.Body>
            </Card>
            <Card className="card__spacing">
              <Card.Header>
                <h3>Delete All Posts</h3>
              </Card.Header>
              <Card.Body>
                <p>This will delete every post you have made.</p>
                <Button
                  onClick={() => {
                    handleShow();
                    setFunc(handleDeletePosts.name);
                  }}
                  className="w-50"
                  variant="danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
            <Card className="card__spacing">
              <Card.Header>
                <h3>Delete Account</h3>
              </Card.Header>
              <Card.Body>
                <p>Delete your account and all your posts.</p>
                <Button
                  onClick={() => {
                    handleShow();
                    setFunc(handleDeleteUser.name);
                  }}
                  className="w-50"
                  variant="danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Settings;
