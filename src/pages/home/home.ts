import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ModalController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RegistrationProvider } from '../../providers/registration/registration';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;

  options: BarcodeScannerOptions;
  results: {};
  show: {};
  saman: {};
  quantity: any;
 

  constructor(public modalCtrl: ModalController, public registerP: RegistrationProvider, public alertCtrl: AlertController, public menuCtrl: MenuController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {

    this.selectedItem = navParams.get('item');

    this.registerP.getAllItems().subscribe(data => {
      console.log(data);
      this.saman = data.msg;
      console.log(data.msg);

    });
    this.storage.set('item', []);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
    this.registerP.getAllItems().subscribe(data => {
      console.log(data);
      this.saman = data.msg;
      console.log(data.msg);

    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  getItem() {

  }

  async scanBarcode() {
    this.options = {
      prompt: 'scan a barcode to see the results!!'
    }
    this.results = await this.barcodeScanner.scan(this.options);
    console.log(this.results);
  }

  async encodeData() {
    this.results = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "Omprakash Shivpuje");
  }

  setData(entry) {
    
    let alert = this.alertCtrl.create({
      title: entry.itemName,
      message: "Special Price: " + entry.discountedPrice + ' Rs '+ ' Hurry Up!!'+' Only '+entry.quantity +' Remaining \n',
      inputs: [        
        {
          name: "quantity",
          placeholder: "Qty.",

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: data => {
            console.log('Buy clicked');
            this.storage.get('item').then((val) => {
              console.log('Your item is', val);
              
              let saman = {
                barCode: entry,
                quantity: data.quantity
              }
                // console.log(this.barCode);
              console.log(saman);
              this.registerP.purchase(saman).subscribe(data => {
                this.show = data.msg;
                // console.log(data.msg);

                if (this.show == 'item purchased') {
                  val.push(entry);
                  this.storage.set('item', val);
                }

              });
            });
          }
        }
      ]
    });
    alert.present();

    this.results = "";
  }

  showPrompt(newEntry) {
    console.log(newEntry);
    let confirm = this.alertCtrl.create({
      title: newEntry.itemName,
      message: "Special Price: " + newEntry.discountedPrice + ' Rs '+ ' Hurry Up!!'+' Only '+newEntry.quantity +' Remaining ',
      inputs: [        
        {
          name: "quantity",
          placeholder: "Qty.",

        }
      ],
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: data => {
            console.log('Agree clicked');
            this.storage.get('item').then((val) => {
              console.log('Your item is', val);

              let newSaman = {
                barCode: newEntry.barCode,
                quantity: data.quantity
              }
              
              console.log(newSaman);
              this.registerP.purchase(newSaman).subscribe(data => {
                this.show = data.msg;
                console.log(data.msg);
                if (this.show == 'item purchased') {
                  val.push(newEntry);
                  this.storage.set('item', val);
                }
              });
            });
          }
        }
      ]
    });
    confirm.present();
  }

  openCartPage() {
    this.navCtrl.push(CartPage);
    this.results = "";
  }

  // getData(){
  //   this.storage.get('item').then((val) => {
  //     console.log('Your item is', val);
  //     this.saman = val;
  //    });
  // }  
}