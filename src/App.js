import Register from "./Pages/Auth/Register";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
