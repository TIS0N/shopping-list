import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../data/shoppingList"; // adjust path if needed
import { v4 as uuidv4 } from "uuid";

const CreateList = () => {
  const [listName, setListName] = useState("");
  const [state, setState] = useState<"Active" | "Archived">("Active");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newList: List = {
      id: uuidv4(),
      shoppingListName: listName,
      state,
      ownerId: "user-id-placeholder", // Replace this with actual user context
      invitedUsers: [],
    };

    // Save to local state or server — depending on your setup
    console.log("Creating list:", newList);

    // Redirect back to dashboard or wherever
    navigate(`/dashboard/${newList.id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Create New Shopping List</h2>
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
