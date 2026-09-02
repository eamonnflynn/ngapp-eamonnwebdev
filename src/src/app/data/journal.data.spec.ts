import { buildJournalTree, filterEntriesByNode, JOURNAL_ENTRIES } from './journal.data';

describe('journal.data dynamic functions', () => {
  it('should build a complete tree structure from entries without moods', () => {
    const tree = buildJournalTree(JOURNAL_ENTRIES);

    expect(tree.length).toBe(3);
    expect(tree.map((n) => n.id)).toEqual(['all', 'tags', 'collections']);
    expect(tree[0].count).toBe(11);
    expect(tree[0].children?.length).toBeGreaterThan(0);

    // Check year nodes and chronological month order
    const year2026 = tree[0].children?.find((n) => n.id === 'year-2026');
    expect(year2026).toBeDefined();
    expect(year2026?.count).toBe(8);
    const monthTitles2026 = year2026?.children?.map((m) => m.title);
    expect(monthTitles2026).toEqual(['January', 'August', 'September']);

    const year2025 = tree[0].children?.find((n) => n.id === 'year-2025');
    const monthTitles2025 = year2025?.children?.map((m) => m.title);
    expect(monthTitles2025).toEqual(['October', 'December']);

    // Check Angular tag nodes
    const tagsNode = tree.find((n) => n.id === 'tags');
    expect(tagsNode?.children?.length).toBeGreaterThan(0);

    const signalsTag = tagsNode?.children?.find((t) => t.id === 'tag-signals');
    expect(signalsTag).toBeDefined();
    expect(signalsTag?.count).toBeGreaterThan(0);

    const componentsTag = tagsNode?.children?.find((t) => t.id === 'tag-components');
    expect(componentsTag).toBeDefined();
    expect(componentsTag?.count).toBeGreaterThan(0);

    const tailwindTag = tagsNode?.children?.find((t) => t.id === 'tag-tailwind');
    expect(tailwindTag).toBeDefined();
    expect(tailwindTag?.count).toBe(1);

    // Verify Moods node is removed
    const moodsNode = tree.find((n) => n.id === 'moods');
    expect(moodsNode).toBeUndefined();

    // Check learning collections
    const colNode = tree.find((n) => n.id === 'collections');
    expect(colNode?.children?.length).toBeGreaterThan(0);
  });

  it('should filter entries dynamically by node id', () => {
    // All
    expect(filterEntriesByNode(JOURNAL_ENTRIES, 'all').length).toBe(11);

    // Year
    const y2026 = filterEntriesByNode(JOURNAL_ENTRIES, 'year-2026');
    expect(y2026.length).toBe(8);
    expect(y2026.every((e) => e.date.startsWith('2026'))).toBe(true);

    // Month
    const aug2026 = filterEntriesByNode(JOURNAL_ENTRIES, 'month-2026-08');
    expect(aug2026.length).toBe(6);
    expect(aug2026.every((e) => e.date.startsWith('2026-08'))).toBe(true);

    // Tailwind tag
    const tailwind = filterEntriesByNode(JOURNAL_ENTRIES, 'tag-tailwind');
    expect(tailwind.length).toBe(1);
    expect(tailwind[0].title).toContain('Tailwind CSS');

    // Signals tag
    const signals = filterEntriesByNode(JOURNAL_ENTRIES, 'tag-signals');
    expect(signals.length).toBeGreaterThan(0);
    expect(signals.every((e) => e.tags.includes('signals'))).toBe(true);

    // Components tag
    const components = filterEntriesByNode(JOURNAL_ENTRIES, 'tag-components');
    expect(components.length).toBeGreaterThan(0);
    expect(components.every((e) => e.tags.includes('components'))).toBe(true);

    // Collection (Reactivity & State)
    const reactivity = filterEntriesByNode(JOURNAL_ENTRIES, 'col-reactivity');
    expect(reactivity.length).toBeGreaterThan(0);
    expect(reactivity.some((e) => e.tags.includes('signals') || e.tags.includes('rxjs'))).toBe(true);
  });
});
