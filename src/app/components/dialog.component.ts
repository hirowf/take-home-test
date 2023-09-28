import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Todo } from '../core/todo.interface';
import { TodoService } from '../core/todo.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  imports: [ReactiveFormsModule, MatSnackBarModule],
})
export class Dialog {
  todoForm!: FormGroup;
  dialogRef = inject(MatDialogRef<Dialog>);
  todoService = inject(TodoService);
  destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { todo: Todo; mode: 'create' | 'edit' },
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      description: [data.todo.description],
      dueDate: [data.todo.dueDate],
      priority: [data.todo.priority],
      completed: [data.todo.completed],
    });
  }

  onSubmit() {
    const updatedTodo: Todo = {
      ...this.data.todo,
      ...this.todoForm.value,
    };

    if (this.todoForm.valid && this.data.mode === 'edit') {
      this.todoService
        .updateTodo(this.data.todo.id, updatedTodo)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (v) => {
            console.log('Todo Edit successfully:', v);
            this.onClose();
          },
          error: () => alert('Error Updating Todo'),
        });
    } else {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: () => {
          alert('Todo created successfully:');
          this.todoForm.reset();
          this.onClose();
        },
        error: () => alert('There was an error creating the todo!'),
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
