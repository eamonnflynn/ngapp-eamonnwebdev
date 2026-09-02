import { Component, signal, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { SidebarComponent } from './components/sidebar.component';
import { HeaderComponent } from './components/header.component';
import { EXERCISE_CATEGORIES, findExerciseByRoute } from './data/exercises.registry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  readonly categories = signal(EXERCISE_CATEGORIES);
  sidebarOpen = signal<boolean>(false);

  // Track active navigation event to dynamically set header title/breadcrumbs
  private navEvents = toSignal(
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
  );

  currentExercise = computed(() => {
    const url = this.navEvents()?.urlAfterRedirects ?? this.router.url;
    return findExerciseByRoute(url);
  });

  currentExerciseTitle = computed(() => {
    return this.currentExercise()?.title ?? 'Angular Learning Lab';
  });

  currentExerciseCategory = computed(() => {
    return this.currentExercise()?.categoryTitle ?? 'Interactive Exercises';
  });

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
