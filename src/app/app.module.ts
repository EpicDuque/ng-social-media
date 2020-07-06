import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PagePostsComponent } from './pages/pageposts/pageposts.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PostComponent } from './components/post/post.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component'

import { AngularFireModule } from '@angular/fire';
import { LogInComponent } from './pages/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PagePostsComponent,
    PageProfileComponent,
    PostComponent,
    WritePostComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
