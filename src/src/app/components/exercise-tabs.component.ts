import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

export type ExerciseTabType = 'playground' | 'code';

@Component({
  selector: 'app-exercise-tabs',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="flex items-center gap-2 rounded-xl bg-slate-200/70 p-1.5 w-fit">
      <button
        type="button"
        (click)="tabChange.emit('playground')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer"
        [class.bg-white]="activeTab() === 'playground'"
        [class.text-slate-900]="activeTab() === 'playground'"
        [class.shadow-sm]="activeTab() === 'playground'"
        [class.text-slate-600]="activeTab() !== 'playground'"
        [class.hover:text-slate-900]="activeTab() !== 'playground'"
      >
        <app-icon name="activity" [size]="16" />
        <span>{{ labLabel() }}</span>
      </button>

      <button
        type="button"
        (click)="tabChange.emit('code')"
        class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer"
        [class.bg-white]="activeTab() === 'code'"
        [class.text-slate-900]="activeTab() === 'code'"
        [class.shadow-sm]="activeTab() === 'code'"
        [class.text-slate-600]="activeTab() !== 'code'"
        [class.hover:text-slate-900]="activeTab() !== 'code'"
      >
        <app-icon name="code" [size]="16" />
        <span>{{ codeLabel() }}</span>
      </button>
    </div>
  `,
})
export class ExerciseTabsComponent {
  activeTab = input.required<ExerciseTabType>();
  labLabel = input<string>('Interactive Lab & Explanation');
  codeLabel = input<string>('Component Code & Implementation');

  tabChange = output<ExerciseTabType>();
}
