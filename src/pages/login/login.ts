// import { Component, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';  
import { RegistrationProvider } from '../../providers/registration/registration';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // @ViewChild('email') email;
  // @ViewChild('password') password;
  email: String;
  password: String;
  show = "";

  // constructor(private fire: AngularFireAuth,public registerP: RegistrationProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  constructor(public registerP: RegistrationProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // login(){
  //   this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
  //   .then(data =>{
  //     console.log('Got some data:', this.fire.auth.currentUser);
  //     this.alert('You are Logged In!');
  //       //user is logged in!
  //     this.navCtrl.push(HomePage);     
  //   }).catch(error=>{
  //     console.log('Got an Error', error);
  //     this.alert(error.message);

  //   });
  //   this.email.value = "",
  //   this.password.value = ""
  // }

  login() {
    let username = {

      email: this.email,
      password: this.password,
    }
    this.registerP.login(username).subscribe(data => {
      this.show = data.msg;
      if(data.msg.email == username.email && data.msg.password == username.password){
        this.alertCtrl.create({
          title: 'Welcome',
          subTitle: 'Logged In Successfully!',
          buttons: ['OK']
        }).present();
        this.navCtrl.push(HomePage);
      } else{
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: 'User not registered!',
          buttons: ['OK']
        }).present();
      }     
    });
    
    this.email = "",
    this.password = ""
  }

  openRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
