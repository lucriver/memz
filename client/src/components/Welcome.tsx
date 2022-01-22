import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { graphQLClient } from "../config/gqlclient";
import { gql } from "graphql-request";

const Welcome = () => {
  const [user, setUser] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function getUser() {
    const variables = { userId: auth.currentUser.uid };
    const query = gql`
      query Query($userId: String) {
        user(user_id: $userId) {
          first_name
        }
      }
    `;
    return await graphQLClient.request(query, variables);
  }

  useEffect(() => {
    const response = getUser();
    response.then((res) => setUser(res.user));

    if (user!.first_name == null) setIsLoading(true);
  }, [isLoading]);

  return (
    <>
      <Container>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: "85vh",
          }}
        >
          <Col sm={2} md={2}>
            <h1>Welcome back, {user.first_name}.</h1>
          </Col>
          <Col
            md="auto"
            style={{
              maxWidth: "700px",
              maxHeight: "700px",
              overflow: "hidden",
            }}
          >
            <Image fluid src="https://source.unsplash.com/random" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
