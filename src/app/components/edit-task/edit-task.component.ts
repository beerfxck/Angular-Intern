import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalTask } from 'src/app/shared/interface/Task-Local';
import { Location } from '@angular/common'

// import statements...

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  
  taskForm!: FormGroup;
  taskInfo: any = { topic: '', description: '' };
  tasksLocal: LocalTask[] = [];
  id!: number;

  private location = inject(Location);
  private _activatedRoute = inject(ActivatedRoute);

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

  this._activatedRoute.queryParams.subscribe(params => {
      this.id = +params['id']; // ใส่เครื่องหมาย + เพื่อแปลงเป็น number
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
    this.router.navigate(['/']);
  }

  editSuccess(): void {
     // ตรวจสอบว่า validateForm ถูกต้อง
  if (this.taskForm && this.taskForm.valid) {
    // ดึงข้อมูลทั้งหมดจาก Local Storage
    const storageData = localStorage.getItem('task');

    if (storageData) {
        const tasks: LocalTask[] = JSON.parse(storageData);

        // ค้นหา index ของ task ที่ตรงกับ ID ที่ต้องการแก้ไข
        const taskIndex = tasks.findIndex(task => task.id === this.id);

        if (taskIndex !== -1) {
            // แก้ไขข้อมูล topic และ description ใน tasks ด้วยค่าจาก validateForm
            tasks[taskIndex].topic = this.taskForm.value.topic;
            tasks[taskIndex].description = this.taskForm.value.description;

            // กำหนดเวลาที่แก้ไขใน properties date
            tasks[taskIndex].date = new Date().toISOString();

            // บันทึกข้อมูลทั้งหมดลงใน Local Storage
            localStorage.setItem('task', JSON.stringify(tasks));

            // clear tasksLocal
            this.tasksLocal = [];
            this.router.navigate(['/profile'])
            alert('แก้ไข Task เสร็จสิ้น');
        } else {
            console.error('ไม่พบ Task ที่ตรงกับ ID ที่ต้องการแก้ไข');
        }
    } else {
        console.error('ไม่พบข้อมูลทั้งหมด');
    }
} else {
    console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
}
}
}

