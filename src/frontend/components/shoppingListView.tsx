import React from "react";
import shoppingLists from "../../data/shoppingList";
import { useUser } from "../../user";

const ShoppingListsView: React.FC = () => {
  const user = useUser();

  // Filter lists where the user is the owner or invited
  const userLists = shoppingLists.filter(
    (list) => list.ownerId === user.id || list.invitedUsers.includes(user.id)
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Shopping Lists</h2>
      {userLists.length === 0 ? (
        <p>No shopping lists found for you.</p>
      ) : (
        <ul className="list-group">
          {userLists.map((list) => (
            <li
              key={list.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{list.shoppingListName}</strong>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  Owner: {list.userName}
                </div>
              </div>
              <span
                className={`badge ${
                  list.state === "archived" ? "bg-success" : "bg-secondary"
                }`}
              >
                {list.state}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingListsView;
