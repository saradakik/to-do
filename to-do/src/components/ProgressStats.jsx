function ProgressStats({ total, active, completed }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section className="progress-stats" aria-label="Task progress">
      <div className="progress-ring-wrap">
        <svg className="progress-ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle className="progress-ring-bg" cx="32" cy="32" r="28" />
          <circle
            className="progress-ring-fill"
            cx="32"
            cy="32"
            r="28"
            style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
          />
        </svg>
        <div className="progress-ring-label">
          <span className="progress-percent">{progress}%</span>
          <span className="progress-sub">done</span>
        </div>
      </div>

      <p className="progress-caption">
        {total === 0
          ? 'No tasks yet'
          : `${completed} of ${total} completed`}
      </p>

      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-value">{active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>
    </section>
  );
}

export default ProgressStats;
