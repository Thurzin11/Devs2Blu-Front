import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskItem() {
  const { id } = useParams();
  
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: "",
    description: "",
    done: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Erro ao buscar a tarefa:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, task);
      navigate("/list");
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  return (
    <div className="container my-4 p-4 bg-light rounded shadow">
      <h1 className="text-center text-primary mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="done"
            name="done"
            checked={task.done}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="done" className="form-check-label">
            Done
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskItem;
