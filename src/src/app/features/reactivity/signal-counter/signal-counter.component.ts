import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../components/icon.component';
import { CodeViewerComponent } from '../../../components/code-viewer.component';
import { ExerciseTabsComponent } from '../../../components/exercise-tabs.component';

@Component({
  selector: 'app-signal-counter',
  standalone: true,
  imports: [CommonModule, IconComponent, CodeViewerComponent, ExerciseTabsComponent],
  template: `
    <div class="mx-auto max-w-5xl space-y-8 p-6 lg:p-10">
      <!-- Breadcrumb & Header -->
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600">
          <span>Reactivity & State</span>
          <span>/</span>
          <span>Signal Counter</span>
        </div>
        <h1 class="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Signal Counter & Computed State
        </h1>
        <p class="text-base text-slate-600">
          Learning how Angular signals bring fine-grained, synchronous reactivity to components without Zone.js overhead.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <span class="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">signal()</span>
          <span class="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">computed()</span>
          <span class="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">effect()</span>
          <span class="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">Beginner</span>
        </div>
      </div>

      <!-- Navigation Tabs (Explanation vs Code) -->
      <app-exercise-tabs
        [activeTab]="activeTab()"
        (tabChange)="activeTab.set($event)"
      />

      <!-- Tab Content: Playground & Theory -->
      @if (activeTab() === 'playground') {
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <!-- Theory Column (Left 5 cols) -->
          <div class="space-y-6 lg:col-span-5">
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="font-heading text-lg font-semibold text-slate-800">Concept Overview</h3>
              <div class="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                <p>
                  <strong>Signals</strong> are reactive wrappers around values. When a signal's value changes, Angular knows exactly which components and DOM nodes depend on it and updates only those parts.
                </p>
                <div class="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
                  count = signal(0);<br />
                  double = computed(() => count() * 2);
                </div>
                <ul class="list-disc space-y-1 pl-4 text-xs text-slate-500">
                  <li><strong>Writable Signals:</strong> Mutate via <code>.set(val)</code> or <code>.update(fn)</code>.</li>
                  <li><strong>Computed Signals:</strong> Pure derivations that memoize results until dependencies change.</li>
                  <li><strong>Effects:</strong> Functions that run automatically whenever signal dependencies update.</li>
                </ul>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 class="font-heading text-sm font-semibold uppercase tracking-wider text-slate-700">
                Audit / Effect Log
              </h4>
              <p class="mt-1 text-xs text-slate-500">
                Logged automatically via Angular <code>effect()</code>:
              </p>
              <div class="mt-3 max-h-48 overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400">
                @for (log of auditLogs(); track $index) {
                  <div>{{ log }}</div>
                }
                @if (auditLogs().length === 0) {
                  <span class="text-slate-500">Waiting for first signal change...</span>
                }
              </div>
            </div>
          </div>

          <!-- Live Interactive Stage (Right 7 cols) -->
          <div class="space-y-6 lg:col-span-7">
            <div class="rounded-2xl border border-primary-100 bg-gradient-to-br from-white to-primary-50/40 p-6 shadow-sm sm:p-8">
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-primary-600">Live Exercise Canvas</span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Reactive
                </span>
              </div>

              <!-- Main Signal Value Display -->
              <div class="my-8 text-center">
                <div class="text-xs font-medium text-slate-500 uppercase tracking-widest">Current Count</div>
                <div class="mt-2 font-heading text-6xl font-bold tracking-tight text-slate-900 transition-all sm:text-7xl"
                     [class.text-emerald-600]="count() > 0"
                     [class.text-rose-600]="count() < 0">
                  {{ count() }}
                </div>
                <div class="mt-3 flex items-center justify-center gap-2">
                  <span class="rounded-full px-3 py-1 text-xs font-medium"
                        [class]="isEven() ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'">
                    {{ isEven() ? 'Even Number' : 'Odd Number' }}
                  </span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Double: {{ doubleCount() }}
                  </span>
                </div>
              </div>

              <!-- Step Selector -->
              <div class="mb-6 flex items-center justify-center gap-3">
                <span class="text-xs font-medium text-slate-500">Step Multiplier:</span>
                @for (s of [1, 5, 10]; track s) {
                  <button
                    type="button"
                    (click)="step.set(s)"
                    class="rounded-md px-2.5 py-1 text-xs font-semibold transition-all"
                    [class]="step() === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
                  >
                    ±{{ s }}
                  </button>
                }
              </div>

              <!-- Control Buttons -->
              <div class="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  (click)="decrement()"
                  class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                >
                  <app-icon name="minus" [size]="18" />
                  <span>- {{ step() }}</span>
                </button>
                <button
                  type="button"
                  (click)="reset()"
                  class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-500 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                >
                  <app-icon name="rotate-ccw" [size]="16" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  (click)="increment()"
                  class="flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 active:scale-95"
                >
                  <app-icon name="plus" [size]="18" />
                  <span>+ {{ step() }}</span>
                </button>
              </div>

              <!-- Computed stats breakdown -->
              <div class="mt-8 grid grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div>
                  <div class="text-[11px] font-medium text-slate-400">SIGN</div>
                  <div class="mt-1 text-sm font-semibold text-slate-700">{{ signDescription() }}</div>
                </div>
                <div>
                  <div class="text-[11px] font-medium text-slate-400">TOTAL CLICKS</div>
                  <div class="mt-1 text-sm font-semibold text-slate-700">{{ clickCount() }}</div>
                </div>
                <div>
                  <div class="text-[11px] font-medium text-slate-400">PARITY</div>
                  <div class="mt-1 text-sm font-semibold text-slate-700">{{ isEven() ? 'Even' : 'Odd' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <!-- Tab Content: Code Viewer -->
        <div class="space-y-6">
          <app-code-viewer
            filename="signal-counter.component.ts"
            language="TypeScript"
            [code]="componentSnippet"
          />

          <app-code-viewer
            filename="signal-counter.component.html"
            language="HTML Template"
            [code]="templateSnippet"
          />
        </div>
      }
    </div>
  `,
})
export class SignalCounterComponent {
  activeTab = signal<'playground' | 'code'>('playground');

  // Writable signals
  count = signal<number>(0);
  step = signal<number>(1);
  clickCount = signal<number>(0);

  // Computed signals
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);
  signDescription = computed(() => {
    const val = this.count();
    if (val === 0) return 'Zero';
    return val > 0 ? 'Positive' : 'Negative';
  });

  // Signal effect logs
  auditLogs = signal<string[]>([]);

  constructor() {
    effect(() => {
      const current = this.count();
      const time = new Date().toLocaleTimeString();
      // Record up to 8 audit entries
      this.auditLogs.update((logs) => [`[${time}] count changed to ${current}`, ...logs.slice(0, 7)]);
    });
  }

  increment() {
    this.count.update((v) => v + this.step());
    this.clickCount.update((c) => c + 1);
  }

  decrement() {
    this.count.update((v) => v - this.step());
    this.clickCount.update((c) => c + 1);
  }

  reset() {
    this.count.set(0);
    this.clickCount.update((c) => c + 1);
  }

  readonly componentSnippet = `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signal-counter',
  standalone: true,
  templateUrl: './signal-counter.component.html',
})
export class SignalCounterComponent {
  // 1. Writable Signals
  count = signal<number>(0);
  step = signal<number>(1);

  // 2. Computed Signals (automatically memoized & lazy)
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);

  constructor() {
    // 3. Effects run when signals change
    effect(() => {
      console.log('Count updated:', this.count());
    });
  }

  increment() {
    // update() receives previous value
    this.count.update(v => v + this.step());
  }

  decrement() {
    this.count.update(v => v - this.step());
  }

  reset() {
    // set() replaces with immediate value
    this.count.set(0);
  }
}`;

  readonly templateSnippet = `<!-- Reading Signals in Modern Angular Templates -->
<div class="counter">
  <h2>Count: {{ count() }}</h2>
  <p>Double: {{ doubleCount() }}</p>
  <p>Parity: {{ isEven() ? 'Even' : 'Odd' }}</p>

  <div class="actions">
    <button (click)="decrement()">- {{ step() }}</button>
    <button (click)="reset()">Reset</button>
    <button (click)="increment()">+ {{ step() }}</button>
  </div>
</div>`;
}
