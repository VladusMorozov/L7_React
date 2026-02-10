import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTaskModal({ close, addTask }) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Активная задача");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!description || !status || !deadline) {
      setError("Все поля обязательны");
      return;
    }

    addTask({
      id: uuidv4(),
      description,
      status,
      deadline
    });

    close();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Добавить новую задачу</h2>

        <input
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Активная задача</option>
          <option>Задача выполнена</option>
          <option>Задача отменена</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSubmit}>
          Создать задачу
        </button>

        <button onClick={close}>X</button>
      </div>
    </div>
  );
}

export default AddTaskModal;