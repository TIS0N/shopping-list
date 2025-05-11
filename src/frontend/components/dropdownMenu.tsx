import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleEdit = () => {
    if (handleClose) handleClose();
    navigate(`/editList/${listId}`);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        /*as="button"*/
        variant="link"
        className="btn btn-link p-0 border-0"
        style={{ color: "white" }}
      >
        <BsThreeDotsVertical size={25} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>Edit List</Dropdown.Item>
        <Dropdown.Item className="text-danger" onClick={onDelete}>
          Delete List
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
