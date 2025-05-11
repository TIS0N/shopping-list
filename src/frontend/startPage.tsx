import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StartPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="createButtonDiv">
        <Link to="/createList">
          <button id="createList">{t("createNewList")}</button>
        </Link>
      </div>
    </>
  );
};

export default StartPage;
