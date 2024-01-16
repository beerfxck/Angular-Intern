import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';
import { Task } from 'src/app/shared/interface/Task';
import { LocalTask } from 'src/app/shared/interface/Task-Local';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileData: any;
  task: Task[] = [];
  taskLocal: LocalTask[] = [];
  tasks: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProfile()
      .subscribe((data: any) => {
        this.profileData = data;
      });

    // this.apiService.getTasks()
    //   .subscribe((data: any) => {
    //     this.tasks = data;
    //   });

      this.getTask();

  }

  getTask() {
    const task = localStorage.getItem("task");

    if (task !== null) {
      this.tasks = JSON.parse(task);
      console.log(this.tasks)
    } else {
      console.log("ไม่พบข้อมูล")
    }
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

  goToDetailLocal(idtask: number): void {
    this.router.navigate(['/detail'], {
      queryParams: {
        id: idtask
      }
    });
  }

  goToAddTaskPage(): void {
    this.router.navigate(['/add-task']); 
  }

  editTask(idtask: number): void {
    this.router.navigate(['/edit-task'], {
      queryParams: {
        id: idtask
      }
    });
  }

  deleteTask(idtask: number): void {
    const confirmDelete = window.confirm('ต้องการลบใช่หรือไม่');
  
    if (confirmDelete) {
      const storedTasks = localStorage.getItem('task');
  
      if (storedTasks) {
        const tasks: LocalTask[] = JSON.parse(storedTasks);
  
        const taskIndex = tasks.findIndex(task => task.id === idtask);
  
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          localStorage.setItem('task', JSON.stringify(tasks));
          alert('ลบ Task เสร็จสิ้น');
        } else {
          console.error('ไม่พบ Task ที่ตรงกับ ID ที่ต้องการลบ');
        }
      } else {
        console.error('ไม่พบข้อมูลทั้งหมด');
      }
    } else {
      alert('ยกเลิกการลบ');
    }
  }

}
