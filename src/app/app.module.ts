import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from "./app.component";
import { ChangeEmailDialogComponent } from './user-page/change-email-dialog.component';
import { ChangeExerciseDialogComponent } from "./my-workout/change-exercise-dialog/change-exercise-dialog.component";
import { CurrentWorkoutComponent } from "./my-workout/current-workout/current-workout.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { CustomWorkoutService } from "./services/custom-workout.service";
import { AboutComponent } from "./about/about.component";
import { EqualValidator } from './login-signup/equal-validator.directive';
import { ExerciseComponent } from "./my-workout/exercise/exercise.component";
import { LoginComponent } from './login-signup/login/login.component';
import { LoginSignupComponent } from './login-signup/login-signup/login-signup.component';
import { LoginSignupService } from './services/login-signup.service';
import { MyWorkoutComponent } from "./my-workout/my-workout.component";
import { MyWorkoutGuard } from "./services/my-workout-guard.service";
import { MyWorkoutService } from "./services/my-workout.service";
import { NewWorkoutComponent} from "./my-workout/new-workout/new-workout.component";
import { routing } from "./app.routing";
import { SaveWorkoutDialogComponent } from './my-workout/save-workout-dialog.component';
import { SavedWorkoutsComponent } from './saved-workouts/saved-workouts.component';
import { SavedWorkoutsService } from './services/saved-workouts.service';
import { SetComponent } from './my-workout/set/set.component';
import { SetContainerComponent } from './my-workout/set-container/set-container.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { TruncatePipe } from './truncate.pipe';
import { UserPageComponent } from './user-page/user-page.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
    declarations: [
      AboutComponent,
      AppComponent,
      ChangeEmailDialogComponent,
      ChangeExerciseDialogComponent,
      CurrentWorkoutComponent,
      CustomWorkoutComponent,
      EqualValidator,
      ExerciseComponent,
      LoginComponent,
      LoginSignupComponent,
      MyWorkoutComponent,
      NewWorkoutComponent,
      SaveWorkoutDialogComponent,
      SavedWorkoutsComponent,
      SetComponent,
      SetContainerComponent,
      SignupComponent,
      TruncatePipe,
      UserPageComponent
    ],
    imports: [
              AngularMaterialModule,
              BrowserModule,
              BrowserAnimationsModule,
              DragulaModule,
              FlexLayoutModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              HttpModule,
              routing
             ],
    providers: [MyWorkoutGuard, MyWorkoutService, CustomWorkoutService, LoginSignupService, SavedWorkoutsService],
    entryComponents: [SaveWorkoutDialogComponent, ChangeExerciseDialogComponent, ChangeEmailDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}
