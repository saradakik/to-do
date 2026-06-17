const PRIORITIES = ['low', 'medium', 'high'];

function TodoForm({ inputValue, setInputValue, priority, setPriority, addTodo }) {
  const isEmpty = inputValue.trim() === '';

  return (
    <form onSubmit={addTodo} className="input-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-field"
        aria-label="New task"
      />

      <div className="priority-picker" role="group" aria-label="Priority">
        {PRIORITIES.map((level) => (
          <button
            key={level}
            type="button"
            className={`priority-option priority-${level} ${priority === level ? 'selected' : ''}`}
            onClick={() => setPriority(level)}
            aria-pressed={priority === level}
            title={`${level} priority`}
          >
            {level.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>

      <button type="submit" className="add-button" disabled={isEmpty}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
