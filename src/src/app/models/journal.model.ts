export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: string;
  tags: string[];
  wordCount?: number;
}

export interface JournalNode {
  id: string;
  title: string;
  icon?: string;
  count?: number;
  children?: JournalNode[];
  entries?: JournalEntry[];
}
