// import { Component, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationProvider } from '../../providers/registration/registration';
// import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // @ViewChild('name') name;
  // @ViewChild('surname') surname;
  // @ViewChild('email') email;
  // @ViewChild('password') password;
  // @ViewChild('contact') contact;
  // @ViewChild('address') address;
  name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  show = "";

  // constructor(private fire: AngularFireAuth, public registerP: RegistrationProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  constructor(public registerP: RegistrationProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  // register(){
  //   console.log("Registered New user!",this.name.value,this.surname.value,this.email.value,this.password.value,this.contact.value,this.address.value);
  //   this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.password.value)
  //   .then(data=>{
  //     console.log('Got data', data);
  //     this.alert('Registered Successfully!');
  //   }).catch(error=>{
  //     console.log('Got an Error',error);  
  //     this.alert(error.message);
  //   });
  //   this.navCtrl.push(LoginPage);

  //   this.name.value = " ",
  //   this.surname.value = " ",
  //   this.email.value =" ",
  //   this.password.value = " ",
  //   this.contact.value = " " ,
  //   this.address.value = " "

  addUser() {
    let user = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address

    }
    this.registerP.addUser(user).subscribe(data => {
      this.show = data.msg;
      this.alertCtrl.create({
        title: 'Info!',
        subTitle: 'Registered Successfully!',
        buttons: ['OK']
      }).present();
    });
    this.navCtrl.push(LoginPage);


    this.name = "",
      this.email = "",
      this.password = "",
      this.phone = "",
      this.address = ""
  }
}
