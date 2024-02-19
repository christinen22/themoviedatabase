import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
import Genres from "../Genres";
import logo from "../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg";

const Navigation = () => {
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);

  const handleGenresClick = () => {
    setShowGenresDropdown(!showGenresDropdown);
  };

  return (
    <Navbar variant="dark" expand="md">
      <Navbar.Brand as={Link} to="/">
        <Image src={logo} width="100" height="100" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" className="custom-nav-link">
            Home
          </Nav.Link>
          <NavDropdown
            title="Genres"
            id="basic-nav-dropdown"
            show={showGenresDropdown}
            onClick={handleGenresClick}
          >
            <Genres />
          </NavDropdown>
          <Nav.Link as={NavLink} to="/latest" className="custom-nav-link">
            Latest Movies
          </Nav.Link>
          <Nav.Link as={NavLink} to="/popular">
            Popular Movies
          </Nav.Link>
          <Nav.Link as={NavLink} to="/toprated">
            Top rated Movies
          </Nav.Link>
          <Nav.Link as={NavLink} to="/toprated-tv">
            TV Shows
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
