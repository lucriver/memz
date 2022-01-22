import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import "./component-styles.css";
import { BsPersonCircle } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { RiCamera3Fill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";

const NavigationBar = () => {
  const auth = useAuth();
  const [options, setOptions] = useState([""]);

  useEffect(() => {
    if (auth.currentUser == null) {
      setOptions(["Sign In"]);
    } else {
      setOptions(["Profile", "Settings", "Sign Out"]);
    }
  }, [auth.currentUser]);

  return (
    <>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        style={{ margin: "0em 0em 1em 0em" }}
      >
        <Container>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <FaBook size={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {["All", "Pictures", "Videos", "Journals"].map((linkLabel) => (
                <Dropdown.Item
                  href={linkLabel.toLowerCase().replace(/ /g, "-")}
                  key={linkLabel}
                >
                  {linkLabel}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <a
            href="/welcome"
            style={{
              fontSize: "3em",
              color: "white",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: "5px",
            }}
          >
            <h5 style={{ margin: ".5px 0px 0px 0px" }}>Memz</h5>
            <RiCamera3Fill />
          </a>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant="primary">
              <BsPersonCircle size={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" align="end">
              {options.map((linkLabel) => (
                <Dropdown.Item
                  href={linkLabel.toLowerCase().replace(/ /g, "-")}
                  key={linkLabel}
                >
                  {linkLabel}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavigationBar;
