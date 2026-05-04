import { Routes } from '@angular/router';
import {
  MainComponent,
  HomeComponent,
  DetailsComponent,
  AboutComponent,
  PrivacyComponent,
  TermsComponent,
} from './features/pages';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', component: DetailsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
];
