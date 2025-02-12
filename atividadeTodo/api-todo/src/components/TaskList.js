import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importando o Link para navegação
import axios from "axios";

function TaskList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setIsUpdate(true);
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTodo();
  }, [isUpdate]);

  return (
    <div className="container my-4 p-4 bg-light rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1
          className="text-center text-primary mb-4"
          style={{ flexBasis: "90%" }}
        >
          List Todos
        </h1>
        <Link to="/" className="btn btn-primary" style={{ flexBasis: "10%" }}>
          Add New Task
        </Link>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Done</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id} onClick={() => navigate(`/edit/${todo.id}`)}>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
                <td className="text-center">{todo.done ? "✅" : "❌"}</td>
                <td className="text-center">
                  <Link
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(todo.id);
                    }}
                  >
                    Excluir
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Nenhuma tarefa encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
