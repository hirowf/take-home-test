import { Component } from '@angular/core';

@Component({
  selector: 'layout',
  standalone: true,
  template: `
    <div class="max-w-5xl m-auto w-full px-4 py-8">
      <ng-content></ng-content>
    </div>
  `,
})
export class Layout {}
