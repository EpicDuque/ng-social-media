import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  
  get password() { return this.loginForm.get('password'); }
  get email() { return this.loginForm.get('email'); }

  submitted = false;

  errors = {
    authFailed: false,
  }

  constructor(public auth: AuthService, public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public signIn(){
    this.errors.authFailed = false;
    this.submitted = true;

    this.auth.userEmailSignin(this.email.value, this.password.value).then(cred => {
      if(cred){
        console.log('Login Successful!');
      }
    }).catch(err => {
      console.error(err);
      this.errors.authFailed = true;
      this.submitted = false;
    })
  }

  public async googleSignin() {
    var cred = await this.auth.googleSignin();

    this.auth.getUserRef(cred.user).valueChanges().subscribe(user => {
      if(user){
        console.log(`User Document Exists!`);
        console.warn(user);
      } else {
        console.warn(`This user document doesnt exist. Creating a new one.`)
        this.auth.updateUserData(cred.user);
      }
    })

  }
}
