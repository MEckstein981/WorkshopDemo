import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onMarkDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoList({ todos, onMarkDone, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">Keine Todos vorhanden.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onMarkDone={onMarkDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
