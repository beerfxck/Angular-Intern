import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { FolllowerComponent } from './folllower/folllower.component';
import { FollowingsComponent } from './followings/followings.component';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    FolllowerComponent,
    FollowingsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
