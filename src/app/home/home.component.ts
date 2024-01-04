// home.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Task {
  id: number;
  name: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileData: any;
  tasks: Task[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
   
    this.http.get('http://103.13.31.37:17444/api/my/profile')
      .subscribe((data: any) => {
        this.profileData = this.convertNumbers(data);
      });

   
    this.http.get<any[]>('http://103.13.31.37:17444/api/tasks')
      .subscribe(
        (data) => {
          
          this.tasks = data.map(item => ({
            id: item.id,
            name: item.name,
            date: item.date,
            description: item.description,
          }));
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
  }

  goToFollowerPage(): void {
    this.router.navigate(['/follower']);
  }

  goToFollowingsPage(): void {
    this.router.navigate(['/followings']);
  }

  private convertNumbers(data: any): any {

    if (data.followers >= 1000) {
      data.followers = (data.followers / 1000).toFixed(1) + 'K';
    }

    if (data.following >= 1000000) {
      data.following = (data.following / 1000000000).toFixed(1) + 'B';
    }

    return data;
  }
}
