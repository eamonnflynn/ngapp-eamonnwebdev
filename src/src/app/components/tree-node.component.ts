import { Component, input, output, signal, computed } from '@angular/core';
import { JournalNode } from '../models/journal.model';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-tree-node',
  imports: [IconComponent],
  template: `
    <li>
      <button
        type="button"
        (click)="onSelect()"
        class="group flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors"
        [class]="isActive() ? 'bg-primary-100 text-primary-900 font-medium' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
      >
        @if (hasChildren()) {
          <span
            class="flex h-4 w-4 items-center justify-center text-slate-400 transition-transform duration-200"
            [class.rotate-90]="expanded()"
          >
            <app-icon name="chevron-right" [size]="14" />
          </span>
        } @else {
          <span class="w-4"></span>
        }

        @if (node().icon) {
          <app-icon [name]="node().icon!" [size]="16" class="text-slate-400 group-hover:text-slate-500" />
        }

        <span class="flex-1 truncate">{{ node().title }}</span>

        @if (node().count) {
          <span
            class="rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums"
            [class]="isActive() ? 'bg-primary-200 text-primary-800' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'"
          >
            {{ node().count }}
          </span>
        }
      </button>

      @if (hasChildren() && expanded()) {
        <ul class="ml-3 mt-0.5 space-y-0.5 border-l border-slate-200 pl-2">
          @for (child of node().children; track child.id) {
            <app-tree-node
              [node]="child"
              [selectedId]="selectedId()"
              [level]="level() + 1"
              (selectNode)="selectNode.emit($event)"
            />
          }
        </ul>
      }
    </li>
  `,
})
export class TreeNodeComponent {
  node = input.required<JournalNode>();
  selectedId = input<string>('');
  level = input<number>(0);

  selectNode = output<string>();

  expanded = signal(true);

  hasChildren = computed(() => !!this.node().children && this.node().children!.length > 0);
  isActive = computed(() => this.selectedId() === this.node().id);

  onSelect() {
    if (this.hasChildren()) {
      this.expanded.update((v) => !v);
    }
    this.selectNode.emit(this.node().id);
  }
}
