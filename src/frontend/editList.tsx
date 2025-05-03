/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../data/shoppingList"; // adjust path if needed
import { useUser } from "../user";
import { v4 as uuidv4 } from "uuid";
import { saveList } from "../utils/localStorage";

const EditList = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [listName, setListName] = useState("");
  const [state, setState] = useState<"Active" | "Archived">("Active");
  const navigate = useNavigate();
  const user = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newList: List = {
      id: uuidv4(),
      shoppingListName: listName,
      userName: user.name,
      state,
      ownerId: user.id,
      invitedUsers: [],
    };

    saveList(newList);
    console.log("New List Created:", newList); // console log shows that the message was "created"

    setShowMessage(true);
    setTimeout(() => {
      navigate(`/dashboard/${newList.id}`); // simulate navigation after 1.5 sec
    }, 1500);
  };

  // ToDo: Save to actual data source (state, DB, etc.)

  return (
    <div className="container mt-4">
      <h2>Create New Shopping List</h2>

      {showMessage && (
        <div className="alert alert-success">✅ List created successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">List Name</label>
          <input
            type="text"
            className="form-control"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">State</label>
          <select
            className="form-select"
            value={state}
            onChange={(e) => setState(e.target.value as "Active" | "Archived")}
          >
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create List
        </button>
      </form>
    </div>
  );
};

export default EditList;
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List } from "../data/shoppingList"; // Adjust path if needed
import { useUser } from "../user";
import { getStoredLists, saveList } from "../utils/localStorage"; // Adjust paths if needed

const EditList = () => {
  const { listId } = useParams<{ listId: string }>(); // Get the listId from URL params
  const [list, setList] = useState<List | null>(null); // State to store the loaded list
  const [listName, setListName] = useState("");
  const [state, setState] = useState<"Active" | "Archived">("Active");
  const navigate = useNavigate();
  const user = useUser();

  // Load the list based on listId
  useEffect(() => {
    const lists = getStoredLists(); // Get stored lists from localStorage
    const currentList = lists.find((list) => list.id === listId);
    if (currentList) {
      setList(currentList);
      setListName(currentList.shoppingListName); // Pre-fill the list name
      setState(currentList.state); // Pre-fill the list state
    } else {
      navigate("/"); // Redirect if the list is not found
    }
  }, [listId, navigate]);

  // Handle form submission (update the list)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (list) {
      // Update the current list
      const updatedList: List = {
        ...list,
        shoppingListName: listName,
        state, // Use the updated state
      };

      saveList(updatedList); // Save the updated list to localStorage
      console.log("List updated:", updatedList);

      navigate(`/dashboard/${updatedList.id}`); // Navigate to the dashboard with the updated list
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Shopping List</h2>
      {list === null && <p>Loading...</p>}{" "}
      {/* Show loading message while the list is being fetched */}
      {/* Show a success message after the list is updated */}
      {list && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">List Name</label>
            <input
              type="text"
              className="form-control"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <select
              className="form-select"
              value={state}
              onChange={(e) =>
                setState(e.target.value as "Active" | "Archived")
              }
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditList;
