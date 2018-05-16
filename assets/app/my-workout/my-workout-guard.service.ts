import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MyWorkoutService } from './my-workout.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyWorkoutGuard implements CanActivate {

  constructor(private myWorkoutService: MyWorkoutService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.myWorkoutService.getCurrentWorkout()) {
      return true;
    } else {
      this.router.navigate(['/my-workout/new-workout']);
      return false;
    }
  }
}
