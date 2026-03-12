import { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest } from '../types/Todo';

interface TodoFormProps {
  onSubmit: (request: CreateTodoRequest) => void;
  editingTodo: Todo | null;
  onCancelEdit: () => void;
}

export function TodoForm({ onSubmit, editingTodo, onCancelEdit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority);
      setDueDate(editingTodo.dueDate ? editingTodo.dueDate.split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
    });

    if (!editingTodo) {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Todo bearbeiten' : 'Neues Todo'}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Titel *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Niedrig</option>
          <option value="Medium">Mittel</option>
          <option value="High">Hoch</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {editingTodo ? 'Speichern' : 'Hinzufügen'}
        </button>
        {editingTodo && (
          <button type="button" onClick={onCancelEdit} className="btn-cancel">
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
}
