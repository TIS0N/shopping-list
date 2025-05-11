import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../data/shoppingList";
import { useUser } from "../user";
import { v4 as uuidv4 } from "uuid";
import { saveList } from "../utils/localStorage";
import { useTranslation } from "react-i18next";

const CreateList = () => {
  const { t } = useTranslation();
  const [showMessage, setShowMessage] = useState(false);
  const [listName, setListName] = useState("");
  const state = "Active";
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
    console.log("New List Created:", newList);

    setShowMessage(true);
    setTimeout(() => {
      navigate(`/dashboard/${newList.id}`);
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <h2>{t("createNewList")}</h2>

      {showMessage && (
        <div className="alert alert-success">
          {t("listCreatedSuccessfully")}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("listNameLabel")}</label>
          <input
            type="text"
            className="form-control"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {t("createListButton")}
        </button>
      </form>
    </div>
  );
};

export default CreateList;
