import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../core/todo.interface';
import { CheckTodos } from './check-todos.component';

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  imports: [CheckTodos, NgFor, DatePipe, NgClass],
})
export class Items {
  @Input() items: Todo[] = [];
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();

  onCheckboxChange(item: Todo) {
    item.completed = !item.completed;
    this.update.emit(item);
  }

  onDelete = (item: Todo) => this.delete.emit(item);

  onEdit = (item: Todo) => this.edit.emit(item);
}
