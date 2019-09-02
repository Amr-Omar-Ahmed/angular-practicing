import { User } from "src/app/Shared/models/user.model";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { CustomValidators } from "src/app/Shared/Validators/custom-validators";
import { Router } from "@angular/router";
import { AuthService } from "../../../Core/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user: User;
  signupFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) { }

  formErrors = {
    fullName: "",
    email: "",
    confirmEmail: "",
    emailGroup: "",
    phone: "",
    skillName: "",
    experienceInYears: "",
    proficiency: "",
    password: ""
  };

  validationMessages = {
    fullName: {
      required: "Full Name is required.",
      minlength: "Full Name must be greater than 2 characters.",
      maxlength: "Full Name must be less than 20 characters."
    },
    email: {
      required: "Email is required.",
      emailDomain: "Email domain can not be @yahoo.com",
      email: "it should be like ahmed@outlook.com"
    },
    confirmEmail: {
      required: "Confirm email is required."
    },
    emailGroup: {
      misMatchEmails: "email and confirm email should be matched"
    },
    phone: {
      required: "Phone is required."
    },
    password: {
      required: "Password is required."
    },
    skillName: {
      required: "Skill Name is required."
    },
    experienceInYears: {
      required: "Experience is required."
    },
    proficiency: {
      required: "Proficiency is required."
    }
  };

  ngOnInit() {
    this.signupFrom = this.fb.group({
      fullName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
      ],
      contactPreference: ["email"],
      emailGroup: this.fb.group(
        {
          email: [
            "",
            [
              Validators.required,
              Validators.email,
              CustomValidators.emailCustomValidation("yahoo.com")
            ]
          ],
          confirmEmail: ["", [Validators.required]]
        },
        { validators: this.confirmEmailMatchValidator }
      ),

      phone: [{ value: "", disabled: true }],
      password: ["", Validators.required],
      skills: this.fb.array([this.addSkillFormGroup()])
    });

    this.signupFrom.valueChanges.subscribe(data => {
      this.logValidationErrors(this.signupFrom);
    });
    this.signupFrom
      .get("contactPreference")
      .valueChanges.subscribe((data: string) => {
        this.onContactPerfenceChange(data);
      });
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ["", Validators.required],
      experienceInYears: ["", Validators.required],
      proficiency: ["", Validators.required]
    });
  }

  get skills() {
    return <FormArray>this.signupFrom.get("skills");
  }

  addSkillBtnHandler() {
    this.skills.push(this.addSkillFormGroup());
  }

  removeSkillButtonHandler(skillIndex: number) {
    this.skills.removeAt(skillIndex);
    this.skills.markAsTouched();
    this.skills.markAsDirty();
  }

  logValidationErrors(group: FormGroup = this.signupFrom) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = "";
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched ||
          abstractControl.dirty ||
          abstractControl.value != "")
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + " ";
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onContactPerfenceChange(selectedValue: string) {
    let phoneControl = this.signupFrom.get("phone");
    if (selectedValue === "phone") {
      phoneControl.setValidators(Validators.required);
      phoneControl.enable();
    } else if (selectedValue === "email") {
      phoneControl.clearValidators();
      phoneControl.disable();
    }
    phoneControl.updateValueAndValidity();
  }

  confirmEmailMatchValidator(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const emailControl = group.get("email").value;
    const confirmEmailControl = group.get("confirmEmail").value;
    if (
      emailControl == confirmEmailControl ||
      (group.get("confirmEmail").pristine && confirmEmailControl == "")
    ) {
      return null;
    } else {
      return { misMatchEmails: true };
    }
  }

  signup() {
    this.user = this.signupFrom.value;
    this._authService.signup(this.user).subscribe(
      (data: any) => {
        this.router.navigate(["/login"]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
