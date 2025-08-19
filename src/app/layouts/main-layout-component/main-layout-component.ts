import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header-component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main-layout',
  imports: [
    ...SHARED_IMPORTS,
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.scss',
})
export class MainLayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
