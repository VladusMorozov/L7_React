import { useState } from "react";

function TodoTable({ tasks, deleteTask, updateTask }) {
  const [editing, setEditing] = useState(null);

  const getStatusClass = (status) => {
    if (status === "Активная задача") return "status-active";
    if (status === "Задача выполнена") return "status-done";
    return "status-cancel";
  };

  const isDeadlineOverdue = (task) => {
    if (task.status !== "Активная задача" || !task.deadline) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(task.deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    return deadlineDate < today;
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return "";
    // ожидаем формат YYYY-MM-DD и выводим DD.MM.YYYY
    const [year, month, day] = deadline.split("-");
    if (!year || !month || !day) return deadline;
    return `${day}.${month}.${year}`;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Описание</th>
          <th>Статус</th>
          <th>Дедлайн</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td
              onClick={() =>
                setEditing({ id: task.id, field: "description" })
              }
            >
              {editing?.id === task.id &&
              editing.field === "description" ? (
                <input
                  autoFocus
                  defaultValue={task.description}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      setEditing(null);
                      return;
                    }
                    updateTask(task.id, "description", e.target.value);
                    setEditing(null);
                  }}
                />
              ) : (
                task.description
              )}
            </td>

            <td
              onClick={() =>
                setEditing({ id: task.id, field: "status" })
              }
            >
              {editing?.id === task.id &&
              editing.field === "status" ? (
                <select
                  autoFocus
                  defaultValue={task.status}
                  onBlur={(e) => {
                    updateTask(task.id, "status", e.target.value);
                    setEditing(null);
                  }}
                >
                  <option>Активная задача</option>
                  <option>Задача выполнена</option>
                  <option>Задача отменена</option>
                </select>
              ) : (
                <span className={getStatusClass(task.status)}>
                  {task.status}
                </span>
              )}
            </td>

            <td
              onClick={() =>
                setEditing({ id: task.id, field: "deadline" })
              }
            >
              {editing?.id === task.id &&
              editing.field === "deadline" ? (
                <input
                  type="date"
                  autoFocus
                  defaultValue={task.deadline}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setEditing(null);
                      return;
                    }
                    updateTask(task.id, "deadline", e.target.value);
                    setEditing(null);
                  }}
                />
              ) : (
                <span
                  className={
                    isDeadlineOverdue(task) ? "deadline-overdue" : ""
                  }
                >
                  {formatDeadline(task.deadline)}
                </span>
              )}
            </td>

            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;