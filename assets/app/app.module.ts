import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { CurrentWorkoutComponent } from "./my-workout/current-workout/current-workout.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { DashboardComponent } from "./dash/dashboard.component";
import { ExerciseComponent } from "./my-workout/exercise/exercise.component";
import { HeaderComponent } from "./header.component";
import { MyWorkoutComponent } from "./my-workout/my-workout.component";
import { MyWorkoutGuard } from "./my-workout/my-workout-guard.service";
import { MyWorkoutService } from "./my-workout/my-workout.service";
import { NewWorkoutComponent} from "./my-workout/new-workout/new-workout.component";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
      AppComponent,
      CurrentWorkoutComponent,
      CustomWorkoutComponent,
      DashboardComponent,
      ExerciseComponent,
      HeaderComponent,
      MyWorkoutComponent,
      NewWorkoutComponent
    ],
    imports: [BrowserModule, routing, FormsModule, ReactiveFormsModule, HttpModule],
    providers: [MyWorkoutGuard, MyWorkoutService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
