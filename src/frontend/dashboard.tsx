import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoredLists, deleteList } from "../utils/localStorage";
import itemsList, { Item } from "../data/itemList";
import Icon from "@mdi/react";
import { mdiCheck, mdiRefresh } from "@mdi/js";
import DropdownMenu from "./components/dropdownMenu";

const Dashboard = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const shoppingLists = getStoredLists();
  const selectedList = shoppingLists.find((list) => list.id === listId);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const filteredItems = itemsList.filter(
      (item) => item.shoppingListId === listId
    );
    setItems(filteredItems);
  }, [listId]);

  const activeItems = items.filter((item) => item.state === "active");
  const completedItems = items.filter((item) => item.state === "completed");

  const handleComplete = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, state: "completed" } : item
      )
    );
  };

  const handleUndo = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, state: "active" } : item
      )
    );
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
    navigate("/startPage"); // Redirect to homepage after deletion
  };

  if (!selectedList) {
    return <h1>List not found</h1>;
  }

  return (
    <>
      <div
        className="listInfo"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 id="listStateInfo">
          {selectedList.state} &gt; {selectedList.shoppingListName}
        </h1>
        <DropdownMenu
          listId={selectedList.id}
          onDelete={() => handleDeleteList(selectedList.id)}
        />
      </div>

      <div className="listSection">
        <h2>Active Items:</h2>
        {activeItems.map((item) => (
          <div key={item.id} className="itemCard">
            {item.itemName}
            <button
              onClick={() => handleComplete(item.id)}
              className="iconButton"
            >
              <Icon path={mdiCheck} size={1} />
            </button>
          </div>
        ))}
      </div>

      <div className="listSection">
        <h2>Already Bought:</h2>
        {completedItems.map((item) => (
          <div key={item.id} className="itemCard completed">
            {item.itemName}
            <button onClick={() => handleUndo(item.id)} className="iconButton">
              <Icon path={mdiRefresh} size={1} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
