import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth';
import { LoadingComponent } from './shared/components/loading/loading-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  title = 'MediaShelf';
  authInitialized = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authInitialized$.subscribe((initialized) => {
      this.authInitialized = initialized;
    });
  }
}
