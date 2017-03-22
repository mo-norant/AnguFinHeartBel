import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { ProgressbarModule } from 'ng2-bootstrap';
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
  dynamic
  max: number = 100;



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
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      var ref = firebase.storage().ref("/uploadsFinHeartBel/" + user.uid + "/" + new Date().toLocaleString() + ".json");
      var task = ref.put(file);

      task.on('state_changed', snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


        this.dynamic = progress.toFixed(0);

        console.log('Upload is ' + progress + '% done');
        console.log(this.dynamic);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, error => {
        // Handle unsuccessful uploads
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = task.snapshot.downloadURL;
        console.log(downloadURL);
      });

    }
  }




ngOnInit() {
}


}