import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'category/reactivity/signal-counter',
    loadComponent: () =>
      import('./features/reactivity/signal-counter/signal-counter.component').then(
        (m) => m.SignalCounterComponent
      ),
  },
  {
    path: 'category/templates/control-flow',
    loadComponent: () =>
      import('./features/templates/control-flow/control-flow.component').then(
        (m) => m.ControlFlowComponent
      ),
  },
  {
    path: '',
    redirectTo: 'category/reactivity/signal-counter',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'category/reactivity/signal-counter',
  },
];
