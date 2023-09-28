import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../core/todo.interface';
import { TodoService } from '../core/todo.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  imports: [ReactiveFormsModule],
})
export class Dialog {
  todoForm!: FormGroup;
  dialogRef = inject(MatDialogRef<Dialog>);
  todoService = inject(TodoService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo },
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
    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: (newTodo) => {
          console.log('Todo created successfully:', newTodo);
          this.todoForm.reset();
          this.onClose();
        },
        error: (error) =>
          console.error('There was an error creating the todo!', error),
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
