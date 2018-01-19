import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';  

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;
  constructor(private fire: AngularFireAuth, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data =>{
      console.log('Got some data:', this.fire.auth.currentUser);
      this.alert('You are Logged In!');
        //user is logged in!
      this.navCtrl.push(HomePage);     
    }).catch(error=>{
      console.log('Got an Error', error);
      this.alert(error.message);
      
    });
    this.email.value = "",
    this.password.value = ""
  }

  alert(message: string) {
    this.alertCtrl.create({
    title: 'Welcome ',
    subTitle: message,
    buttons: ['OK']
  }).present();
}

  openRegisterPage(){
    this.navCtrl.push(RegisterPage); 
  }
}
