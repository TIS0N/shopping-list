import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List } from "../data/shoppingList";
//import { useUser } from "../user";
import { getStoredLists, saveList, deleteList } from "../utils/localStorage";
import DropdownMenu from "./components/dropdownMenu";

const EditList = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<List | null>(null);
  const [listName, setListName] = useState("");
  const [state, setState] = useState<"Active" | "Archived">("Active");
  const navigate = useNavigate();
  //const user = useUser();

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
    navigate("/");
  };

  useEffect(() => {
    const lists = getStoredLists();
    const currentList = lists.find((list) => list.id === listId);
    if (currentList) {
      setList(currentList);
      setListName(currentList.shoppingListName);
      setState(currentList.state);
    } else {
      navigate("/");
    }
  }, [listId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (list) {
      const updatedList: List = {
        ...list,
        shoppingListName: listName,
        state,
      };

      saveList(updatedList);
      console.log("List updated:", updatedList);
      navigate(`/dashboard/${updatedList.id}`);
    }
  };

  if (!list) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div
        className="listInfo"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 id="listStateInfo">
          {list.state} &gt; {list.shoppingListName} &gt; Edit List
        </h1>
        <DropdownMenu
          listId={list.id}
          onDelete={() => handleDeleteList(list.id)}
        />
      </div>

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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditList;
