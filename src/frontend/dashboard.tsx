import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoredLists } from "../utils/localStorage";
import itemsList, { Item } from "../data/itemList";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Icon from "@mdi/react";
import { mdiCheck, mdiRefresh } from "@mdi/js";

const Dashboard = () => {
  const { listId } = useParams<{ listId: string }>(); // Retrieve listId from the URL
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

  if (!selectedList) {
    return <h1>List not found</h1>;
  }

  return (
    <>
      <div className="listInfo">
        <h1 id="listStateInfo">
          {selectedList.state} &gt; {selectedList.shoppingListName}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="btn btn-link p-0 border-0"
              style={{ color: "white" }}
            >
              <BsThreeDotsVertical size={30} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Edit List</Dropdown.Item>
              <Dropdown.Item className="text-danger">Delete List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h1>
      </div>

      {/* Active Items */}
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

      {/* Completed Items */}
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
