import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

//fallin is animation

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})


export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  
    constructor(public af: AngularFire,private router: Router) {
    this.af.auth.subscribe(auth => { 
      if(auth) {
        //als user is aangelogd ga naar members anders
        this.router.navigateByUrl('/members');
      }
    });
  }


//als er een form wordt gesubmit wordt er gechecked of user aan vereisten voldoet, zoja ga naar CreateUser van firebasebibliotheek
  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password      
      
      }).then(
        (success) => {
       
        console.log(success);

        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }

  }

  ngOnInit(){
    
  }

}
