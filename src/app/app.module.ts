import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CartPage } from '../pages/cart/cart';
import { RegistrationProvider } from '../providers/registration/registration';

/*const firebaseAuth = {
  apiKey: "YourApiKey",
  authDomain: "Domain",
  databaseURL: "DatabaseURL",
  projectId: "ProjectID",
  storageBucket: "StorageBucket",
  messagingSenderId: "ID"
};*/

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseAuth),
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegistrationProvider
  ]
})
export class AppModule {}
