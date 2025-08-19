import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinner],
  template: `
    <div class="loading-container">
      <mat-spinner diameter="50"></mat-spinner>
      <p>Loading...</p>
    </div>
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 1rem;
      }
    `,
  ],
})
export class LoadingComponent {}
