import { Routes, RouterModule } from "@angular/router";

import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { DashboardComponent } from "./dash/dashboard.component";
import { NewWorkoutComponent } from "./my-workout/new-workout/new-workout.component";
import { MyWorkoutComponent } from "./my-workout/my-workout.component";
import { MY_WORKOUT_ROUTES } from "./my-workout/my-workout.routes";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/my-workout', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent },
  { path: 'my-workout', component: MyWorkoutComponent, children: MY_WORKOUT_ROUTES },
  { path: 'custom-workout', component: CustomWorkoutComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
