import { Component, inject, input, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AcccountService } from '../_services/acccount.service';

import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  private accountServices = inject(AcccountService);
  registerForm: FormGroup = new FormGroup({});
  cancelRegister = output<boolean>();
  formbuilder = inject(FormBuilder);
  maxDate = new Date();
  private router = inject(Router);
  validationErrors: string[] | undefined;

  ngOnInit(): void {
    this.initializeFrom();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  initializeFrom() {
    this.registerForm = this.formbuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  /*initializeFrom() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required,this.matchValues('password')])
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }*/

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({ 'dateOfBirth': dob });
    this.accountServices.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.validationErrors = error
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }

}
