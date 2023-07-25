import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Mail from "./components/Inbox";
// import { Route, Routes } from "react-router-dom";
import Sent from "./components/Sent";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
