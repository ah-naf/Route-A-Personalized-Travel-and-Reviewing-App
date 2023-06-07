import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateRoute from "./Pages/CreateRoute";
import HomePage from "./Pages/HomePage";
import TempPage from "./Pages/TempPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateRoute />} />
      <Route path="/temp" element={<TempPage />} />
    </Routes>
  );
}

export default App;
