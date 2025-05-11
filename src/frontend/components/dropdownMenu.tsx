import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ListDropdownProps = {
  listId: string;
  onDelete: () => void;
  handleClose?: () => void;
};

const DropdownMenu: React.FC<ListDropdownProps> = ({
  listId,
  onDelete,
  handleClose,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (handleClose) handleClose();
    navigate(`/editList/${listId}`);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="btn btn-link p-0 border-0"
        style={{ color: "white" }}
      >
        <BsThreeDotsVertical size={25} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>{t("editList")}</Dropdown.Item>
        <Dropdown.Item className="text-danger" onClick={onDelete}>
          {t("deleteList")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
