import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileData: any;
  tasks: any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProfile()
      .subscribe((data: any) => {
        this.profileData = data;
      });

    this.apiService.getTasks()
      .subscribe((data: any) => {
        this.tasks = data;
      });
  }

  goToFollowerPage(): void {
    this.router.navigate(['/follower']);
  }

  goToFollowingsPage(): void {
    this.router.navigate(['/followings']);
  }

  goToTaskDetailPage(idtask: number): void {
    this.router.navigate(['/detail', idtask], {
      queryParams: {
        id_task: idtask
      }
    });
  }

  goToAddTaskPage(): void {
    this.router.navigate(['/add-task']); 
  }

  editTask(taskId: number): void {
    this.router.navigate(['/edit-task', taskId]);
  }

  deleteTask(taskId: number): void {

  }

}
