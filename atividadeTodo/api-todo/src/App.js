import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/list" element={<TaskList />} />
        <Route path="/edit/:id" element={<TaskItem />} />
        <Route path="/" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
