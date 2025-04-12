import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import EditorPage from "./pages/EditorPage";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
