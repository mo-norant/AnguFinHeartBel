import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';


//nieuwe moveInLeft
@Component({
  selector: 'app-other',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})

export class MembersComponent implements OnInit {
  
  username


  state: string = '';

  constructor(public af: AngularFire, private router: Router) {


    this.af.auth.subscribe(auth => {
      if (auth) {

        console.log("uid:" + auth.uid);

         const itemObservable = this.af.database.object(auth.uid + "/username");
      itemObservable.subscribe(item => this.username = item.$value)
        
        
         

       


      }



    });

  }


  //bij logout wordt called user logout van angularfire2
  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }


  remove() {


    this.af.auth.subscribe(auth => {
      if (auth) {
    const itemObservable = this.af.database.object(auth.uid);
      itemObservable.remove();
        auth.auth.delete().then(succes => {
          this.af.auth.logout();
          this.router.navigateByUrl('/login');
        });

      }
    });
  }


  ngOnInit() {
  }

}