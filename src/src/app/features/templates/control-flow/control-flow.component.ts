import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../components/icon.component';
import { CodeViewerComponent } from '../../../components/code-viewer.component';
import { ExerciseTabsComponent } from '../../../components/exercise-tabs.component';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule, IconComponent, CodeViewerComponent, ExerciseTabsComponent],
  template: `
    <div class="mx-auto max-w-5xl space-y-8 p-6 lg:p-10">
      <!-- Breadcrumb & Header -->
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600">
          <span>Modern Templates</span>
          <span>/</span>
          <span>Built-in Control Flow</span>
        </div>
        <h1 class="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Modern Control Flow: &#64;if and &#64;switch
        </h1>
        <p class="text-base text-slate-600">
          Replaces structural directives (*ngIf, *ngSwitch) with built-in, ergonomic template blocks directly integrated into the compiler.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <span class="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">&#64;if / &#64;else</span>
          <span class="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">&#64;switch / &#64;case</span>
          <span class="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">Zero Imports Needed</span>
          <span class="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">Beginner</span>
        </div>
      </div>

      <!-- Navigation Tabs -->
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
              <h3 class="font-heading text-lg font-semibold text-slate-800">Why Modern Control Flow?</h3>
              <div class="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                <p>
                  Before modern Angular, conditional rendering required importing <code>CommonModule</code> and using micro-syntax like <code>*ngIf="val; else other"</code> with <code>ng-template</code>.
                </p>
                <p>
                  <strong>&#64;if / &#64;else if / &#64;else</strong> and <strong>&#64;switch</strong> are first-class compiler features:
                </p>
                <ul class="list-disc space-y-1 pl-4 text-xs text-slate-500">
                  <li>Zero imports required (no CommonModule needed).</li>
                  <li>Type narrowing works automatically inside <code>&#64;if</code> blocks.</li>
                  <li>Better performance and much cleaner, readable templates.</li>
                </ul>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 class="font-heading text-sm font-semibold uppercase tracking-wider text-slate-700">
                Playground Controls
              </h4>
              <div class="mt-4 space-y-4">
                <!-- User Authentication Toggle -->
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">User Logged In:</label>
                  <button
                    type="button"
                    (click)="isLoggedIn.update(v => !v)"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    [class.bg-primary-600]="isLoggedIn()"
                    [class.bg-slate-200]="!isLoggedIn()"
                  >
                    <span
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      [class.translate-x-5]="isLoggedIn()"
                      [class.translate-x-0]="!isLoggedIn()"
                    ></span>
                  </button>
                </div>

                <!-- Admin Role Toggle -->
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">Admin Privileges:</label>
                  <button
                    type="button"
                    [disabled]="!isLoggedIn()"
                    (click)="isAdmin.update(v => !v)"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-40"
                    [class.bg-purple-600]="isAdmin() && isLoggedIn()"
                    [class.bg-slate-200]="!isAdmin() || !isLoggedIn()"
                  >
                    <span
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      [class.translate-x-5]="isAdmin() && isLoggedIn()"
                      [class.translate-x-0]="!isAdmin() || !isLoggedIn()"
                    ></span>
                  </button>
                </div>

                <!-- Notification Alert Trigger -->
                <div class="pt-2">
                  <button
                    type="button"
                    (click)="showWarning.update(v => !v)"
                    class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Toggle Warning Banner ({{ showWarning() ? 'Visible' : 'Hidden' }})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Interactive Stage (Right 7 cols) -->
          <div class="space-y-6 lg:col-span-7">
            <!-- Part 1: @if, @else if, @else Demo -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  1. &#64;if / &#64;else if / &#64;else Demo
                </span>
                <span class="text-xs text-slate-400">Auth & Permissions</span>
              </div>

              @if (showWarning()) {
                <div class="mb-4 flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  <app-icon name="alert-triangle" [size]="16" class="text-amber-600" />
                  <span><strong>Warning banner active!</strong> Conditionally rendered via <code>&#64;if (showWarning())</code></span>
                </div>
              }

              @if (!isLoggedIn()) {
                <div class="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                  <app-icon name="lock" [size]="28" class="mx-auto text-slate-400" />
                  <h4 class="mt-2 text-sm font-semibold text-slate-700">Please Sign In</h4>
                  <p class="mt-1 text-xs text-slate-500">Currently rendered inside: <code>&#64;if (!isLoggedIn())</code></p>
                  <button
                    type="button"
                    (click)="isLoggedIn.set(true)"
                    class="mt-3 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-700"
                  >
                    Simulate Login
                  </button>
                </div>
              } @else if (isAdmin()) {
                <div class="rounded-xl border border-purple-200 bg-purple-50/60 p-6">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                      <app-icon name="shield" [size]="20" />
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-purple-900">Administrator Console</h4>
                      <p class="text-xs text-purple-700">Rendered via <code>&#64;else if (isAdmin())</code></p>
                    </div>
                  </div>
                  <p class="mt-3 text-xs text-purple-800">Full control privileges enabled. Can manage entries, delete items, and configure security.</p>
                </div>
              } @else {
                <div class="rounded-xl border border-blue-200 bg-blue-50/60 p-6">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                      <app-icon name="user" [size]="20" />
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-blue-900">Standard Member Dashboard</h4>
                      <p class="text-xs text-blue-700">Rendered via <code>&#64;else</code></p>
                    </div>
                  </div>
                  <p class="mt-3 text-xs text-blue-800">Standard member access. Can view interactive labs and read documentation.</p>
                </div>
              }
            </div>

            <!-- Part 2: @switch Demo -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  2. &#64;switch / &#64;case Demo
                </span>
                <span class="text-xs text-slate-400">Order Delivery Tracker</span>
              </div>

              <!-- Status Pills -->
              <div class="flex flex-wrap gap-2 mb-6">
                @for (st of allStatuses; track st) {
                  <button
                    type="button"
                    (click)="orderStatus.set(st)"
                    class="rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all"
                    [class]="orderStatus() === st ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  >
                    {{ st }}
                  </button>
                }
              </div>

              <!-- The @switch Container -->
              <div class="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <div class="text-xs text-slate-400 mb-2 font-mono">&#64;switch (orderStatus())</div>

                @switch (orderStatus()) {
                  @case ('pending') {
                    <div class="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <app-icon name="clock" [size]="20" class="text-amber-600" />
                      <div>
                        <div class="text-xs font-bold text-amber-900">&#64;case ('pending')</div>
                        <div class="text-xs text-amber-700">Order received and awaiting inventory confirmation.</div>
                      </div>
                    </div>
                  }
                  @case ('processing') {
                    <div class="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <app-icon name="activity" [size]="20" class="text-blue-600" />
                      <div>
                        <div class="text-xs font-bold text-blue-900">&#64;case ('processing')</div>
                        <div class="text-xs text-blue-700">Items are being picked and packed in the fulfillment warehouse.</div>
                      </div>
                    </div>
                  }
                  @case ('shipped') {
                    <div class="flex items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                      <app-icon name="trending-up" [size]="20" class="text-indigo-600" />
                      <div>
                        <div class="text-xs font-bold text-indigo-900">&#64;case ('shipped')</div>
                        <div class="text-xs text-indigo-700">Parcel in transit with courier. Tracking ID: #TRK-892401.</div>
                      </div>
                    </div>
                  }
                  @case ('delivered') {
                    <div class="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                      <app-icon name="check-circle" [size]="20" class="text-emerald-600" />
                      <div>
                        <div class="text-xs font-bold text-emerald-900">&#64;case ('delivered')</div>
                        <div class="text-xs text-emerald-700">Delivered directly to recipient on porch. Signed by customer.</div>
                      </div>
                    </div>
                  }
                  @default {
                    <div class="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
                      <app-icon name="alert-triangle" [size]="20" class="text-rose-600" />
                      <div>
                        <div class="text-xs font-bold text-rose-900">&#64;default / &#64;case ('cancelled')</div>
                        <div class="text-xs text-rose-700">This order was cancelled or has an unrecognised status.</div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          </div>
        </div>
      } @else {
        <!-- Tab Content: Code Viewer -->
        <div class="space-y-6">
          <app-code-viewer
            filename="control-flow.component.ts"
            language="TypeScript"
            [code]="componentSnippet"
          />

          <app-code-viewer
            filename="control-flow.component.html"
            language="HTML Template"
            [code]="templateSnippet"
          />
        </div>
      }
    </div>
  `,
})
export class ControlFlowComponent {
  activeTab = signal<'playground' | 'code'>('playground');

  isLoggedIn = signal<boolean>(true);
  isAdmin = signal<boolean>(false);
  showWarning = signal<boolean>(false);

  allStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  orderStatus = signal<OrderStatus>('processing');

  readonly componentSnippet = `import { Component, signal } from '@angular/core';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  // Note: No CommonModule or NgIf / NgSwitch imports required!
  templateUrl: './control-flow.component.html',
})
export class ControlFlowComponent {
  isLoggedIn = signal<boolean>(true);
  isAdmin = signal<boolean>(false);
  orderStatus = signal<OrderStatus>('processing');
}`;

  readonly templateSnippet = `<!-- 1. Modern @if / @else if / @else Block -->
@if (!isLoggedIn()) {
  <app-login-banner />
} @else if (isAdmin()) {
  <app-admin-panel />
} @else {
  <app-user-dashboard />
}

<!-- 2. Modern @switch / @case / @default Block -->
@switch (orderStatus()) {
  @case ('pending') {
    <p>Awaiting order confirmation...</p>
  }
  @case ('processing') {
    <p>Order is being packed.</p>
  }
  @case ('shipped') {
    <p>Carrier in transit.</p>
  }
  @case ('delivered') {
    <p>Delivered!</p>
  }
  @default {
    <p>Order cancelled or status unknown.</p>
  }
}`;
}
