import React, { useState } from "react";
import Sidebar from "./frontend/components/sidebar";
import shoppingLists from "./data/shoppingList";
import { UserProvider, UserSelector } from "./user";
import AppNavbar from "./frontend/components/navbar";
import "./frontend/CSS/navbar.css";
import "./frontend/CSS/sidebar.css";

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    // Wrapping the app with UserProvider to provide user context
    <UserProvider>
      <div>
        <AppNavbar onToggleSidebar={handleShowSidebar} />
        <UserSelector />
        <Sidebar
          show={showSidebar}
          handleClose={handleCloseSidebar}
          shoppingLists={shoppingLists}
        />
      </div>
    </UserProvider>
  );
};

export default App;
