import { Component, input, output, computed } from '@angular/core';
import { JournalEntry } from '../models/journal.model';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-entry-list',
  imports: [IconComponent],
  host: {
    class: 'flex flex-1 flex-col h-full min-h-0 overflow-hidden',
  },
  template: `
    <div class="flex flex-1 flex-col h-full min-h-0">
      <div class="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
        <div class="flex items-center gap-2">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {{ entries().length }} {{ entries().length === 1 ? 'Entry' : 'Entries' }}
          </h3>
          @if (isScrollable()) {
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Scrollable
            </span>
          }
        </div>
        <div class="flex items-center gap-1 text-xs text-slate-400">
          <app-icon name="clock" [size]="14" />
          <span>Sorted by date</span>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto min-h-0 px-3 pb-6 overscroll-contain">
        @for (entry of sortedEntries(); track entry.id) {
          <button
            type="button"
            (click)="selectEntry.emit(entry.id)"
            class="group mb-2 block w-full rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-md"
            [class]="selectedId() === entry.id
              ? 'border-primary-300 bg-primary-50 shadow-sm ring-1 ring-primary-200'
              : 'border-slate-200 bg-white hover:border-slate-300'"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <h4
                  class="font-heading text-base font-medium leading-snug"
                  [class]="selectedId() === entry.id ? 'text-primary-900' : 'text-slate-800 group-hover:text-slate-900'"
                >
                  {{ entry.title }}
                </h4>
                <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span>{{ formatDate(entry.date) }}</span>
                  <span>·</span>
                  <span>{{ getWordCount(entry.content) }} words</span>
                </div>
              </div>
            </div>

            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {{ entry.preview }}
            </p>

            <div class="mt-3 flex flex-wrap items-center gap-1.5">
              @for (tag of entry.tags; track tag) {
                <span
                  class="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 transition-colors group-hover:bg-slate-200"
                >
                  #{{ tag }}
                </span>
              }
            </div>
          </button>
        } @empty {
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300">
              <app-icon name="book" [size]="24" />
            </div>
            <p class="mt-3 text-sm text-slate-400">No entries in this collection</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class EntryListComponent {
  entries = input.required<JournalEntry[]>();
  selectedId = input<string>('');

  selectEntry = output<string>();

  isScrollable = computed(() => this.entries().length > 5);

  sortedEntries = computed(() =>
    [...this.entries()].sort((a, b) => b.date.localeCompare(a.date))
  );

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getWordCount(content: string): number {
    if (!content) return 0;
    const words = content.trim().match(/\S+/g);
    return words ? words.length : 0;
  }
}
