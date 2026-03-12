import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '@app/App';

vi.mock('@app/services/todoApi', () => ({
  fetchTodos: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Mock Todo',
      description: 'Mock Description',
      isDone: false,
      priority: 'Medium',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ]),
  createTodo: vi.fn().mockResolvedValue({}),
  updateTodo: vi.fn().mockResolvedValue({}),
  markTodoDone: vi.fn().mockResolvedValue({}),
  deleteTodo: vi.fn().mockResolvedValue(undefined),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/Todo App/)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Laden...')).toBeInTheDocument();
  });

  it('renders the todo form', () => {
    render(<App />);
    expect(screen.getByText('Neues Todo')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<App />);
    expect(screen.getByText('Alle')).toBeInTheDocument();
    expect(screen.getByText('Offen')).toBeInTheDocument();
    expect(screen.getByText('Erledigt')).toBeInTheDocument();
  });
});
