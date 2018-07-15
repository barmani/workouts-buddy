import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(control: AbstractControl) {
    if (control.get('newPassword').value === control.get('newPasswordConfirm').value) {
      return null;
    } else {
      control.get('newPasswordConfirm').setErrors({ match: true});
    }
  }
  
}
