import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';



// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyCipIk2HHAC0cHIi63D-PbaQocDgHS7mok",
    authDomain: "finheartbel.firebaseapp.com",
    databaseURL: "https://finheartbel.firebaseio.com",
    storageBucket: "finheartbel.appspot.com",
    messagingSenderId: "1059985304838"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }