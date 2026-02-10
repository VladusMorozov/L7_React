import { useState } from "react";
import initialData from "./data/tasks.json";
import TodoTable from "./components/TodoTable";
import AddTaskModal from "./components/AddTaskModal";
import Filters from "./components/Filters";
import initialData from "./data/tasks.json";

function App() {
  const [tasks, setTasks] = useState(initialData);
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id, field, value) => {
    if (!value.trim()) return;

    setTasks(tasks.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return task.status === "Активная задача";
    if (filter === "completed")
      return task.status === "Задача выполнена" ||
             task.status === "Задача отменена";
    return true;
  });

  return (
    <div className="container">
      <Filters setFilter={setFilter} />

      <TodoTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />

      <button onClick={() => setIsOpen(true)}>
        Добавить задачу
      </button>

      {isOpen && (
        <AddTaskModal
          close={() => setIsOpen(false)}
          addTask={addTask}
        />
      )}
    </div>
  );
}

export default App;