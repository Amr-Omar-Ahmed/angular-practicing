import { AbstractControl } from '@angular/forms';

// custom validator reusable
export class CustomValidators {
    //custom validator with parameter
    static emailCustomValidation(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: string = control.value;
            const emailDomain = email.substring(email.lastIndexOf('@') + 1)
            if (emailDomain == domainName) {
                return { emailDomain: true }
            } else {
                return null
            }
        }
    }
}