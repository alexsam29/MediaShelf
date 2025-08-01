import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth } from '@angular/fire/auth';
import { getFirestore } from '@angular/fire/firestore';

// Initialize Firebase
initializeApp(environment.firebase);
getAuth();
getFirestore();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
