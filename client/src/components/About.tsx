import { Container, Row, Col, Image } from "react-bootstrap";
import {
  RiCamera3Fill,
  RiErrorWarningFill,
  RiGithubFill,
} from "react-icons/ri";
import graphql from "../images/graphql.png";
import typescript from "../images/typescript.png";
import psql from "../images/psql.png";

const About = () => {
  return (
    <>
      <Container>
        <h1>About</h1>
        <Row style={{ alignItems: "center", minHeight: "25vh" }}>
          <Col style={{ textAlign: "left" }}>
            <h2>What is Memz?</h2>
            <p>
              Most creations are founded on good intentions. However, by natural
              human behavior, these creations have the ability to and often go
              awry. At Memz, we believe that the current state of social media
              is a reflection of this idea. The purpose of Memz is to remove the
              toxicity, and anxiety that often comes with posting on social
              media. Less does it become about artistic vision and expression,
              and more about followers and popularity. At Memz, our goal is to
              provide a place away from the private eye. Only visible to you-
              Memz is a haven for your memories.
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <RiCamera3Fill style={{ fontSize: "9em" }} />
          </Col>
        </Row>
        <Row style={{ alignItems: "center" }}>
          <Col>
            <h2>Purpose of this project.</h2>
            <p>
              Hi, my name is Lucas. I developed this web app. I am a student at
              University trying to dig my teeth into web development. The goal
              of this project was to obviously gain some experience, but with a
              particular focus on Typescript, PostgresSQL, and building a
              GraphQL API.
            </p>
          </Col>
          <Col>
            <Row sm="auto" md="auto" style={{ justifyContent: "center" }}>
              <Col>
                <Image src={graphql} />
              </Col>
              <Col>
                <Image src={typescript} />
              </Col>
              <Col>
                <Image src={psql} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ alignItems: "center" }}>
          <Col style={{ textAlign: "left" }}>
            <h2>GitHub</h2>
            <p>This code is available and free to use under the MIT License.</p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <a href="https://github.com/lucriver/Memz">
              <RiGithubFill style={{ fontSize: "9em" }} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <h2>Notice</h2>
            <p>
              This web app is meant purely for demonstrational purposes. The
              contents of the server are wiped on a daily basis. To contact me
              please refer to the link to my personal website in the bottom
              right corner.
              <br />
              MIT License Copyright (c) 2022 Lucas Hirt
            </p>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <RiErrorWarningFill style={{ fontSize: "9em" }} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
