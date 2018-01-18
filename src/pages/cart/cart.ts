import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  saman : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.storage.get('item').then((val) => {
      console.log('Your item is', val);
      this.saman = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

    this.storage.get('item').then((val) => {
      console.log('Your item is', val);
      this.saman = val;
    });
  }

  delete(product){
 
    //Remove locally
      let index = this.saman.indexOf(product);
 
      if(index > -1){
        this.saman.splice(index, 1);
      }  
 
    //Remove from database
    // this.reviewService.deleteReview(product._id);
  }
 
}
