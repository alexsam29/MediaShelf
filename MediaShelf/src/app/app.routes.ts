import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';

export const routes: Routes = [
    // Define your application routes here
    {
        path: '',
        component: HomeComponent,
        title: "Home Page"
    }
];
