/*
import React, { useEffect, useRef, useState } from "react";
import {
  Offcanvas,
  InputGroup,
  FormControl,
  Modal,
  Button,
} from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { useUser } from "../../user";
import { List } from "../../data/shoppingList";
import { Link } from "react-router-dom";
import { deleteList, getStoredLists } from "../../utils/localStorage";
import DropdownMenu from "./dropdownMenu";

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];
};

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const [shoppingLists, setShoppingLists] = useState<List[]>(getStoredLists());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

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

  const filteredLists = shoppingLists.filter(
    (list) => list.ownerId === user.id || list.invitedUsers.includes(user.id)
  );

  const handleDeleteList = (listId: string) => {
    setListToDelete(listId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      deleteList(listToDelete);
      setShoppingLists(getStoredLists());
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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

                <DropdownMenu
                  listId={list.id}
                  onDelete={() => handleDeleteList(list.id)}
                  handleClose={handleClose}
                />
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

                <DropdownMenu
                  listId={list.id}
                  onDelete={() => handleDeleteList(list.id)}
                  handleClose={handleClose}
                />
              </li>
            ))}
        </ul>
      </Offcanvas.Body>

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
*/
import React, { useEffect, useRef, useState } from "react";
import {
  Offcanvas,
  InputGroup,
  FormControl,
  Modal,
  Button,
  Dropdown,
} from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import { useUser } from "../../user";
import { List } from "../../data/shoppingList";
import { Link } from "react-router-dom";
import { deleteList, getStoredLists } from "../../utils/localStorage";
import DropdownMenu from "./dropdownMenu";
import { useTranslation } from "react-i18next";
import ThemeToggleButton from "./themeToggleButton";

type SidebarProps = {
  show: boolean;
  handleClose: () => void;
  shoppingLists: List[];
};

const Sidebar: React.FC<SidebarProps> = ({ show, handleClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const [shoppingLists, setShoppingLists] = useState<List[]>(getStoredLists());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);
  const { i18n, t } = useTranslation();

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

  const filteredLists = shoppingLists.filter(
    (list) => list.ownerId === user.id || list.invitedUsers.includes(user.id)
  );

  const handleDeleteList = (listId: string) => {
    setListToDelete(listId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      deleteList(listToDelete);
      setShoppingLists(getStoredLists());
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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

      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          <Link to="/createList" onClick={handleClose}>
            <button id="createList">{t("createNewList")}</button>
          </Link>

          <InputGroup className="mb-3">
            <FormControl placeholder={t("searchList")} />
            <InputGroup.Text>
              <Icon path={mdiMagnify} size={1} />
            </InputGroup.Text>
          </InputGroup>

          <h1>{t("active")}</h1>
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

                  <DropdownMenu
                    listId={list.id}
                    onDelete={() => handleDeleteList(list.id)}
                    handleClose={handleClose}
                  />
                </li>
              ))}
          </ul>

          <h1 style={{ color: "grey" }}>{t("archived")}</h1>
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

                  <DropdownMenu
                    listId={list.id}
                    onDelete={() => handleDeleteList(list.id)}
                    handleClose={handleClose}
                  />
                </li>
              ))}
          </ul>
        </div>

        <ThemeToggleButton />
        {/* Language Switcher */}
        <div className="mt-3 text-center">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              🌐 {i18n.language.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage("en")}>
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("cz")}>
                Čeština
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("sk")}>
                Slovenčina
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Offcanvas.Body>

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{t("confirmDeletion")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("confirmDeletionMessage")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            {t("cancel")}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Offcanvas>
  );
};

export default Sidebar;
