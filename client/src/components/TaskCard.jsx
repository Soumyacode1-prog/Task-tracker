const TaskCard = ({ task, onComplete }) => {
  return (
    <div
      className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        task.completed
          ? "border-mint bg-mint/40 text-ink"
          : "border-ink/10 bg-white text-ink"
      }`}
    >
      <p className={`text-base font-medium ${task.completed ? "line-through opacity-70" : ""}`}>{task.title}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-sm opacity-70">{task.completed ? "Completed" : "Pending"}</p>
        {task.completed ? (
          <span className="rounded-lg bg-mint/70 px-2.5 py-1 text-xs font-semibold text-ink">Done</span>
        ) : (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ink/90"
          >
            Mark Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
