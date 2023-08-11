import { Route, Routes } from "react-router-dom";
import AddNewPlace from "./Pages/AddNewPlace";
import CreateRoute from "./Pages/CreateRoute";
import Discover from "./Pages/Discover";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import SearchPage from "./Pages/SearchPage";
import ShowRoute from "./Pages/ShowRoute";
import TempPage from "./Pages/TempPage";
import Place from "./Pages/Place";

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
      <Route path="/discover" element={<Discover />} />
      <Route path="/place/new" element={<AddNewPlace />} />
      <Route path="/place/:id" element={<Place />} />
    </Routes>
  );
}

export default App;
