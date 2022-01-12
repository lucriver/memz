import { Container, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

const All = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1>ALL</h1>
        </div>
      </Container>
    </>
  );
};

export default All;
