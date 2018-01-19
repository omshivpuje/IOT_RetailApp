import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};
  // saman : any;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    this.storage.set('item',[]);
  }

  async scanBarcode(){
    this.options={
      prompt: 'scan a barcode to see the results!!'
    }
    this.results = await this.barcodeScanner.scan(this.options);
    console.log(this.results);
  }

  async encodeData(){
    this.results = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "Omprakash Shivpuje");
  }

  setData(entry){
    this.storage.get('item').then((val) => {
      console.log('Your item is', val);  
      val.push(entry);
      this.storage.set('item',val);
      });
    }

  // getData(){
  //   this.storage.get('item').then((val) => {
  //     console.log('Your item is', val);
  //     this.saman = val;
  //    });
  // }  
  
  openCartPage(){
    this.navCtrl.push(CartPage); 
    this.results = " ";
  }
}
