import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms'
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { last } from 'rxjs/operators';

import { User } from '../../services/user.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    displayName: [''],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  submitted = false;

  get name() { return this.signUpForm.get('firstName'); }
  get last() { return this.signUpForm.get('lastName'); }
  get email() { return this.signUpForm.get('email'); }

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  public onSubmit() {
    this.submitted = true;

    console.warn(this.signUpForm.value);
    var { email, password, displayName, name, lastName } = this.signUpForm.value;

    this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      if(cred){
        console.log(`Email: ${cred.user.email}`);
        
        var user: User = {
          uid: cred.user.uid,
          name: name,
          lastname: lastName,
          displayName: displayName,
        }

        this.auth.updateUserData(user).then(() => {
          console.log('User created successfully!')
          this.submitted = false;
        })
      }
      
    })
  }

  
}
