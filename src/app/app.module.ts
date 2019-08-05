import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

import { AuthService } from './services/auth.service';
import { CheckInService } from './services/check-in.service';

// QR scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScannerComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ZXingScannerModule
  ],
  providers: [AuthService, CheckInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
