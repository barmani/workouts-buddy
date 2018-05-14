import { Routes, RouterModule } from "@angular/router";

import { CurrentWorkoutComponent } from "./current-workout.component";
import { NewWorkoutComponent } from "./new-workout.component";

export const MY_WORKOUT_ROUTES: Routes = [
  { path: '', redirectTo: 'new-workout', pathMatch: 'full' },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'current-workout', component: CurrentWorkoutComponent },
];
