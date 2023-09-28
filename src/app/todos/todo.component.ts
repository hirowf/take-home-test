import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  Observable,
  Subject,
  debounceTime,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CheckTodos } from '../components/check-todos.component';
import { Dialog } from '../components/dialog.component';
import { Items } from '../components/items.component';
import { Layout } from '../components/layout';
import { Todo } from '../core/todo.interface';
import { TodoService } from '../core/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todo.component.html',
  imports: [
    NgFor,
    Layout,
    Items,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    CheckTodos,
    MatDialogModule,
  ],
})
export class Todos {
  todos$: Observable<Todo[]> | undefined;
  reload$ = new Subject<void>();
  destroy$ = new Subject<void>();
  control = new FormControl();
  todoService = inject(TodoService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.todos$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((term: string) =>
        term
          ? this.todoService.searchByDescription(term)
          : this.todoService.getTodos()
      )
    );

    this.reload$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$));
  }

  updateTodo(item: Todo) {
    this.todoService
      .updateTodo(item.id, item)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: () => {
          alert('Error Updating Todo');
          item.completed = !item.completed;
        },
      });
  }

  removeTodo(todoToDelete: Todo) {
    this.todoService
      .deleteTodo(todoToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.reload$.next();
        },
        error: () => alert('Error Deleting Todo:'),
      });
  }

  editTodo(item: Todo) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { todo: item },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.reload$.next());
  }
}
