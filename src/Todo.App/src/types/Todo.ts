export interface Todo {
  id: number;
  title: string;
  description?: string;
  isDone: boolean;
  priority: string;
  dueDate?: string;
  createdAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}
