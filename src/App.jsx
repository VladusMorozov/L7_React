import { useState } from "react";
import initialData from "./data/tasks.json";
import TodoTable from "./components/TodoTable";
import AddTaskModal from "./components/AddTaskModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(initialData);
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (id, field, value) => {
    if (!value.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return task.status === "Активная задача";
    if (filter === "completed")
      return (
        task.status === "Задача выполнена" ||
        task.status === "Задача отменена"
      );
    return true;
  });

  return (
    <div className="page">
      <div className="header">
        <div
          className={`tab ${filter === "all" ? "tab-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Все задачи
        </div>
        <div
          className={`tab ${filter === "active" ? "tab-active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Активные задачи
        </div>
        <div
          className={`tab ${filter === "completed" ? "tab-active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Завершенные задачи
        </div>
      </div>

      <div className="content">
        <div className="content-left">
          <TodoTable
            tasks={filteredTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />

          <button className="add-btn" onClick={() => setIsOpen(true)}>
            Добавить задачу
          </button>
        </div>

        <div className="content-right">
          {isOpen && (
            <AddTaskModal
              close={() => setIsOpen(false)}
              addTask={addTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;