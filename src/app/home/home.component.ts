import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

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
        this.profileData = this.convertNumbers(data);
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

  private convertNumbers(data: any): any {
    if (data.followers >= 1000) {
      data.followers = (data.followers / 1000) + 'K';
    }

    if (data.following >= 1000000000) {
      data.following = (data.following / 1000000000) + 'B';
    }

    return data;
  }
}
