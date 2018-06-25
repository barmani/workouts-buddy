import { Routes, RouterModule } from "@angular/router";

import { CurrentWorkoutComponent } from "./current-workout/current-workout.component";
import { NewWorkoutComponent } from "./new-workout/new-workout.component";
import { MyWorkoutGuard } from "./my-workout-guard.service";

export const MY_WORKOUT_ROUTES: Routes = [
  { path: '', redirectTo: 'current-workout', pathMatch: 'full' },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'current-workout', canActivate: [MyWorkoutGuard], component: CurrentWorkoutComponent },
];
