import { Component, input, output, computed } from '@angular/core';
import { JournalEntry } from '../models/journal.model';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-entry-detail',
  imports: [IconComponent],
  template: `
    <article class="mx-auto max-w-3xl px-6 pt-8 pb-48 sm:px-10 sm:pt-12 sm:pb-64">
      @if (entry(); as e) {
        <div class="mb-4 lg:hidden">
          <button
            type="button"
            (click)="back.emit()"
            class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
          >
            <app-icon name="arrow-left" [size]="16" />
            Back to entries
          </button>
        </div>
        <div class="mb-6 flex items-center gap-3 text-sm text-slate-400">
          <span class="flex items-center gap-1.5">
            <app-icon name="calendar" [size]="15" />
            {{ formatDate(e.date) }}
          </span>
          <span class="text-slate-300">·</span>
          <span class="flex items-center gap-1.5">
            <app-icon name="clock" [size]="15" />
            {{ wordCount() }} words
          </span>
        </div>

        <h1 class="font-heading text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl">
          {{ e.title }}
        </h1>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          @for (tag of e.tags; track tag) {
            <span class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              #{{ tag }}
            </span>
          }
        </div>

        <div class="mt-8 space-y-6">
          @for (para of paragraphs(); track $index) {
            <p class="fade-in-para font-serif text-lg leading-relaxed text-slate-700">{{ para }}</p>
          }
        </div>

        <footer class="fade-in-para mt-10 border-t border-slate-200 pt-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
            
            </div>
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100"
            >
              <app-icon name="pen" [size]="15" />
              Edit
            </button>
          </div>
        </footer>
      } @else {
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
            <app-icon name="feather" [size]="32" />
          </div>
          <h3 class="mt-4 font-serif text-xl text-slate-400">Select an entry to read</h3>
          <p class="mt-1 text-sm text-slate-400">Choose an entry from the list on the left</p>
        </div>
      }
    </article>
  `,
  styles: `
    @keyframes scrollFadeIn {
      from {
        opacity: 0.15;
        transform: translateY(20px);
        filter: blur(1.5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }

    .fade-in-para {
      opacity: 1;
      transform: none;
    }

    @supports (animation-timeline: view()) {
      .fade-in-para {
        animation: scrollFadeIn linear both;
        animation-timeline: view();
        animation-range: entry 5% cover 30%;
      }
    }
  `,
})
export class EntryDetailComponent {
  entry = input<JournalEntry | null>(null);
  back = output<void>();

  paragraphs = computed(() =>
    this.entry()?.content.split('\n\n').filter((p) => p.trim()) ?? []
  );

  wordCount = computed(() => {
    const paras = this.paragraphs();
    if (paras.length === 0) return 0;
    const fullText = paras.join(' ').trim();
    const words = fullText.match(/\S+/g);
    return words ? words.length : 0;
  });

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
