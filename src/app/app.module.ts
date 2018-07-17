import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule,
         MatFormFieldModule,
         MatInputModule,
         MatToolbarModule,
         MatRadioModule,
         MatCheckboxModule,
         MatButtonModule,
         MatSlideToggleModule,
         MatStepperModule,
         MatExpansionModule,
         MatSnackBarModule,
         MatSelectModule,
         MatAutocompleteModule,
         MatPaginatorModule } from '@angular/material';

import { AppComponent } from "./app.component";
import { ChangeExerciseDialogComponent } from "./my-workout/change-exercise-dialog/change-exercise-dialog.component";
import { ChecklistComponent } from './my-workout/checklist/checklist.component';
import { CurrentWorkoutComponent } from "./my-workout/current-workout/current-workout.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { CustomWorkoutService } from "./custom-workout/custom-workout.service";
import { DashboardComponent } from "./dash/dashboard.component";
import { EqualValidator } from './login-signup/equal-validator.directive';
import { ExerciseComponent } from "./my-workout/exercise/exercise.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from './login-signup/login/login.component';
import { LoginSignupComponent } from './login-signup/login-signup/login-signup.component';
import { LoginSignupService } from './login-signup/login-signup.service';
import { MyWorkoutComponent } from "./my-workout/my-workout.component";
import { MyWorkoutGuard } from "./my-workout/my-workout-guard.service";
import { MyWorkoutService } from "./my-workout/my-workout.service";
import { NewWorkoutComponent} from "./my-workout/new-workout/new-workout.component";
import { routing } from "./app.routing";
import { SaveWorkoutDialogComponent } from './my-workout/save-workout-dialog.component';
import { SavedWorkoutsComponent } from './saved-workouts/saved-workouts.component';
import { SavedWorkoutsService } from './saved-workouts/saved-workouts.service';
import { SetComponent } from './my-workout/set/set.component';
import { SetContainerComponent } from './my-workout/set-container/set-container.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
    declarations: [
      AppComponent,
      ChangeExerciseDialogComponent,
      ChecklistComponent,
      CurrentWorkoutComponent,
      CustomWorkoutComponent,
      DashboardComponent,
      EqualValidator,
      ExerciseComponent,
      HeaderComponent,
      LoginComponent,
      LoginSignupComponent,
      MyWorkoutComponent,
      NewWorkoutComponent,
      SaveWorkoutDialogComponent,
      SavedWorkoutsComponent,
      SetComponent,
      SetContainerComponent,
      SignupComponent,
      UserPageComponent
    ],
    imports: [
              BrowserModule,
              BrowserAnimationsModule,
              DragulaModule,
              routing,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              HttpModule,
              MatDialogModule,
              MatExpansionModule,
              MatFormFieldModule,
              MatInputModule,
              MatToolbarModule,
              MatStepperModule,
              MatRadioModule,
              MatCheckboxModule,
              MatButtonModule,
              MatSlideToggleModule,
              MatSnackBarModule,
              MatSelectModule,
              MatAutocompleteModule,
              MatPaginatorModule
             ],
    exports: [
              MatDialogModule,
              MatFormFieldModule,
              MatInputModule
             ],
    providers: [MyWorkoutGuard, MyWorkoutService, CustomWorkoutService, LoginSignupService, SavedWorkoutsService],
    entryComponents: [SaveWorkoutDialogComponent, ChangeExerciseDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}
