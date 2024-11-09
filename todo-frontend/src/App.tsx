import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import { useContext, useEffect, useState } from "react";
import TodoServices from "./apiServices/todoServices";
import UpdateTodoCard from "./components/UpdateTodoCard/UpdateTodoCard";
import { TodoContext, TodoProvider } from "./store/todoStore";

function App() {
  const { currentTodoId } = useContext(TodoContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myday" element={<Home />}></Route>
        <Route path="/notfound" element={<NotFound />}></Route>
        <Route path="/verify_email/:token" element={<VerifyEmail />}></Route>
        <Route path={`/myday/tasks/:id/activity`} element={<UpdateTodoCard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
