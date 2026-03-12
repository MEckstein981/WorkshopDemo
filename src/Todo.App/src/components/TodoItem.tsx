import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onMarkDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onMarkDone, onDelete, onEdit }: TodoItemProps) {
  return (
    <div className={`todo-item ${todo.isDone ? 'done' : ''}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <div className="todo-meta">
          <span className={`priority priority-${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>
          {todo.dueDate && (
            <span className="due-date">
              Fällig: {new Date(todo.dueDate).toLocaleDateString('de-DE')}
            </span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        {!todo.isDone && (
          <button onClick={() => onMarkDone(todo.id)} className="btn-done">
            ✓ Erledigt
          </button>
        )}
        <button onClick={() => onEdit(todo)} className="btn-edit">
          ✎ Bearbeiten
        </button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">
          ✕ Löschen
        </button>
      </div>
    </div>
  );
}
