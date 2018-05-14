import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CurrentWorkoutComponent } from "./my-workout/current-workout.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { DashboardComponent } from "./dash/dashboard.component";
import { HeaderComponent } from "./header.component";
import { MyWorkoutComponent } from "./my-workout/my-workout.component"
import { NewWorkoutComponent} from "./my-workout/new-workout.component";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
      AppComponent,
      CurrentWorkoutComponent,
      CustomWorkoutComponent,
      DashboardComponent,
      HeaderComponent,
      MyWorkoutComponent,
      NewWorkoutComponent
    ],
    imports: [BrowserModule, routing, FormsModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
