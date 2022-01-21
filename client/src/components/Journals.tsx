import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Card, Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { request, gql } from "graphql-request";

const Journals = () => {
  const auth = useAuth();
  const [journals, setJournals] = useState<any[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  async function getJournals(user_id: string, filter: string) {
    try {
      const variables = { userId: user_id, filter: filter };
      const query = gql`
        query User_posts($userId: String, $filter: String) {
          user_posts(user_id: $userId, filter: $filter) {
            title
            description
            tags
            date_posted
          }
        }
      `;
      return await request("/", query, variables);
    } catch (err) {
      setAlert("Sorry, we couldn't load your journals right now.");
      return await ["ERROR"];
    }
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

  async function handleDelete(e: any, post_number: number, user: string) {
    e.preventDefault();
    try {
      const variables = { post: { user_id: user, post_number: post_number } };
      const mutation = gql`
        mutation Mutation($post: PostInputDelete) {
          deletePost(post: $post) {
            response
          }
        }
      `;
      await request("/", mutation, variables);
      window.location.reload();
    } catch (err) {
      console.log(user + " " + post_number);
      setAlert("Sorry, we couldn't delete that post right now.");
      return await ["ERROR."];
    }
  }

  useEffect(() => {
    const response = getJournals(auth.currentUser.uid, "journal");
    response.then((res) => {
      setJournals(res.user_posts);
    });

    if (journals?.[0].title == undefined) setIsLoading(true);
  }, [isLoading]);
  return (
    <>
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col>
            <h1>Journals</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button onClick={() => navigate("/create-post", { replace: true })}>
              <BiMessageSquareAdd style={{ height: "35px", width: "auto" }} />
            </Button>
          </Col>
        </Row>
        {alert && <Alert variant="warning">{alert}</Alert>}
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-100" style={{ maxWidth: "900px" }}>
          {journals.map((journal, i) => (
            <Card key={i} style={{ margin: "3em 0em 3em 0em" }}>
              <Card.Header>
                <h1>{journal.title}</h1>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ fontStyle: "italic" }}>
                  {journal.description}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col xs="auto" md="auto">
                      Tags:{" "}
                    </Col>
                    {journal.tags?.map((tag: any, i: number) => (
                      <Col
                        style={{ fontStyle: "italic" }}
                        xs="auto"
                        md="auto"
                        key={i}
                        sm
                      >
                        {tag}
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Footer>
                  <Row style={{ alignItems: "center" }}>
                    <Col style={{ textAlign: "left" }}>
                      <h3>{dateFormatString(journal.date_posted)}</h3>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <BsTrash
                        onClick={(e) =>
                          handleDelete(
                            e,
                            journal.post_number,
                            auth.currentUser.uid
                          )
                        }
                        style={{
                          height: "1.5em",
                          width: "auto",
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  </Row>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Journals;
