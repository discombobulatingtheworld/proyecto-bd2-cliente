import { FormControl, FormGroup } from "@angular/forms";

export class Validators {
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
