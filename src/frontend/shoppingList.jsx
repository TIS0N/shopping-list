import React, { useState, useEffect } from "react";
import shoppingLists from "../data/shoppinglist.js"; 
import itemsList from "../data/itemList.js"; 
import User from "./user.js"; 

const ShoppingList = () => {
  const currentUser = User(); 
  const [userShoppingLists, setUserShoppingLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);


  useEffect(() => {
    const userLists = shoppingLists.filter(
      (list) =>
        list.ownerId === currentUser.id || list.invitedUsers.includes(currentUser.id)
    );
    setUserShoppingLists(userLists);
  }, [currentUser]);


  const handleListSelection = (listId) => {
    const list = shoppingLists.find((list) => list.id === listId);
    setSelectedList(list);
  };


  const filteredItems = selectedList
    ? itemsList.filter((item) => item.shoppingListId === selectedList.id)
    : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Lists</h1>
      <div className="mb-4">
        <h2 className="text-xl">Your Shopping Lists</h2>
        <ul>
          {userShoppingLists.map((list) => (
            <li
              key={list.id}
              className="cursor-pointer text-blue-600 hover:underline mb-2"
              onClick={() => handleListSelection(list.id)}
            >
              {list.shoppingListName}
            </li>
          ))}
        </ul>
      </div>

      {selectedList && (
        <>
          <h3 className="text-xl mb-2">Items in "{selectedList.shoppingListName}"</h3>
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id} className="mb-2">
                <span>{item.itemName}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
