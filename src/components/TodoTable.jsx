import { useState } from "react";

function TodoTable({ tasks, deleteTask, updateTask }) {
  const [editing, setEditing] = useState(null);

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
        {tasks.map(task => (
          <tr key={task.id}>
            <td
              onClick={() => setEditing({ id: task.id, field: "description" })}
            >
              {editing?.id === task.id && editing.field === "description" ? (
                <input
                  autoFocus
                  defaultValue={task.description}
                  onBlur={(e) => {
                    updateTask(task.id, "description", e.target.value);
                    setEditing(null);
                  }}
                />
              ) : (
                task.description
              )}
            </td>

            <td
              onClick={() => setEditing({ id: task.id, field: "status" })}
            >
              {editing?.id === task.id && editing.field === "status" ? (
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
                task.status
              )}
            </td>

            <td
              onClick={() => setEditing({ id: task.id, field: "deadline" })}
            >
              {editing?.id === task.id && editing.field === "deadline" ? (
                <input
                  type="date"
                  autoFocus
                  defaultValue={task.deadline}
                  onBlur={(e) => {
                    updateTask(task.id, "deadline", e.target.value);
                    setEditing(null);
                  }}
                />
              ) : (
                task.deadline
              )}
            </td>

            <td>
              <button onClick={() => deleteTask(task.id)}>
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