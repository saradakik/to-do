function FilterTabs({ currentFilter, onFilterChange, counts }) {
  const tabs = ['all', 'active', 'completed'];

  return (
    <nav className="filter-tabs" aria-label="Filter tasks">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`filter-btn ${currentFilter === tab ? 'active' : ''}`}
          onClick={() => onFilterChange(tab)}
          aria-pressed={currentFilter === tab}
        >
          <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          <span className="filter-count">{counts[tab]}</span>
        </button>
      ))}
    </nav>
  );
}

export default FilterTabs;
