import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { FolllowerComponent } from './components/folllower/folllower.component';
import { FollowingsComponent } from './components/followings/followings.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'follower', component: FolllowerComponent }, 
  { path: 'followings', component: FollowingsComponent }, 
  { path: 'add-task', component: AddTaskComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
