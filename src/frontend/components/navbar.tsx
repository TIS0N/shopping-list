/*
import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu button and close button

type HeaderProps = {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="d-flex justify-content-between"
    >
      <Navbar.Brand href="#">Shopping List</Navbar.Brand>

      <Button variant="outline-light" onClick={onToggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}{" "}
      </Button>
    </Navbar>
  );
};

export default Header;
*/
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react"; // for the burger icon

type NavbarProps = {
  onToggleSidebar: () => void; // Function to handle sidebar opening/closing
};

const AppNavbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand id="logo">ShoppingListApp</Navbar.Brand>
      <Nav className="ml-auto">
        {/* Burger Menu Icon */}
        <Button
          variant="link"
          onClick={onToggleSidebar}
          style={{
            color: "white",
            padding: "0",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            paddingRight: "10px",
          }}
        >
          <Icon path={mdiMenu} size={1.5} color="white" />
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
