import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../data/shoppingList"; // adjust path if needed
import { useUser } from "../user";
import { v4 as uuidv4 } from "uuid";
import { saveList } from "../utils/localStorage";

const CreateList = () => {
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

export default CreateList;
