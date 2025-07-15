import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddHelperComponent } from './pages/add-helper/add-helper.component';


export const routes: Routes = [
  {path : '', component : HomeComponent},
  {path: 'helperlist', component: AddHelperComponent },
];
