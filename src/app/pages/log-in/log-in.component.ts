import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({

  });
  
  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  public googleSignin() {
    this.auth.googleSignin().then(() => this.router.navigate(['/posts']));
  }
}
