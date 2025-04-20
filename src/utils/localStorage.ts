import { List } from "../data/shoppingList";
import defaultLists from "../data/shoppingList"; // your hardcoded lists

const STORAGE_KEY = "shoppingLists";

export const getStoredLists = (): List[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const storedLists: List[] = stored ? JSON.parse(stored) : [];

  // Merge with default lists (avoid duplicates)
  const all = [...defaultLists];

  storedLists.forEach((storedList) => {
    const exists = all.some((list) => list.id === storedList.id);
    if (!exists) all.push(storedList);
  });

  return all;
};

export const saveList = (list: List) => {
  const stored = getStoredLists().filter(l => !defaultLists.some(d => d.id === l.id)); // only store non-default
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, list]));
};
