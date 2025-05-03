import { List } from "../data/shoppingList";

export const deleteListFromStorage = (listId: string) => {
  const allLists = JSON.parse(localStorage.getItem("shoppingLists") || "[]");
  const updatedLists = allLists.filter((list: List) => list.id !== listId);
  localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
};

export const getUpdatedLists = (): List[] => {
  return JSON.parse(localStorage.getItem("shoppingLists") || "[]");
};