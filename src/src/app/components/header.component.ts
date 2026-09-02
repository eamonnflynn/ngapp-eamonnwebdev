import { Component, input, output } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-header',
  imports: [IconComponent],
  template: `
    <header class="flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
      @if (showMenuButton()) {
        <button
          type="button"
          (click)="toggleSidebar.emit()"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <app-icon name="menu" [size]="22" />
        </button>
      }

      <div class="flex flex-1 items-center gap-3">
        <h2 class="font-heading text-lg font-medium text-slate-800">{{ title() }}</h2>
        @if (subtitle()) {
          <span class="hidden text-sm text-slate-400 sm:inline">— {{ subtitle() }}</span>
        }
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Search"
        >
          <app-icon name="search" [size]="20" />
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          <app-icon name="plus" [size]="16" />
          <span class="hidden sm:inline">New Entry</span>
        </button>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  title = input<string>('');
  subtitle = input<string>('');
  showMenuButton = input<boolean>(false);
  toggleSidebar = output<void>();
}
