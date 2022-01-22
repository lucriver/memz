import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Container,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { graphQLClient } from "../config/gqlclient";
import { gql } from "graphql-request";

const EditProfile = () => {
  const urlRef = useRef<any>();
  const fNameRef = useRef<any>();
  const lNameRef = useRef<any>();
  const bioRef = useRef<any>();
  const locationRef = useRef<any>();
  const { state }: any = useLocation();
  const [alert, setAlert] = useState<string | undefined>();
  const [tone, setTone] = useState<string | undefined>();
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const variables = {
        user: {
          user_id: state.user?.user_id,
          first_name: fNameRef.current.value,
          last_name: lNameRef.current.value,
          bio: bioRef.current.value,
          avatar: urlRef.current.value,
          location: locationRef.current.value,
        },
      };
      const mutation = gql`
        mutation Mutation($user: UserInput) {
          updateUser(user: $user) {
            first_name
          }
        }
      `;
      await graphQLClient.request(mutation, variables);
      navigate("/profile", { replace: true });
    } catch {
      setTone("warning");
      setAlert("Sorry, we couldn't update your profile right now.");
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Edit Profile</h1>
          </Col>
        </Row>
      </Container>
      <Container
        style={{ display: "flex", justifyContent: "center", maxWidth: "900px" }}
      >
        <Card style={{ width: "100%", display: "flex" }}>
          <Card.Header>
            {alert && <Alert variant={tone}>{alert}</Alert>}
          </Card.Header>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col sm="auto" md={6}>
                <Card.Body style={{ maxHeight: "540px", overflow: "hidden" }}>
                  <Card.Img
                    style={{ position: "relative" }}
                    src={state.user?.avatar}
                  />
                </Card.Body>
                <Card.Body>
                  <Form.Group id="url">
                    <Form.Label>
                      <h6>Profile Url</h6>
                    </Form.Label>
                    <Form.Control
                      type="input"
                      ref={urlRef}
                      placeholder={state.user?.avatar}
                    />
                  </Form.Group>
                </Card.Body>
              </Col>
              <Col>
                <Card.Body>
                  <Form.Group id="fName">
                    <Form.Label>
                      <h6>First Name</h6>
                    </Form.Label>
                    <Form.Control
                      type="input"
                      ref={fNameRef}
                      placeholder={state.user?.first_name}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Body>
                  <Form.Group id="fName">
                    <Form.Label>
                      <h6>Last Name</h6>
                    </Form.Label>
                    <Form.Control
                      type="input"
                      ref={lNameRef}
                      placeholder={state.user?.last_name}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Body>
                  <Form.Group id="location">
                    <Form.Label>
                      <h6>Location</h6>
                    </Form.Label>
                    <Form.Control
                      type="input"
                      ref={locationRef}
                      placeholder={state.user?.location}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Body>
                  <Form.Group id="bioRef">
                    <Form.Label>
                      <h6>Biography</h6>
                    </Form.Label>
                    <Form.Control
                      type="input"
                      ref={bioRef}
                      placeholder={state.user?.bio}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Body>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Update
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;
