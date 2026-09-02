import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExerciseCategory } from '../models/exercise.model';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <div class="flex h-full flex-col bg-white">
      <!-- App Brand / Header -->
      <div class="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
          <app-icon name="feather" [size]="20" />
        </div>
        <div>
          <h1 class="font-heading text-lg font-medium leading-none text-slate-800">Angular Lab</h1>
          <p class="mt-0.5 text-xs text-slate-400">Interactive Exercises</p>
        </div>
      </div>

      <!-- Quick Search Bar -->
      <div class="relative mt-4 px-4">
        <span class="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-slate-400">
          <app-icon name="search" [size]="16" />
        </span>
        <input
          type="text"
          [value]="searchQuery()"
          (input)="onSearchInput($event)"
          placeholder="Filter exercises..."
          class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <!-- Categories & Exercise Navigation -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        @for (category of categories(); track category.id) {
          <div>
            <div class="flex items-center gap-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <app-icon [name]="category.icon" [size]="14" />
              <span>{{ category.title }}</span>
            </div>

            <ul class="mt-1 space-y-1">
              @for (exercise of filteredExercises(category); track exercise.id) {
                <li>
                  <a
                    [routerLink]="exercise.route"
                    routerLinkActive="bg-primary-50 text-primary-700 font-semibold shadow-xs"
                    (click)="onNavigate()"
                    class="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <div class="flex items-center gap-2.5 truncate">
                      <app-icon [name]="exercise.icon" [size]="16" class="text-slate-400 group-hover:text-slate-600" />
                      <span class="truncate">{{ exercise.title }}</span>
                    </div>
                    <span class="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                      {{ exercise.difficulty }}
                    </span>
                  </a>
                </li>
              }
            </ul>
          </div>
        }
      </nav>

      <!-- Sidebar Footer -->
      <div class="border-t border-slate-200 p-4">
        <div class="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5">
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <app-icon name="check-circle" [size]="15" />
          </div>
          <div class="text-xs text-slate-500">
            <span class="font-medium text-slate-700">Modern Angular</span>
            <div>Signals & Control Flow</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  categories = input.required<ExerciseCategory[]>();
  navigate = output<void>();

  searchQuery = signal<string>('');

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  filteredExercises(category: ExerciseCategory) {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return category.exercises;
    return category.exercises.filter(
      (e) =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  onNavigate() {
    this.navigate.emit();
  }
}
