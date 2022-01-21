import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { Button, Container, Col, Row, Image } from "react-bootstrap";
import { request, gql } from "graphql-request";

const Profile = () => {
  const [user, setUser] = useState<any>("");
  const navigate = useNavigate();
  const auth = useAuth();

  async function queryUser() {
    const variables = { userId: auth.currentUser.uid };
    try {
      const query = gql`
        query Query($userId: String) {
          user(user_id: $userId) {
            email
            first_name
            last_name
            bio
            location
            date_joined
            avatar
          }
        }
      `;
      return await request("/", query, variables);
    } catch (err) {}
  }

  function dateFormatString(date: string): string {
    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const yearMonth: any[] = date?.split("-");
    const year: number = yearMonth?.[0];
    const dayTime: any[] = yearMonth?.[2].split("T");
    const day: number = dayTime?.[0];
    const monthPre: any = yearMonth?.[1];
    const month: number = monthPre?.[0] == 0 ? monthPre?.[1] : monthPre;
    return monthNames[month] + ", " + day + " " + year;
  }

  useEffect(() => {
    const response = queryUser();
    response.then((res) => setUser(res.user));
  }, []);

  return (
    <>
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col>
            <h1>Profile</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button
              onClick={() => navigate("/edit-profile", { state: { user } })}
            >
              <FaPencilAlt style={{ height: "35px", width: "auto" }} />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1em",
          minHeight: "70vh",
        }}
      >
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col
            md={6}
            lg={6}
            style={{
              maxWidth: "540px",
              maxHeight: "540px",
              overflow: "hidden",
            }}
          >
            <Image fluid style={{ position: "relative" }} src={user.avatar} />
          </Col>
          <Col md={6} lg={6} style={{ margin: "1em 0em 0em 0em" }}>
            <Row>
              <h1>
                {user.first_name} {user.last_name}
              </h1>
            </Row>
            <Row>
              <h3>{user.location}</h3>
            </Row>
            <Row>
              <p>{user.bio}</p>
            </Row>
            <Row>
              <h4>Joined: {dateFormatString(user.date_joined)}</h4>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
