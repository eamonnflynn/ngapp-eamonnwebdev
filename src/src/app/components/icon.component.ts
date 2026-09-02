import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0"
    >
      @switch (name()) {
        @case ('code') {
          <ng-container>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </ng-container>
        }
        @case ('cpu') {
          <ng-container>
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" />
            <path d="M15 2v2M9 2v2M20 15h2M20 9h2M9 20v2M15 20v2M2 9h2M2 15h2" />
          </ng-container>
        }
        @case ('layers') {
          <ng-container>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </ng-container>
        }
        @case ('box') {
          <ng-container>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
          </ng-container>
        }
        @case ('check-circle') {
          <ng-container>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </ng-container>
        }
        @case ('activity') {
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        }
        @case ('terminal') {
          <ng-container>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
          </ng-container>
        }
        @case ('book') {
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        }
        @case ('calendar') {
          <ng-container>
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18M8 2v4M16 2v4" />
          </ng-container>
        }
        @case ('leaf') {
          <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 11-9 1 0 2 .5 2 2 0 7-4 11-9 11Z M11 20c0-3 2-6 5-8" />
        }
        @case ('snowflake') {
          <ng-container>
            <path d="M12 2v20M4 6l16 12M20 6L4 18" />
            <path d="M9 4l3 2 3-2M9 20l3-2 3 2M2 9l2 3-2 3M22 9l-2 3 2 3" />
          </ng-container>
        }
        @case ('gift') {
          <ng-container>
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
          </ng-container>
        }
        @case ('cloud') {
          <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 16.5" />
        }
        @case ('tag') {
          <ng-container>
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
          </ng-container>
        }
        @case ('heart') {
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        }
        @case ('folder') {
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.45-.63l-.31-.32A2 2 0 0 0 7.89 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
        }
        @case ('sparkles') {
          <ng-container>
            <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
            <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
          </ng-container>
        }
        @case ('flower') {
          <ng-container>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 9V6a3 3 0 0 1 6 0c0 1.5-2 3-6 3M12 15v3a3 3 0 0 0 6 0c0-1.5-2-3-6-3M9 12H6a3 3 0 0 1 0-6c1.5 0 3 2 3 6M15 12h3a3 3 0 0 0 0-6c-1.5 0-3 2-3 6" />
          </ng-container>
        }
        @case ('book-open') {
          <path d="M12 7v14M3 3h6a3 3 0 0 1 3 3v15a2 2 0 0 0-2-2H3zM21 3h-6a3 3 0 0 0-3 3v15a2 2 0 0 1 2-2h7z" />
        }
        @case ('mountain') {
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        }
        @case ('utensils') {
          <ng-container>
            <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20M18 2v20M16 2c-1.5 0-3 1.5-3 3.5v7a2 2 0 0 0 2 2h3V2" />
          </ng-container>
        }
        @case ('chef-hat') {
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.44 3.5 3.5 0 0 1 5.08 0c.36.36.69.78.95 1.44A4 4 0 0 1 18 13.87V21H6Z M6 17h12" />
        }
        @case ('pen') {
          <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" />
        }
        @case ('mail') {
          <ng-container>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </ng-container>
        }
        @case ('users') {
          <ng-container>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </ng-container>
        }
        @case ('sun') {
          <ng-container>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </ng-container>
        }
        @case ('smile') {
          <ng-container>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </ng-container>
        }
        @case ('wind') {
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
        }
        @case ('moon') {
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        }
        @case ('flame') {
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        }
        @case ('zap') {
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        }
        @case ('search') {
          <ng-container>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </ng-container>
        }
        @case ('menu') {
          <path d="M4 12h16M4 6h16M4 18h16" />
        }
        @case ('plus') {
          <path d="M5 12h14M12 5v14" />
        }
        @case ('chevron-right') {
          <path d="m9 18 6-6-6-6" />
        }
        @case ('chevron-down') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('x') {
          <path d="M18 6 6 18M6 6l12 12" />
        }
        @case ('clock') {
          <ng-container>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </ng-container>
        }
        @case ('arrow-left') {
          <path d="m12 19-7-7 7-7M19 12H5" />
        }
        @case ('settings') {
          <ng-container>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </ng-container>
        }
        @case ('feather') {
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z M16 8 2 22M17.5 15H9" />
        }
        @default {
          <circle cx="12" cy="12" r="9" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(20);
}
