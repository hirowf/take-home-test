import { Component } from '@angular/core';

@Component({
  selector: `app-header`,
  standalone: true,
  template: `
    <div class="flex items-center justify-center h-[200px] bg-[#0C58C6]">
      <h1 class="font-bold text-5xl text-slate-100">Scoot Todo App</h1>
    </div>
  `,
})
export class Header {}
