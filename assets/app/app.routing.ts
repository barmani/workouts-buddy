import { Routes, RouterModule } from "@angular/router";

import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { DashboardComponent } from "./dash/dashboard.component";
import { NewWorkoutComponent } from "./new-workout/new-workout.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dash', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'custom-workout', component: CustomWorkoutComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);