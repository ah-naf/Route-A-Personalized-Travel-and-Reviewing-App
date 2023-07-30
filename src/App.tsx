import { Route, Routes } from "react-router-dom";
import CreateRoute from "./Pages/CreateRoute";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import SearchPage from "./Pages/SearchPage";
import ShowRoute from "./Pages/ShowRoute";
import TempPage from "./Pages/TempPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateRoute />} />
      <Route path="/temp" element={<TempPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/route/:id" element={<ShowRoute />} />
    </Routes>
  );
}

export default App;
