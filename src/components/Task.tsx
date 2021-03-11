import { FiTrash } from "react-icons/fi";

interface TaskProps {
  task: {
    id: number;
    title: string;
    isComplete: boolean;
  };
  handleToggleTaskCompletion: (id: number) => void;
  handleRemoveTask: (id: number) => void;
}

export function Task(props: TaskProps) {
  return (
    <li key={props.task.id}>
      <div
        className={props.task.isComplete ? "completed" : ""}
        data-testid="task"
      >
        <label className="checkbox-container">
          <input
            type="checkbox"
            readOnly
            checked={props.task.isComplete}
            onClick={() => props.handleToggleTaskCompletion(props.task.id)}
          />
          <span className="checkmark"></span>
        </label>
        <p>{props.task.title}</p>
      </div>

      <button
        type="button"
        data-testid="remove-task-button"
        onClick={() => props.handleRemoveTask(props.task.id)}
      >
        <FiTrash size={16} />
      </button>
    </li>
  );
}
