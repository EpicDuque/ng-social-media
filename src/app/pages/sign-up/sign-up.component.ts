import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms'
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { last, first } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // Custom errors
  errors = {
    email: false,
    badSyntax: false,
    passwordMatch: false,
  }

  // Form Builder
  passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    displayName: [''],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  // Custom form getters
  get name() { return this.signUpForm.get('firstName'); }
  get last() { return this.signUpForm.get('lastName'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
  get displayName() { return this.signUpForm.get('displayName'); }
  
  submitted = false;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.confirmPassword.valueChanges.subscribe(pass => {
      if(pass !== this.password.value) 
        this.errors.passwordMatch = true; 
      else 
        this.errors.passwordMatch = false;

    })
  }

  public onSubmit() {
    // Reset States
    this.resetErrorFlags();
    this.submitted = true;

    // Create new User and check if it exists in database
    this.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(cred => {
      if(cred){

        var obs = this.auth.getUserRef(cred.user).valueChanges().pipe(first());

        obs.subscribe(doc => {
          // User already Exists
          if(doc){
            console.error(`This user already exists in database!`);
            this.submitted = false;
            this.errors.email = true;
            return;

          } else {

            console.log(`New User`)
            console.log(`First Name: ${this.name.value}`)
            console.log(`Last Name: ${this.last.value}`)
            
            // New User
            var display = this.displayName.value;
            if(this.displayName.value === '' || this.displayName.value === null){
              display = `${this.name.value} ${this.last.value}`
            }
            console.log(`Display Name: ${display}`)

            var user: User = {
              uid: cred.user.uid,
              name: this.name.value,
              lastname: this.last.value,
              displayName: display,
            }

            // Update user data
            this.auth.updateUserData(user).then(() => {
              console.log('User created successfully!')
              this.submitted = false;
            })

          }

        })
      }
    }).catch(error => {
      console.error(error.message);
      this.submitted = false;
      this.errors.email = true;
    })

  }

  public resetErrorFlags() {
    this.errors = {
      email: false,
      badSyntax: false,
      passwordMatch: false,
    }
  }
}
