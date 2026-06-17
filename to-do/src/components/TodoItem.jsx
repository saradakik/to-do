import { useState, useEffect } from 'react';

const PRIORITY_ORDER = ['low', 'medium', 'high'];

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Med',
  high: 'High',
};

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo, updatePriority }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const priority = todo.priority || 'medium';

  useEffect(() => {
    if (!isEditing) {
      setEditText(todo.text);
    }
  }, [todo.text, isEditing]);

  const handleSave = () => {
    if (editText.trim() === '') {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const cyclePriority = () => {
    const index = PRIORITY_ORDER.indexOf(priority);
    const next = PRIORITY_ORDER[(index + 1) % PRIORITY_ORDER.length];
    updatePriority(todo.id, next);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          className="input-field edit-mode-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <>
          <button
            type="button"
            className={`check-button ${todo.completed ? 'checked' : ''}`}
            onClick={() => toggleTodo(todo.id)}
            aria-label={todo.completed ? 'Mark as active' : 'Mark as complete'}
          >
            {todo.completed && '✓'}
          </button>

          <button
            type="button"
            className={`priority-badge priority-${priority}`}
            onClick={cyclePriority}
            title="Click to change priority"
            aria-label={`Priority: ${priority}. Click to change.`}
          >
            <span className="priority-dot" aria-hidden="true" />
            {PRIORITY_LABELS[priority]}
          </button>

          <span
            className={`todo-text ${!todo.completed ? 'todo-text--editable' : ''}`}
            onClick={() => !todo.completed && setIsEditing(true)}
            title={todo.completed ? undefined : 'Click to edit'}
          >
            {todo.text}
          </span>

          <button
            type="button"
            className="delete-button"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
