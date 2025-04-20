/*
import React, { useEffect, useRef } from "react";
import { Offcanvas, InputGroup, FormControl } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { List } from "../../data/shoppingList";

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];  // Ensure the correct type for the shoppingLists prop
};

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose, shoppingLists }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" scroll>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Icon path={mdiAccountCircle} size={3} />
          Profile Name
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search list..." />
          <InputGroup.Text>
            <Icon path={mdiMagnify} size={1} />
          </InputGroup.Text>
        </InputGroup>

        <h1>Active</h1>
        <ul>
          {shoppingLists
            .filter((list) => list.state === "active")
            .map((list) => (
              <li key={list.id}>
                <a href="#">{list.shoppingListName}</a>
              </li>
            ))}
        </ul>

        <h1>Archived</h1>
        <ul>
          {shoppingLists
            .filter((list) => list.state === "archived") 
            .map((list) => (
              <li key={list.id}>
                <a href="#">{list.shoppingListName}</a>
              </li>
            ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
*/

import React, { useEffect, useRef } from "react";
import { Offcanvas, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { useUser } from "../../user";
import { List } from "../../data/shoppingList";
import { BsThreeDotsVertical } from "react-icons/bs";

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];
};

const Sidebar: React.FC<SidebarProps> = ({
  show,
  handleClose,
  shoppingLists,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useUser(); // Get the currently selected user

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  // Filter shopping lists based on the current user
  const filteredLists = shoppingLists.filter((list) => {
    console.log(
      `Checking list: ${list.shoppingListName}, ownerId: ${list.ownerId}, invitedUsers: ${list.invitedUsers}`
    );
    return list.ownerId === user.id || list.invitedUsers.includes(user.id);
  });

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      scroll
      id="sidebar"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Icon path={mdiAccountCircle} size={3} />
          <span id="profileName">{user.name}</span>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search list..." />
          <InputGroup.Text>
            <Icon path={mdiMagnify} size={1} />
          </InputGroup.Text>
        </InputGroup>

        <h1>Active</h1>
        <ul>
          {filteredLists
            .filter((list) => list.state === "active")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <a id="listButton" style={{ color: "white" }}>
                  {list.shoppingListName}
                </a>

                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    className="btn btn-link p-0 border-0"
                    style={{ color: "white" }}
                  >
                    <BsThreeDotsVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Edit List</Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      Delete List
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ))}
        </ul>

        <h1 style={{ color: "grey" }}>Archived</h1>
        <ul id="lists">
          {filteredLists
            .filter((list) => list.state === "archived")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <a id="listButtonArchived" style={{ color: "grey" }}>
                  {list.shoppingListName}
                </a>

                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    className="btn btn-link p-0 border-0"
                    style={{ color: "white" }}
                  >
                    <BsThreeDotsVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Edit List</Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      Delete List
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
