import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1>Sorry, we couldn't find that page.</h1>
          <h3>Let us help you back</h3>
          <Link to="/home">
            <Button className="w-100">Home</Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default NoPage;
