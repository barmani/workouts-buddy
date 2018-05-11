import { Routes, RouterModule } from "@angular/router";


const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dash', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'new-workout', component: CustomWorkoutComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
