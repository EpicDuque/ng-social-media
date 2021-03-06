import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagePostsComponent } from './pages/pageposts/pageposts.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'posts', component: PagePostsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: PageProfileComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
