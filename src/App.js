import Register from "./Pages/Auth/Register";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./redux/slice/authSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector((state)=>state.user.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log("App");
    if(user=== undefined || user === null){
      console.log("обнавление юзера");
      dispatch(fetchMe())
    }
  },[])
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
