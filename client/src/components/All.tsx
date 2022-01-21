import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Col,
  Card,
  Row,
  Image,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { request, gql } from "graphql-request";

const All = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [alert, setAlert] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function getPosts(user_id: string, filter: string) {
    try {
      const variables = { userId: user_id, filter: filter };
      const query = gql`
        query Query($filter: String, $userId: String) {
          user_posts(filter: $filter, user_id: $userId) {
            post_number
            post_type
            title
            description
            tags
            url
            date_posted
          }
        }
      `;
      return await request("/", query, variables);
    } catch {
      setAlert("Sorry, we couldn't load your posts right now.");
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
    const response = getPosts(auth.currentUser.uid, "all");
    response.then((res) => {
      setPosts(res.user_posts);
    });

    try {
      if (posts[0].title == undefined) {
        console.log();
      }
    } catch {
      setIsLoading(true);
    }
  }, [isLoading]);

  return (
    <>
      <Container>
        {" "}
        <Row style={{ alignItems: "center" }}>
          <Col>
            <h1>All Posts</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button onClick={() => navigate("/create-post", { replace: true })}>
              <BiMessageSquareAdd style={{ height: "35px", width: "auto" }} />
            </Button>
          </Col>
        </Row>
        {alert && <Alert variant="warning">{alert}</Alert>}
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-100" style={{ maxWidth: "900px" }}>
            {posts.map((post, i) => (
              <Card key={i} style={{ margin: "3em 0em 3em 0em" }}>
                <Card.Header>
                  <h1>{post?.title}</h1>
                </Card.Header>
                <Card.Body>
                  {post.post_type == "journal" ? null : post.post_type ==
                    "video" ? (
                    <Row style={{ height: "500px" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${post.url}`}
                      />
                    </Row>
                  ) : (
                    <Card.Img src={post.url} />
                  )}
                </Card.Body>
                <Card.Body>
                  {post.post_type == "journal" ? (
                    <p
                      style={{
                        fontStyle: "italic",
                        margin: "-2em 0em 1em 0em",
                      }}
                    >
                      {post.description}
                    </p>
                  ) : (
                    <p>{post.description}</p>
                  )}
                  <Card.Text>
                    <Row>
                      <Col xs="auto" md="auto">
                        Tags:{" "}
                      </Col>
                      {post.tags?.map((tag: any, i: number) => (
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
                  <Card.Footer>
                    <Row style={{ alignItems: "center" }}>
                      <Col style={{ textAlign: "left" }}>
                        <h3>{dateFormatString(post.date_posted)}</h3>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        <BsTrash
                          onClick={(e) =>
                            handleDelete(
                              e,
                              post.post_number,
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
      </Container>
    </>
  );
};

export default All;
