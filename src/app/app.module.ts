import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './components/detail/detail.component';
import { FolllowerComponent } from './components/folllower/folllower.component';
import { FollowingsComponent } from './components/followings/followings.component';
import { ApiService } from './shared/service/api.service';
import { NumberFormatPipe } from './shared/pipe/numberformat.pipe';
import { LoadingInterceptor } from './shared/interceptor/loading-interceptor';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    FolllowerComponent,
    FollowingsComponent,
    NumberFormatPipe,
    LoadingSpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
