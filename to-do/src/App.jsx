import { useState, useEffect } from "react";
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import FilterTabs from './components/FilterTabs';
import ProgressStats from './components/ProgressStats';
import EmptyState from './components/EmptyState';

const STORAGE_KEY = "my-todo-list";

const FILTER_LABELS = {
  all: "All Objectives",
  active: "Active Items",
  completed: "Completed Items",
};

const SAMPLE_TASKS = [
  { text: 'Review project notes', priority: 'medium' },
  { text: 'Buy groceries', priority: 'low' },
  { text: 'Finish assignment', priority: 'high' },
];

function createTodo(text, priority = 'medium') {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    priority,
  };
}

function normalizeTodo(todo) {
  return {
    ...todo,
    priority: todo.priority || 'medium',
  };
}

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return SAMPLE_TASKS.map(({ text, priority }) => createTodo(text, priority));
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeTodo) : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    setTodos((prev) => [...prev, createTodo(text, priority)]);
    setInputValue('');
    setPriority('medium');
  };

  const addSuggestion = (text, suggestionPriority) => {
    setTodos((prev) => [...prev, createTodo(text, suggestionPriority)]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const updatePriority = (id, newPriority) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.length - remaining;
  const hasCompleted = completed > 0;

  const filterCounts = {
    all: todos.length,
    active: remaining,
    completed,
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile-section">
          <h1 className="title">Workspace</h1>
          <p className="date-str">{currentDate}</p>
        </div>

        <ProgressStats
          total={todos.length}
          active={remaining}
          completed={completed}
        />

        <FilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={filterCounts}
        />
      </aside>

      <main className="main-board">
        <div className="header">
          <div className="welcome-msg">{FILTER_LABELS[filter]}</div>

          <div className="header-meta">
            <span className="counter">
              {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
            </span>

            {hasCompleted && (
              <button onClick={clearCompleted} className="clear-btn">
                Clear Completed
              </button>
            )}
          </div>
        </div>

        <TodoForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          priority={priority}
          setPriority={setPriority}
          addTodo={addTodo}
        />

        {filteredTodos.length === 0 ? (
          <EmptyState filter={filter} onAddSuggestion={addSuggestion} />
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                updatePriority={updatePriority}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
