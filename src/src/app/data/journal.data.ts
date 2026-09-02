import { JournalEntry, JournalNode } from '../models/journal.model';

export const SAMPLE_ENTRIES: Record<string, JournalEntry> = {
  'e1': {
    id: 'e1',
    title: 'Mastering Angular Signals and Computed State',
    date: '2026-08-28',
    preview: 'Replaced traditional state getters with signal() and computed(). The granular reactivity and developer ergonomics are a massive upgrade...',
    content: `Today I refactored our core state management to Angular Signals. The difference in developer ergonomics and mental model is immediate.

With traditional ChangeDetectionStrategy.OnPush, we frequently had to coordinate between BehaviorSubjects, async pipes, and manual change detector references. With signal() and computed(), state derivations are synchronous, glitch-free, and automatically track dependencies without manual subscription cleanup.

Key takeaways:
1. Use signal() for writable local or service-level state.
2. Use computed() for pure derivations; they are lazy and memoized until dependencies change.
3. Keep effects minimal and reserve them for logging or synchronizing external DOM APIs.`,
    tags: ['signals', 'components']
  },
  'e2': {
    id: 'e2',
    title: 'Going Zoneless: Experiencing Angular Without Zone.js',
    date: '2026-08-25',
    preview: 'Configured provideExperimentalZonelessChangeDetection() today. Clean call stacks, smaller bundles, and precise change detection...',
    content: `I enabled zoneless change detection in our application bootstrap using provideExperimentalZonelessChangeDetection().

For years, Zone.js monkey-patched browser asynchronous APIs (setTimeout, Promise, addEventListener) to schedule global change detection sweeps. While convenient initially, it introduced performance overhead and difficult-to-trace async stack traces.

In Zoneless mode:
- The app bundle drops the Zone.js dependency entirely, reducing transfer size.
- Angular schedules change detection notifications directly through Signal updates, AsyncPipe, MarkForCheck, or ComponentRef.setInput.
- Debugging async code is straightforward with native browser call stacks.`,
    tags: ['zoneless', 'signals', 'performance']
  },
  'e3': {
    id: 'e3',
    title: 'Signal Inputs and Output Functions in Standalone Components',
    date: '2026-08-20',
    preview: 'Migrating @Input() and @Output() decorators to input() and output(). Cleaner type inference and no more ngOnChanges lifecycle boilerplate...',
    content: `Migrated our component library to signal inputs (input, input.required) and the output() function.

The improvements over decorators:
- input() returns a Signal<T>, allowing you to pass it straight into computed() transformations without ngOnChanges or setter boilerplate.
- input.required() enforces compile-time safety and runtime verification for required props.
- output() produces an OutputEmitterRef that integrates seamlessly with template event listeners without needing EventEmitter decorators.

The resulting component classes are concise, declarative, and have zero decorator noise.`,
    tags: ['components', 'signals']
  },
  'e4': {
    id: 'e4',
    title: 'Bridging RxJS and Signals with toSignal and toObservable',
    date: '2026-08-15',
    preview: 'RxJS shines for events, debounce, and WebSocket streams, while Signals are perfect for view state. The interop package makes them work in harmony...',
    content: `A common question when learning modern Angular is: "Do Signals replace RxJS?"

The answer is a clear no — they complement each other. RxJS remains the gold standard for asynchronous event streams, debouncing user input, polling, websockets, and complex cancellation logic (switchMap, exhaustMap).

Using @angular/core/rxjs-interop:
- toSignal() turns an Observable stream into a Signal with automatic subscription management tied to the injection context.
- toObservable() creates an observable from a signal for when you need operators like debounceTime or filter.

We use RxJS for data orchestration over time and Signals for holding and rendering current state.`,
    tags: ['rxjs', 'signals']
  },
  'e5': {
    id: 'e5',
    title: 'Styling with Modern Angular Material and Design Tokens',
    date: '2026-08-12',
    preview: 'Customized M3 color palettes and typography tokens using Angular Material components...',
    content: `Configured Angular Material with Material 3 (M3) design tokens and integrated them with our Tailwind CSS theme.

Key highlights:
- Material components now use CSS custom properties for color roles (primary, surface, outline) and elevation.
- Combining @angular/material with @angular/cdk primitives gives us accessible dialogs, overlays, and virtual scrolling while retaining full control over custom styling.
- Standalone component imports make it easy to import only specific Material modules (e.g. MatButtonModule, MatTooltipModule) where needed.`,
    tags: ['material', 'components']
  },
  'e6': {
    id: 'e6',
    title: 'New Built-in Control Flow and Deferrable Views',
    date: '2026-09-01',
    preview: 'The @if, @for, @switch syntax and @defer blocks make templates readable and bundle sizes optimized with zero extra configuration...',
    content: `Explored Angular's control flow syntax (@if, @for, @switch) and @defer blocks.

The new control flow syntax requires no CommonModule imports and offers mandatory track expressions on @for loops, which prevents rendering bugs caused by missing trackBy functions.

Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.


Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.

Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.

Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.

Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.

Even more impressive is @defer:
- @defer (on viewport) delays downloading and rendering heavy interactive widgets until they scroll into view.
- Built-in support for @placeholder, @loading, and @error blocks provides a polished user experience without complex manual loading state management.


`,



    tags: ['control-flow', 'components', 'performance']
  },
  'e7': {
    id: 'e7',
    title: 'Typed Reactive Forms with Signal-Driven Validation',
    date: '2026-01-02',
    preview: 'Built dynamic multi-step forms with strictly typed FormGroup and computed validation state...',
    content: `Built a complex multi-step form using Angular's strictly typed Reactive Forms.

With NonNullableFormBuilder, form values are strongly typed, eliminating undefined checks across form control values.

We bridged form status into signals using toSignal(form.statusChanges), allowing us to compute submit button disabled states and dynamic validation helper text with computed() expressions.`,
    tags: ['forms', 'signals']
  },
  'e8': {
    id: 'e8',
    title: 'Functional Route Guards and Lazy Resolvers',
    date: '2025-12-31',
    preview: 'Class-based guards are a thing of the past. Functional CanActivateFn with inject() is concise, testable, and reusable...',
    content: `Updated our application routing to functional route guards and resolvers.

Instead of creating injectable classes with boilerplate interfaces (CanActivate, Resolve), functional guards are simple functions:
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.parseUrl('/login');
};

Coupled with withComponentInputBinding(), route parameters and query params are passed directly as component inputs.`,
    tags: ['routing', 'dependency-injection']
  },
  'e9': {
    id: 'e9',
    title: 'Dependency Injection via inject() and Environment Providers',
    date: '2025-12-28',
    preview: 'Refactored constructor injections to inject(). Creating composable helper functions that leverage DI injection context is a game changer...',
    content: `The inject() function is one of the best additions to modern Angular architecture.

Beyond avoiding verbose constructor parameter lists, inject() enables composable helper functions (similar to React custom hooks):
- We created useWindowSize() and useLocalStorage() helper functions that encapsulate DestroyRef cleanup and inject required services.
- Application configurations use provideEnvironmentInitializer and provideHttpClient(withFetch()) for clean, modular setup.`,
    tags: ['dependency-injection', 'components']
  },
  'e10': {
    id: 'e10',
    title: 'Fast Unit Testing with Vitest in Angular',
    date: '2025-10-14',
    preview: 'Switched our testing pipeline to Vitest with TestBed and jsdom. Instant test runs and clean assertion syntax without browser overhead...',
    content: `Replaced Karma/Jasmine with Vitest and jsdom for our component test suite.

The test execution speed difference is dramatic — tests execute in milliseconds in a headless Node environment with instant watch mode feedback.

Testing signal-based components is also much cleaner:
- Mutating a signal updates computed values synchronously.
- fixture.whenStable() verifies template bindings seamlessly.
- Mocking services with inject() and provideValue in TestBed is intuitive and robust.`,
    tags: ['testing', 'components']
  },
  'e11': {
    id: 'e11',
    title: 'Integrating Tailwind CSS v4 and Custom Design Tokens',
    date: '2026-08-27',
    preview: 'Configuring Tailwind CSS v4 with @theme directives, custom fonts, and styling Angular standalone components...',
    content: `Today I set up Tailwind CSS v4 in our Angular project using @tailwindcss/postcss.

Tailwind v4 streamlines CSS architecture significantly:
- No separate tailwind.config.js needed; configuration lives directly in styles.css via @theme.
- Custom fonts like IBM Plex Sans for headings and Inter for body text are declared cleanly as CSS variables.
- Custom color scales (--color-primary-*) seamlessly blend with utility classes like bg-primary-600 and text-primary-900.

Combining utility-first Tailwind classes with Angular standalone component templates creates an enjoyable and rapid UI workflow.`,
    tags: ['tailwind', 'components']
  },
};

export const JOURNAL_ENTRIES: JournalEntry[] = Object.values(SAMPLE_ENTRIES);

export interface JournalCollection {
  id: string;
  title: string;
  icon: string;
  tags: string[];
}

export const COLLECTIONS: JournalCollection[] = [
  { id: 'col-reactivity', title: 'Reactivity & State', icon: 'activity', tags: ['signals', 'rxjs'] },
  { id: 'col-components', title: 'Components & UI', icon: 'box', tags: ['components', 'material', 'control-flow', 'tailwind'] },
  { id: 'col-modern', title: 'Modern Features & Zoneless', icon: 'cpu', tags: ['zoneless', 'performance', 'dependency-injection'] },
  { id: 'col-forms-routing', title: 'Forms & Navigation', icon: 'layers', tags: ['forms', 'routing'] },
  { id: 'col-testing', title: 'Testing & Tooling', icon: 'check-circle', tags: ['testing'] },
];

const TAG_ICONS: Record<string, string> = {
  signals: 'activity',
  components: 'box',
  zoneless: 'cpu',
  rxjs: 'zap',
  material: 'layers',
  tailwind: 'sparkles',
  forms: 'pen',
  routing: 'mountain',
  testing: 'check-circle',
  'control-flow': 'code',
  'dependency-injection': 'layers',
  performance: 'sparkles',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ICONS: Record<number, string> = {
  0: 'snowflake',
  1: 'snowflake',
  2: 'leaf',
  3: 'flower',
  4: 'flower',
  5: 'sun',
  6: 'sun',
  7: 'leaf',
  8: 'leaf',
  9: 'cloud',
  10: 'wind',
  11: 'gift',
};

/**
 * Builds a dynamic tree navigation structure based on raw journal entries.
 */
export function buildJournalTree(entries: JournalEntry[]): JournalNode[] {
  // 1. Group timeline by year and month
  const yearMap = new Map<number, Map<number, JournalEntry[]>>();

  for (const entry of entries) {
    const [yearStr, monthStr] = entry.date.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1; // 0-indexed (0 = January)

    if (!yearMap.has(year)) {
      yearMap.set(year, new Map());
    }
    const monthMap = yearMap.get(year)!;
    if (!monthMap.has(month)) {
      monthMap.set(month, []);
    }
    monthMap.get(month)!.push(entry);
  }

  // Sort years descending (newest year first)
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a);

  const yearNodes: JournalNode[] = sortedYears.map((year) => {
    const monthMap = yearMap.get(year)!;
    // Sort months in chronological order (January -> December)
    const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => a - b);

    let yearCount = 0;
    const monthNodes: JournalNode[] = sortedMonths.map((month) => {
      const monthEntries = monthMap.get(month)!;
      yearCount += monthEntries.length;
      const monthPad = String(month + 1).padStart(2, '0');
      return {
        id: `month-${year}-${monthPad}`,
        title: MONTH_NAMES[month],
        icon: MONTH_ICONS[month] ?? 'calendar',
        count: monthEntries.length,
        entries: monthEntries,
      };
    });

    return {
      id: `year-${year}`,
      title: `${year}`,
      icon: 'calendar',
      count: yearCount,
      children: monthNodes,
    };
  });

  // 2. Extract and count Tags
  const tagCounts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const tagNodes: JournalNode[] = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({
      id: `tag-${tag}`,
      title: tag,
      icon: TAG_ICONS[tag] ?? 'tag',
      count,
    }));

  // 3. Collections
  const collectionNodes: JournalNode[] = COLLECTIONS.map((col) => {
    const count = entries.filter((e) => e.tags.some((t) => col.tags.includes(t))).length;
    return {
      id: col.id,
      title: col.title,
      icon: col.icon,
      count,
    };
  }).filter((col) => col.count > 0);

  return [
    {
      id: 'all',
      title: 'All Entries',
      icon: 'book',
      count: entries.length,
      children: yearNodes,
    },
    {
      id: 'tags',
      title: 'Angular Topics',
      icon: 'tag',
      children: tagNodes,
    },
    {
      id: 'collections',
      title: 'Learning Tracks',
      icon: 'folder',
      children: collectionNodes,
    },
  ];
}

/**
 * Filters entries by the currently selected node identifier in the tree.
 */
export function filterEntriesByNode(entries: JournalEntry[], nodeId: string): JournalEntry[] {
  if (!nodeId || nodeId === 'all') {
    return entries;
  }

  if (nodeId.startsWith('year-')) {
    const year = nodeId.replace('year-', '');
    return entries.filter((e) => e.date.startsWith(year));
  }

  if (nodeId.startsWith('month-')) {
    const yearMonth = nodeId.replace('month-', '');
    return entries.filter((e) => e.date.startsWith(yearMonth));
  }

  if (nodeId.startsWith('tag-')) {
    const tag = nodeId.replace('tag-', '');
    return entries.filter((e) => e.tags.includes(tag));
  }

  if (nodeId.startsWith('col-')) {
    const col = COLLECTIONS.find((c) => c.id === nodeId);
    if (!col) return entries;
    return entries.filter((e) => e.tags.some((t) => col.tags.includes(t)));
  }

  return entries;
}

// Backward-compatible static export
export const JOURNAL_TREE: JournalNode[] = buildJournalTree(JOURNAL_ENTRIES);
