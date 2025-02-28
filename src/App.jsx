import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import EntriesPage from "./pages/EntriesPage";
import FormPage from "./pages/Formpage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/" element={<EntriesPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/entries" element={<EntriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
