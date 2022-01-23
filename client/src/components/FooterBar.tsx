import { Container, Col, Row } from "react-bootstrap";
import "../components/component-styles.css";

const FooterBar = () => {
  return (
    <>
      <Container style={{ margin: "1.5em 0em 0em 0em" }}>
        <footer>
          <a
            href="about"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <h6>About This Project</h6>
          </a>
          <a
            href="http://www.lucasrh.com/#projects"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <h6>Lucas Hirt 2022</h6>
          </a>
        </footer>
      </Container>
    </>
  );
};

export default FooterBar;
