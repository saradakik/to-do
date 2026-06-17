const SUGGESTIONS = [
  { text: 'Review project notes', priority: 'medium' },
  { text: 'Buy groceries', priority: 'low' },
  { text: 'Finish assignment', priority: 'high' },
];

function EmptyState({ filter, onAddSuggestion }) {
  if (filter !== 'all') {
    return (
      <div className="empty-state">
        <p className="empty-message">No {filter} tasks found.</p>
      </div>
    );
  }

  return (
    <div className="empty-state empty-state--rich">
      <div className="empty-icon" aria-hidden="true">✦</div>
      <h2 className="empty-title">Start your day</h2>
      <p className="empty-message">
        Add a task above, or pick a suggestion to get going.
      </p>

      <div className="suggestion-chips">
        {SUGGESTIONS.map(({ text, priority }) => (
          <button
            key={text}
            type="button"
            className={`suggestion-chip priority-${priority}`}
            onClick={() => onAddSuggestion(text, priority)}
          >
            <span className="suggestion-chip-dot" aria-hidden="true" />
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
