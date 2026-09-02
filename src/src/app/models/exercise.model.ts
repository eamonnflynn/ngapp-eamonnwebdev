export interface ExerciseMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryTitle: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  icon: string;
  route: string;
}

export interface ExerciseCategory {
  id: string;
  title: string;
  icon: string;
  exercises: ExerciseMeta[];
}
