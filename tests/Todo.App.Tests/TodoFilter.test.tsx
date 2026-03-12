import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TodoFilter } from '@app/components/TodoFilter';

describe('TodoFilter', () => {
  it('renders all filter buttons', () => {
    render(<TodoFilter currentFilter="all" onFilterChange={() => {}} />);

    expect(screen.getByText('Alle')).toBeInTheDocument();
    expect(screen.getByText('Offen')).toBeInTheDocument();
    expect(screen.getByText('Erledigt')).toBeInTheDocument();
  });

  it('highlights active filter', () => {
    render(<TodoFilter currentFilter="open" onFilterChange={() => {}} />);

    expect(screen.getByText('Offen')).toHaveClass('active');
    expect(screen.getByText('Alle')).not.toHaveClass('active');
    expect(screen.getByText('Erledigt')).not.toHaveClass('active');
  });

  it('calls onFilterChange with "done" when clicking Erledigt', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TodoFilter currentFilter="all" onFilterChange={handleChange} />);
    await user.click(screen.getByText('Erledigt'));

    expect(handleChange).toHaveBeenCalledWith('done');
  });

  it('calls onFilterChange with "open" when clicking Offen', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TodoFilter currentFilter="all" onFilterChange={handleChange} />);
    await user.click(screen.getByText('Offen'));

    expect(handleChange).toHaveBeenCalledWith('open');
  });

  it('calls onFilterChange with "all" when clicking Alle', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TodoFilter currentFilter="done" onFilterChange={handleChange} />);
    await user.click(screen.getByText('Alle'));

    expect(handleChange).toHaveBeenCalledWith('all');
  });
});
