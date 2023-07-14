import { Route, Routes } from "react-router-dom";
import CreateRoute from "./Pages/CreateRoute";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import TempPage from "./Pages/TempPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateRoute />} />
      <Route path="/temp" element={<TempPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
