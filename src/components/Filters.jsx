function Filters({ setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter("all")}>
        Все задачи
      </button>
      <button onClick={() => setFilter("active")}>
        Активные задачи
      </button>
      <button onClick={() => setFilter("completed")}>
        Завершенные задачи
      </button>
    </div>
  );
}

export default Filters;