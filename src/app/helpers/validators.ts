import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class FormValidators {
  static createCompareValidator(controlOne: FormControl, controlTwo: FormControl) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }

  static ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmedValidator"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

export class ControlValidators {
  static validDateStr(control: FormControl): ValidationErrors | null {
    if (control.value != null) {
      let bits = control.value.split('/');
      let day = bits[0];
      let month = bits[1];
      let year = bits[2];
      let date = new Date(year, month - 1, day);
      if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
        return { validDateStr: true };
      if (date > new Date())
        return { validDateStr: true };
      if (date.getFullYear() < 1900)
        return { validDateStr: true };
    }
    return null;
  }
}
