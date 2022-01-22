import writing from "../images/writing.jpg";
import picture from "../images/photo.jpg";
import video from "../images/video.jpg";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row, Image } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Col
            sm={3}
            md={3}
            style={{ textAlign: "left", margin: "0em 0em 1em 0em" }}
          >
            <h1>Life's finest mediums.</h1>
            <h3>All in one place.</h3>
            <Link to="/sign-in">
              {" "}
              <Button style={{ width: "50%" }}>Get Started</Button>
            </Link>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Image
              style={{
                height: "540px",
                width: "300px",
                objectFit: "cover",
              }}
              src={picture}
            />
            <h1>Pictures</h1>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Image
              style={{
                height: "540px",
                width: "300px",
                objectFit: "cover",
              }}
              src={video}
            />
            <h1>Video</h1>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Image
              style={{
                height: "540px",
                width: "300px",
                objectFit: "cover",
              }}
              src={writing}
            />
            <h1>Journaling</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
