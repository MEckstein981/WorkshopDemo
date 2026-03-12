import { FilterStatus } from '../App';

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        Alle
      </button>
      <button
        className={currentFilter === 'open' ? 'active' : ''}
        onClick={() => onFilterChange('open')}
      >
        Offen
      </button>
      <button
        className={currentFilter === 'done' ? 'active' : ''}
        onClick={() => onFilterChange('done')}
      >
        Erledigt
      </button>
    </div>
  );
}
