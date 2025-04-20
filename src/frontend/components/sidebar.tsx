/*
import React, { useEffect, useRef, useState } from "react";
import { Offcanvas, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { useUser } from "../../user";
import { List } from "../../data/shoppingList";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getStoredLists } from "../../utils/localStorage";

const deleteListFromStorage = (listId: string) => {
  const allLists = JSON.parse(localStorage.getItem("shoppingLists") || "[]");
  const updatedLists = allLists.filter((list: List) => list.id !== listId);
  localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
};

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];
};

const Sidebar: React.FC<SidebarProps> = ({
  show,
  handleClose,
  //shoppingLists,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useUser(); // Get the currently selected user
  const [shoppingLists, setShoppingLists] = useState<List[]>(getStoredLists()); // Store lists in state

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
  const filteredLists = shoppingLists.filter(
    (list) => list.ownerId === user.id || list.invitedUsers.includes(user.id)
  );

  const handleDeleteList = (listId: string) => {
    deleteListFromStorage(listId); // Remove the list from localStorage
    setShoppingLists(getStoredLists()); // Update state to reflect the changes
  };

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
        <Link to="/createList" onClick={handleClose}>
          <button id="createList">Create New List</button>
        </Link>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search list..." />
          <InputGroup.Text>
            <Icon path={mdiMagnify} size={1} />
          </InputGroup.Text>
        </InputGroup>

        <h1>Active</h1>
        <ul>
          {filteredLists
            .filter((list) => list.state === "Active")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <Link
                  to={`/dashboard/${list.id}`}
                  id="listButton"
                  style={{ color: "white" }}
                  onClick={handleClose}
                >
                  {list.shoppingListName}
                </Link>

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
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDeleteList(list.id)}
                    >
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
            .filter((list) => list.state === "Archived")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <Link
                  to={`/dashboard/${list.id}`}
                  id="listButtonArchived"
                  style={{ color: "grey" }}
                  onClick={handleClose}
                >
                  {list.shoppingListName}
                </Link>

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
*/

import React, { useEffect, useRef, useState } from "react";
import {
  Offcanvas,
  InputGroup,
  FormControl,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { useUser } from "../../user";
import { List } from "../../data/shoppingList";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getStoredLists } from "../../utils/localStorage";

const deleteListFromStorage = (listId: string) => {
  const allLists = JSON.parse(localStorage.getItem("shoppingLists") || "[]");
  const updatedLists = allLists.filter((list: List) => list.id !== listId);
  localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
};

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];
};

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useUser(); // Get the currently selected user
  const [shoppingLists, setShoppingLists] = useState<List[]>(getStoredLists()); // Store lists in state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // To control the modal visibility
  const [listToDelete, setListToDelete] = useState<string | null>(null); // Store the ID of the list to delete

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
  const filteredLists = shoppingLists.filter(
    (list) => list.ownerId === user.id || list.invitedUsers.includes(user.id)
  );

  // Handle list deletion
  const handleDeleteList = (listId: string) => {
    setListToDelete(listId); // Store the list ID to delete
    setShowDeleteModal(true); // Show confirmation modal
  };

  const confirmDelete = () => {
    if (listToDelete) {
      deleteListFromStorage(listToDelete); // Remove the list from localStorage
      setShoppingLists(getStoredLists()); // Update state to reflect the changes
      setShowDeleteModal(false); // Close the modal
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the modal if cancel
  };

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
        <Link to="/createList" onClick={handleClose}>
          <button id="createList">Create New List</button>
        </Link>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search list..." />
          <InputGroup.Text>
            <Icon path={mdiMagnify} size={1} />
          </InputGroup.Text>
        </InputGroup>

        <h1>Active</h1>
        <ul>
          {filteredLists
            .filter((list) => list.state === "Active")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <Link
                  to={`/dashboard/${list.id}`}
                  id="listButton"
                  style={{ color: "white" }}
                  onClick={handleClose}
                >
                  {list.shoppingListName}
                </Link>

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
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDeleteList(list.id)}
                    >
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
            .filter((list) => list.state === "Archived")
            .map((list) => (
              <li
                key={list.id}
                className="d-flex justify-content-between align-items-center mb-2"
                id="list"
              >
                <Link
                  to={`/dashboard/${list.id}`}
                  id="listButtonArchived"
                  style={{ color: "grey" }}
                  onClick={handleClose}
                >
                  {list.shoppingListName}
                </Link>

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
                      <Link to={`/dashboard/`} />
                      Delete List
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ))}
        </ul>
      </Offcanvas.Body>

      {/* Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this list? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Offcanvas>
  );
};

export default Sidebar;
