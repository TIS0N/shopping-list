import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./frontend/dashboard";
import CreateList from "./frontend/createList";
import EditList from "./frontend/editList";
import React, { useState } from "react";
import Sidebar from "./frontend/components/sidebar";
import shoppingLists from "./data/shoppingList";
import { UserProvider, UserSelector } from "./user";
import AppNavbar from "./frontend/components/navbar";
import "./frontend/CSS/navbar.css";
import "./frontend/CSS/sidebar.css";
import "./frontend/CSS/dashboardStyle.css";
import "./App.css";

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    <BrowserRouter>
      <UserProvider>
        <AppNavbar onToggleSidebar={handleShowSidebar} />
        <UserSelector />
        <Sidebar
          show={showSidebar}
          handleClose={handleCloseSidebar}
          shoppingLists={shoppingLists}
        />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:listId" element={<Dashboard />} />
          <Route path="/createList" element={<CreateList />} />
          <Route path="/editList/:listId" element={<EditList />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
