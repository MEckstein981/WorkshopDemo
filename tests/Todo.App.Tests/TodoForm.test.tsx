import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TodoForm } from '@app/components/TodoForm';

describe('TodoForm', () => {
  it('renders create form by default', () => {
    render(
      <TodoForm onSubmit={() => {}} editingTodo={null} onCancelEdit={() => {}} />
    );

    expect(screen.getByText('Neues Todo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Titel *')).toBeInTheDocument();
    expect(screen.getByText('Hinzufügen')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when creating', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <TodoForm onSubmit={handleSubmit} editingTodo={null} onCancelEdit={() => {}} />
    );

    await user.type(screen.getByPlaceholderText('Titel *'), 'Neues Todo');
    await user.click(screen.getByText('Hinzufügen'));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Neues Todo', priority: 'Medium' })
    );
  });

  it('shows edit mode when editingTodo is provided', () => {
    const editingTodo = {
      id: 1,
      title: 'Edit me',
      description: 'Description',
      isDone: false,
      priority: 'High',
      createdAt: '2024-01-01',
    };

    render(
      <TodoForm
        onSubmit={() => {}}
        editingTodo={editingTodo}
        onCancelEdit={() => {}}
      />
    );

    expect(screen.getByText('Todo bearbeiten')).toBeInTheDocument();
    expect(screen.getByText('Speichern')).toBeInTheDocument();
    expect(screen.getByText('Abbrechen')).toBeInTheDocument();
  });

  it('populates form fields when editing', () => {
    const editingTodo = {
      id: 1,
      title: 'Existing Title',
      description: 'Existing Desc',
      isDone: false,
      priority: 'High',
      createdAt: '2024-01-01',
    };

    render(
      <TodoForm
        onSubmit={() => {}}
        editingTodo={editingTodo}
        onCancelEdit={() => {}}
      />
    );

    expect(screen.getByDisplayValue('Existing Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Desc')).toBeInTheDocument();
  });

  it('calls onCancelEdit when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <TodoForm
        onSubmit={() => {}}
        editingTodo={{ id: 1, title: 'T', isDone: false, priority: 'Medium', createdAt: '' }}
        onCancelEdit={handleCancel}
      />
    );

    await user.click(screen.getByText('Abbrechen'));
    expect(handleCancel).toHaveBeenCalled();
  });
});
