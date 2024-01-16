import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';
import { LocalTask } from 'src/app/shared/interface/Task-Local';
import { Task } from 'src/app/shared/interface/Task';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  idtask!: number; 
  taskDetails: any;
  localDetail: LocalTask[] = [];
  task!: Task;

  private activatedRoute = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private router = inject(Router);


  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   this.idtask = +params['id'];
  
    //   this.apiService.getTaskById(this.idtask)
    //     .subscribe((data: any) => {
    //       this.taskDetails = data;
    //     });
    // });

    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.getTaskById(Number(id));
    });
  }

  getTaskById(id: number): void {
    // ดึงข้อมูลทั้งหมดจาก Local Storage
    console.log('Calling getTaskById with ID:', id);
    const storageData = localStorage.getItem('task');
    console.log('Stored Data from localStorage:', storageData);
  
    if (storageData) {
        const tasks: LocalTask[] = JSON.parse(storageData);
        const foundTask = tasks.find(task => task.id === id);

        if (foundTask) {
            console.log('Found Task:', foundTask);
            this.localDetail = [foundTask];
        } else {
            console.error('ไม่พบ Task ที่ตรงกับ ID');
        }
       } else {
        console.error('ไม่พบข้อมูลทั้งหมด');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }


}
