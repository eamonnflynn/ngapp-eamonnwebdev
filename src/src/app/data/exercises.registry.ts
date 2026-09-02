import { ExerciseCategory, ExerciseMeta } from '../models/exercise.model';

export const EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    id: 'reactivity',
    title: 'Reactivity & State',
    icon: 'activity',
    exercises: [
      {
        id: 'signal-counter',
        slug: 'signal-counter',
        title: 'Signal Counter Lab',
        category: 'reactivity',
        categoryTitle: 'Reactivity & State',
        description: 'Deep dive into Writable Signals, computed values, mutation, and side-effect tracking.',
        difficulty: 'Beginner',
        tags: ['signals', 'computed', 'state', 'reactivity'],
        icon: 'trending-up',
        route: '/category/reactivity/signal-counter',
      },
    ],
  },
  {
    id: 'templates',
    title: 'Modern Templates',
    icon: 'layout',
    exercises: [
      {
        id: 'control-flow',
        slug: 'control-flow',
        title: 'Built-in Control Flow',
        category: 'templates',
        categoryTitle: 'Modern Templates',
        description: 'Explore modern @if, @else if, @else, and @switch / @case syntax replacing structural directives.',
        difficulty: 'Beginner',
        tags: ['@if', '@switch', 'control-flow', 'templates'],
        icon: 'layers',
        route: '/category/templates/control-flow',
      },
    ],
  },
];

export const ALL_EXERCISES: ExerciseMeta[] = EXERCISE_CATEGORIES.flatMap((c) => c.exercises);

export function findExerciseByRoute(url: string): ExerciseMeta | undefined {
  return ALL_EXERCISES.find((e) => url.includes(e.slug));
}
