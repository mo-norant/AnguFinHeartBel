import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

import * as firebase from 'firebase';


var config = {
  apiKey: "AIzaSyCipIk2HHAC0cHIi63D-PbaQocDgHS7mok",
  authDomain: "finheartbel.firebaseapp.com",
  databaseURL: "https://finheartbel.firebaseio.com",
  storageBucket: "finheartbel.appspot.com",
  messagingSenderId: "1059985304838"
};

firebase.initializeApp(config);



//nieuwe moveInLeft
@Component({
  selector: 'app-other',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})



export class MembersComponent implements OnInit {

  firstname
  lastname



  state: string = '';

  constructor(public af: AngularFire, private router: Router) {


    this.af.auth.subscribe(auth => {
      if (auth) {

        console.log("uid:" + auth.uid);

        const itemObservable = this.af.database.object('/users/' + auth.uid);

        //  itemObservable.subscribe(item => this.username = item.$value)
        itemObservable.subscribe(item => this.firstname = item.firstname);
        itemObservable.subscribe(item => this.lastname = item.lastname);
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

    fileChange(event) {

      var user = firebase.auth().currentUser;

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        
        var ref = firebase.storage().ref("/uploadsFinHeartBel/" + user.uid +"/" + new Date().toLocaleString() + ".json");

      var task = ref.put(file);

      task.on('state_changed'), function progress(snapshot){
        this.percentage  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


      },

      function error(err){
        
      },

      function complete(){
        console.log("file geupload");
      }

    }
}


  ngOnInit() {
  }


}