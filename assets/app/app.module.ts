import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { CurrentWorkoutComponent } from "./my-workout/current-workout/current-workout.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { CustomWorkoutService } from "./custom-workout/custom-workout.service";
import { DashboardComponent } from "./dash/dashboard.component";
import { ExerciseComponent } from "./my-workout/exercise/exercise.component";
import { HeaderComponent } from "./header.component";
import { LoginComponent } from './login-signup/login.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { MyWorkoutComponent } from "./my-workout/my-workout.component";
import { MyWorkoutGuard } from "./my-workout/my-workout-guard.service";
import { MyWorkoutService } from "./my-workout/my-workout.service";
import { NewWorkoutComponent} from "./my-workout/new-workout/new-workout.component";
import { routing } from "./app.routing";
import { SignupComponent } from './login-signup/signup.component';

@NgModule({
    declarations: [
      AppComponent,
      CurrentWorkoutComponent,
      CustomWorkoutComponent,
      DashboardComponent,
      ExerciseComponent,
      HeaderComponent,
      LoginComponent,
      LoginSignupComponent,
      MyWorkoutComponent,
      NewWorkoutComponent,
      SignupComponent
    ],
    imports: [BrowserModule, routing, FormsModule, ReactiveFormsModule, HttpModule],
    providers: [MyWorkoutGuard, MyWorkoutService, CustomWorkoutService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
