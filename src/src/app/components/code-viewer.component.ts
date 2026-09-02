import { Component, input, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

export type CodeTheme = 'nord' | 'dracula' | 'one-dark' | 'github-dark';

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    /* Nord Theme Syntax */
    .theme-nord .token.comment, .theme-nord .token.prolog, .theme-nord .token.doctype, .theme-nord .token.cdata { color: #616e88; font-style: italic; }
    .theme-nord .token.punctuation { color: #eceff4; }
    .theme-nord .token.property, .theme-nord .token.tag, .theme-nord .token.boolean, .theme-nord .token.number, .theme-nord .token.constant, .theme-nord .token.symbol { color: #b48ead; }
    .theme-nord .token.selector, .theme-nord .token.attr-name, .theme-nord .token.string, .theme-nord .token.char, .theme-nord .token.builtin { color: #a3be8c; }
    .theme-nord .token.operator, .theme-nord .token.entity, .theme-nord .token.url { color: #81a1c1; }
    .theme-nord .token.atrule, .theme-nord .token.attr-value, .theme-nord .token.keyword { color: #81a1c1; font-weight: 600; }
    .theme-nord .token.function, .theme-nord .token.class-name { color: #88c0d0; }
    .theme-nord .token.regex, .theme-nord .token.important, .theme-nord .token.variable { color: #ebcb8b; }

    /* Dracula Theme Syntax */
    .theme-dracula .token.comment, .theme-dracula .token.prolog, .theme-dracula .token.doctype, .theme-dracula .token.cdata { color: #6272a4; font-style: italic; }
    .theme-dracula .token.punctuation { color: #f8f8f2; }
    .theme-dracula .token.property, .theme-dracula .token.tag, .theme-dracula .token.constant, .theme-dracula .token.symbol { color: #ff79c6; }
    .theme-dracula .token.boolean, .theme-dracula .token.number { color: #bd93f9; }
    .theme-dracula .token.selector, .theme-dracula .token.attr-name, .theme-dracula .token.string, .theme-dracula .token.char, .theme-dracula .token.builtin { color: #f1fa8c; }
    .theme-dracula .token.operator, .theme-dracula .token.entity, .theme-dracula .token.url { color: #ff79c6; }
    .theme-dracula .token.atrule, .theme-dracula .token.attr-value, .theme-dracula .token.keyword { color: #ff79c6; font-weight: 600; }
    .theme-dracula .token.function, .theme-dracula .token.class-name { color: #50fa7b; }
    .theme-dracula .token.regex, .theme-dracula .token.important, .theme-dracula .token.variable { color: #f8f8f2; }

    /* One Dark Theme Syntax */
    .theme-one-dark .token.comment, .theme-one-dark .token.prolog, .theme-one-dark .token.doctype, .theme-one-dark .token.cdata { color: #5c6370; font-style: italic; }
    .theme-one-dark .token.punctuation { color: #abb2bf; }
    .theme-one-dark .token.property, .theme-one-dark .token.tag, .theme-one-dark .token.boolean, .theme-one-dark .token.number, .theme-one-dark .token.constant { color: #d19a66; }
    .theme-one-dark .token.selector, .theme-one-dark .token.attr-name, .theme-one-dark .token.string, .theme-one-dark .token.char, .theme-one-dark .token.builtin { color: #98c379; }
    .theme-one-dark .token.operator, .theme-one-dark .token.entity, .theme-one-dark .token.url { color: #56b6c2; }
    .theme-one-dark .token.atrule, .theme-one-dark .token.attr-value, .theme-one-dark .token.keyword { color: #c678dd; font-weight: 600; }
    .theme-one-dark .token.function, .theme-one-dark .token.class-name { color: #61afef; }
    .theme-one-dark .token.regex, .theme-one-dark .token.important, .theme-one-dark .token.variable { color: #e06c75; }

    /* GitHub Dark Theme Syntax */
    .theme-github-dark .token.comment, .theme-github-dark .token.prolog, .theme-github-dark .token.doctype, .theme-github-dark .token.cdata { color: #8b949e; font-style: italic; }
    .theme-github-dark .token.punctuation { color: #c9d1d9; }
    .theme-github-dark .token.property, .theme-github-dark .token.tag { color: #7ee787; }
    .theme-github-dark .token.boolean, .theme-github-dark .token.number, .theme-github-dark .token.constant { color: #79c0ff; }
    .theme-github-dark .token.selector, .theme-github-dark .token.attr-name, .theme-github-dark .token.string, .theme-github-dark .token.char, .theme-github-dark .token.builtin { color: #a5d6ff; }
    .theme-github-dark .token.operator, .theme-github-dark .token.entity, .theme-github-dark .token.url { color: #ff7b72; }
    .theme-github-dark .token.atrule, .theme-github-dark .token.attr-value, .theme-github-dark .token.keyword { color: #ff7b72; font-weight: 600; }
    .theme-github-dark .token.function, .theme-github-dark .token.class-name { color: #d2a8ff; }
    .theme-github-dark .token.regex, .theme-github-dark .token.important, .theme-github-dark .token.variable { color: #ffa657; }
  `],
  template: `
    <div
      class="overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 font-mono text-xs"
      [ngClass]="[currentThemeClasses().container, 'theme-' + selectedTheme()]"
    >
      <!-- Window Titlebar -->
      <div
        class="flex items-center justify-between border-b px-4 py-3 select-none"
        [ngClass]="currentThemeClasses().header"
      >
        <!-- File Title -->
        <div class="flex items-center gap-2">
          <span class="font-medium text-xs tracking-wide" [ngClass]="currentThemeClasses().fileName">
            {{ filename() }}
          </span>
        </div>

        <!-- Controls: Language Badge, Theme Switcher, Copy Button -->
        <div class="flex items-center gap-2">
          <!-- Language badge -->
          <span
            class="rounded px-2 py-0.5 text-[11px] font-semibold"
            [ngClass]="currentThemeClasses().badge"
          >
            {{ language() }}
          </span>

          <!-- Theme selector dropdown -->
          <div class="relative">
            <select
              [value]="selectedTheme()"
              (change)="onThemeChange($event)"
              class="cursor-pointer appearance-none rounded-lg border py-1 pl-2.5 pr-7 text-[11px] font-medium outline-none transition-colors"
              [ngClass]="currentThemeClasses().select"
            >
              <option value="nord">Nord</option>
              <option value="dracula">Dracula</option>
              <option value="one-dark">One Dark</option>
              <option value="github-dark">GitHub Dark</option>
            </select>
            <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60">
              <app-icon name="chevron-down" [size]="12" />
            </span>
          </div>

          <!-- Copy Button -->
          <button
            type="button"
            (click)="copyCode()"
            class="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all active:scale-95"
            [ngClass]="currentThemeClasses().button"
          >
            <app-icon [name]="copied() ? 'check' : 'copy'" [size]="13" />
            <span>{{ copied() ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
      </div>

      <!-- Syntax-Highlighted Code Content Body -->
      <div class="relative overflow-x-auto p-5 leading-relaxed" [ngClass]="currentThemeClasses().codeArea">
        <pre class="font-mono m-0"><code [innerHTML]="highlightedCode()"></code></pre>
      </div>
    </div>
  `,
})
export class CodeViewerComponent {
  filename = input.required<string>();
  code = input.required<string>();
  language = input<string>('TypeScript');

  selectedTheme = signal<CodeTheme>('github-dark');
  copied = signal<boolean>(false);

  highlightedCode = computed(() => {
    const raw = this.code();
    const lang = this.language().toLowerCase();
    
    let grammar = Prism.languages['typescript'];
    let prismLang = 'typescript';

    if (lang.includes('html') || lang.includes('markup') || lang.includes('template')) {
      grammar = Prism.languages['markup'];
      prismLang = 'markup';
    } else if (lang.includes('js') || lang.includes('javascript')) {
      grammar = Prism.languages['javascript'];
      prismLang = 'javascript';
    }

    return Prism.highlight(raw, grammar, prismLang);
  });

  onThemeChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value as CodeTheme;
    this.selectedTheme.set(val);
  }

  copyCode() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.code()).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }

  currentThemeClasses() {
    switch (this.selectedTheme()) {
      case 'nord':
        return {
          container: 'border-[#3b4252] bg-[#2e3440] shadow-slate-950/20',
          header: 'border-[#3b4252] bg-[#242933]',
          fileName: 'text-[#eceff4]',
          badge: 'bg-[#88c0d0]/20 text-[#88c0d0] border border-[#88c0d0]/40',
          select: 'border-[#3b4252] bg-[#2e3440] text-[#eceff4] hover:border-[#4c566a]',
          button: 'border-[#3b4252] bg-[#2e3440] text-[#eceff4] hover:bg-[#434c5e] hover:text-white',
          codeArea: 'text-[#e5e9f0] selection:bg-[#434c5e]',
        };
      case 'dracula':
        return {
          container: 'border-[#44475a] bg-[#282a36] shadow-purple-950/20',
          header: 'border-[#44475a] bg-[#21222c]',
          fileName: 'text-[#f8f8f2]',
          badge: 'bg-[#bd93f9]/20 text-[#bd93f9] border border-[#bd93f9]/40',
          select: 'border-[#44475a] bg-[#282a36] text-[#f8f8f2] hover:border-[#6272a4]',
          button: 'border-[#44475a] bg-[#282a36] text-[#f8f8f2] hover:bg-[#44475a] hover:text-white',
          codeArea: 'text-[#f8f8f2] selection:bg-[#44475a]',
        };
      case 'one-dark':
        return {
          container: 'border-[#3e4451] bg-[#282c34] shadow-sky-950/20',
          header: 'border-[#3e4451] bg-[#21252b]',
          fileName: 'text-[#abb2bf]',
          badge: 'bg-[#61afef]/20 text-[#61afef] border border-[#61afef]/40',
          select: 'border-[#3e4451] bg-[#282c34] text-[#abb2bf] hover:border-[#5c6370]',
          button: 'border-[#3e4451] bg-[#282c34] text-[#abb2bf] hover:bg-[#3e4451] hover:text-white',
          codeArea: 'text-[#abb2bf] selection:bg-[#3e4451]',
        };
      case 'github-dark':
      default:
        return {
          container: 'border-[#30363d] bg-[#0d1117] shadow-black/30',
          header: 'border-[#30363d] bg-[#161b22]',
          fileName: 'text-[#c9d1d9]',
          badge: 'bg-[#388bfd]/20 text-[#58a6ff] border border-[#388bfd]/40',
          select: 'border-[#30363d] bg-[#0d1117] text-[#c9d1d9] hover:border-[#8b949e]',
          button: 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white',
          codeArea: 'text-[#c9d1d9] selection:bg-[#1f6feb]/30',
        };
    }
  }
}
