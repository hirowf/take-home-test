import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.apiUrl)
      .pipe(
        map((todos) =>
          todos.filter((todo: Todo) => todo != null).sort((a, b) => b.id - a.id)
        )
      );
  }

  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todoId: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todoId}`, todo);
  }

  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`);
  }

  searchByDescription(term: string): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.apiUrl}?q=${term}`)
      .pipe(map((todos: Todo[]) => todos));
  }
}
