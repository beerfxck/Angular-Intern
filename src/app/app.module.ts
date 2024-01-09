import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { FolllowerComponent } from './folllower/folllower.component';
import { FollowingsComponent } from './followings/followings.component';
import { ApiService } from './service/api.service';
import { NumberFormatPipe } from './pipe/numberformat.pipe';
import { LoadingInterceptor } from './interceptor/loading-interceptor';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

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
    AppRoutingModule
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
