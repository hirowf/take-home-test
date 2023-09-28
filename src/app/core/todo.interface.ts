export interface Todo {
  id: number;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

export interface TodoSearch {
  count: number;
  results: Todo[];
}
