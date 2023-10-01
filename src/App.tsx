import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddNewPlace from "./Pages/AddNewPlace";
import CreateRoute from "./Pages/CreateRoute";
import Discover from "./Pages/Discover";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Place from "./Pages/Place";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import SearchPage from "./Pages/SearchPage";
import ShowRoute from "./Pages/ShowRoute";
import TempPage from "./Pages/TempPage";
import { RootState } from "./store";
import Review from "./Pages/Review";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const AuthRestrictedRoute = ({
    element: Element,
    ...rest
  }: {
    element: React.ElementType;
  }) => {
    if (auth.user) {
      navigate("/");
      return null;
    }
    return <Element {...rest} />;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {auth && <Route path="/create/:id" element={<CreateRoute />} />}
      <Route path="/temp" element={<TempPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<AuthRestrictedRoute element={Login} />} />
      <Route
        path="/register"
        element={<AuthRestrictedRoute element={Register} />}
      />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/route/:id" element={<ShowRoute />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/place/new" element={<AddNewPlace />} />
      <Route path="/place/:id" element={<Place />} />
      <Route path="/review/:id" element={<Review />} />
    </Routes>
  );
}

export default App;
