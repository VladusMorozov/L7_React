import { useState } from "react";

function getStatusClass(status) {
  if (status === "Активная задача") return "status-active";
  if (status === "Задача выполнена") return "status-done";
  return "status-cancel";
}

function AddTaskModal({ close, addTask }) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Активная задача");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!description || !status || !deadline) {
      setError("Заполните все поля");
      return;
    }

    addTask({
      id: crypto.randomUUID(),
      description,
      status,
      deadline,
    });

    close();
  };

  return (
    <div className="modal-box">
      <div className="modal-header">
        <h2>Добавить новую задачу</h2>
        <span className="close-btn" onClick={close}>
          ✕
        </span>
      </div>

      <div className="form-row">
        <label>Описание</label>
        <input
          placeholder="Введите описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Статус</label>
        <div className="status-select-wrapper">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Активная задача</option>
            <option>Задача выполнена</option>
            <option>Задача отменена</option>
          </select>
          <span className={getStatusClass(status)}>{status}</span>
        </div>
      </div>

      <div className="form-row">
        <label>Дедлайн</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="btn-wrapper">
        <button onClick={handleSubmit}>Добавить задачу</button>
      </div>
    </div>
  );
}

export default AddTaskModal;