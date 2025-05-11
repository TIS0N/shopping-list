import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <div className="createButtonDiv">
        <Link to="/createList">
          <button id="createList">Create New List</button>
        </Link>
      </div>
    </>
  );
};

export default StartPage;
