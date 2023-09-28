import { Component } from '@angular/core';
import { Header } from './components/header.component';
import { Layout } from './components/layout';
import { Todos } from './todos/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header />
    <layout>
      <app-todos />
    </layout>
  `,
  imports: [Todos, Header, Layout],
})
export class AppComponent {}
