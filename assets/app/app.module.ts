import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CustomWorkoutComponent } from "./custom-workout/custom-workout.component";
import { DashboardComponent } from "./dash/dashboard.component";
import { HeaderComponent } from "./header.component";
import { NewWorkoutComponent} from "./new-workout/new-workout.component";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
      AppComponent,
      CustomWorkoutComponent,
      DashboardComponent,
      HeaderComponent,
      NewWorkoutComponent,
      NewWorkoutComponent
    ],
    imports: [BrowserModule, routing, FormsModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
