import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SpinnerComponent } from './components/commons/spinner/spinner.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ModalComponent } from './components/commons/modal/modal.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { OfertaComponent } from './components/admin/oferta/oferta.component';
import { LoginComponent } from './components/admin/login/login.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { CurriculumComponent } from './components/admin/curriculum/curriculum.component';
import { StepComponent } from './components/admin/step/step.component';
import { OfferDetailComponent } from './components/admin/offer-detail/offer-detail.component';
import { OfferDialogComponent } from './components/admin/offer-dialog/offer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ModalComponent,
    HeaderComponent,
    OfertaComponent,
    LoginComponent,
    ProfileComponent,
    CurriculumComponent,
    StepComponent,
    OfferDetailComponent,
    OfferDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    NgHttpLoaderModule.forRoot()
  ],
  exports: [
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
