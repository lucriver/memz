import { useState, useRef } from "react";
import {
  Alert,
  Button,
  Container,
  Col,
  Card,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import { graphQLClient } from "../config/gqlclient";
import { gql } from "graphql-request";
import { useAuth } from "../contexts/AuthContext";

const CreatePost = () => {
  const [postType, setPostType] = useState<string>("Post Type");
  const [isMedia, setIsMedia] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const titleRef = useRef<any>();
  const urlRef = useRef<any>("");
  const tagsRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const auth = useAuth();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const postTypes: string[] = ["picture", "video", "journal"];
    if (!postTypes.includes(postType.toLowerCase())) {
      setTone("warning");
      return setAlert("That please choose a valid post type.");
    }

    try {
      const tagsArr: any[] = tagsRef.current.value.split(" ");
      const vid: any[] =
        urlRef.current.value == null ? [] : urlRef?.current.value.split("=");
      const variables = {
        post: {
          user_id: auth.currentUser.uid,
          post_type: postType.toLowerCase(),
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          tags: tagsArr,
          url: vid?.[1],
        },
      };
      console.log(variables);
      const mutation = gql`
        mutation Mutation($post: PostInput) {
          createPost(post: $post) {
            post_number
            date_posted
            title
          }
        }
      `;
      await graphQLClient.request(mutation, variables);
      setAlert("Success! Your post has been created.");
      setTone("success");
    } catch (err) {
      setAlert("Sorry, we couldn't post your item.");
      setTone("warning");
      return await err;
    }
  }

  return (
    <>
      <Container>
        <Row
          sm="auto"
          md="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col style={{ textAlign: "left" }}>
            <h1>Create Post</h1>
          </Col>
        </Row>
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            padding: "1em",
          }}
        >
          <Card>
            <Card.Header>
              {alert && (
                <Alert style={{ width: "100%" }} variant={tone!}>
                  {alert}
                </Alert>
              )}
            </Card.Header>
            <Card.Body>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  style={{ width: "100%", fontSize: "1.0em" }}
                >
                  {postType}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  variant="dark"
                  style={{ width: "100%", fontSize: "1.0em" }}
                >
                  {["Video", "Picture", "Journal"].map((type, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => {
                        setPostType(type);
                        type == "Video" || type == "Picture"
                          ? setIsMedia(true)
                          : setIsMedia(false);
                      }}
                    >
                      {type}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
            <Card.Body>
              <Form
                onSubmit={(e) => handleSubmit(e)}
                style={{ margin: "-1em 0em 0em 0em" }}
              >
                <Form.Group id="title">
                  <Form.Label>
                    <h3>Post Title</h3>
                  </Form.Label>
                  <Form.Control type="input" ref={titleRef} required />
                </Form.Group>
                {isMedia && (
                  <Form.Group id="url" style={{ margin: ".5em 0em 0em 0em" }}>
                    <Form.Label>
                      <h3>
                        {postType} Url{" "}
                        {postType == "Video" ? "(Must be Youtube link)" : ""}
                      </h3>
                    </Form.Label>
                    <Form.Control type="input" ref={urlRef} required />
                  </Form.Group>
                )}
                <Form.Group
                  id="description"
                  style={{ margin: ".5em 0em 0em 0em" }}
                >
                  <Form.Label>
                    <h3>Description</h3>
                  </Form.Label>
                  <Form.Control type="input" ref={descriptionRef} required />
                </Form.Group>
                <Form.Group id="tags" style={{ margin: ".5em 0em 0em 0em" }}>
                  <Form.Label>
                    <h3>Tags (Space separated)</h3>
                  </Form.Label>
                  <Form.Control type="input" ref={tagsRef} required />
                </Form.Group>
                <Button
                  style={{
                    fontSize: "1.5em",
                    margin: "1.2em 0em 0em 0em",
                    width: "100%",
                  }}
                  variant="primary"
                  type="submit"
                >
                  Post
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default CreatePost;
