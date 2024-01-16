import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalTask } from 'src/app/shared/interface/Task-Local';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  
  taskForm!: FormGroup;
  tasksLocal: LocalTask[] = [];
  id!: number;

  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      topic: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      topic: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null, Validators.required),
  });

  this.activatedRoute.queryParams.subscribe(params => {
      this.id = +params['id']; 
      console.log("Received ID:", this.id, typeof this.id);

      this.getTaskInfo(this.id);
  });
}

  getTaskInfo(id: number): void {
    console.log('Calling getTaskById with ID:', id);
    const storedData = localStorage.getItem('task');

    if (storedData) {
      const tasks: LocalTask[] = JSON.parse(storedData);

      const foundTask = tasks.find(task => task.id === id);

      if (foundTask) {
        console.log('Found Task:', foundTask);
        this.taskForm.patchValue({
          topic: foundTask.topic,
          description: foundTask.description
        });

        this.tasksLocal = [foundTask];
      } else {
        console.error('Task with specified ID not found');
      }
    } else {
      console.error('No data found in localStorage');
    }
  }

  goBack(): void {
    this.location.back();
  }

  editSuccess(): void {
    // ตรวจสอบว่า validateForm ถูกต้อง
    if (this.taskForm && this.taskForm.valid) {
      // แสดง alert ยืนยันการแก้ไข
      const userConfirmation = confirm('คุณต้องการแก้ไข Task นี้หรือไม่?');
  
      if (userConfirmation) {
        // ดำเนินการแก้ไข Task
        const storageData = localStorage.getItem('task');
  
        if (storageData) {
          const tasks: LocalTask[] = JSON.parse(storageData);
  
          const taskIndex = tasks.findIndex(task => task.id === this.id);
  
          if (taskIndex !== -1) {
            tasks[taskIndex].topic = this.taskForm.value.topic;
            tasks[taskIndex].description = this.taskForm.value.description;
            tasks[taskIndex].date = new Date().toISOString();
  
            localStorage.setItem('task', JSON.stringify(tasks));
  
            this.tasksLocal = [];
            this.router.navigate(['/']);
            alert('แก้ไข Task เสร็จสิ้น');
          } else {
            console.error('ไม่พบ Task ที่ตรงกับ ID ที่ต้องการแก้ไข');
          }
        } else {
          console.error('ไม่พบข้อมูลทั้งหมด');
        }
      } else {
        // User chose not to edit, you can handle this case accordingly
        console.log('User canceled the edit operation.');
      }
    } else {
      console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
  
}

