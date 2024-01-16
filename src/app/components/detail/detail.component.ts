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
  tasksLocal: LocalTask[] = [];
  task!: Task;

  private _activatedRoute = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private router = inject(Router);


  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.idtask = +params['id']; 

    //   this.apiService.getTaskById(this.idtask)
    //     .subscribe((data: any) => {
    //       this.taskDetails = data;
    //     });
    // });

    this._activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.getTaskById(Number(id));
    });
  }

  getTaskById(id: number): void {
    // ดึงข้อมูลทั้งหมดจาก Local Storage
    console.log('Calling getTaskById with ID:', id);
    const storedData = localStorage.getItem('task');
    console.log('Stored Data from localStorage:', storedData);
  
    if (storedData) {
        const tasks: LocalTask[] = JSON.parse(storedData);
  
        // ค้นหา task ที่ตรงกับ ID ที่รับมา
        const foundTask = tasks.find(task => task.id === id);
  
        if (foundTask) {
            // ตั้งค่าฟอร์ม validateForm ด้วยข้อมูลที่ได้
            console.log('Found Task:', foundTask);
            // ตั้งค่า tasksLocal ด้วยข้อมูลที่ได้
            this.tasksLocal = [foundTask];
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
