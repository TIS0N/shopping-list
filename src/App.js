import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider, UserSelector, useUser } from "./user"; // Import user context
import ShoppingList from "./frontend/shoppingList"; // Import the shopping list component

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser.name}!</h1>
      <UserSelector />
      <button
        onClick={() => navigate("/shoppingList")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Shopping List
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
