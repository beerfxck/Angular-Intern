import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {


  taskForm!: FormGroup;
  taskInfo: any = { topic: '', description: '' };
  private router = inject(Router);

  constructor(private fb: FormBuilder){
    this.taskForm = this.fb.group({
      topic: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getTaskInfo()
  }


  getTaskInfo() {
    const task = localStorage.getItem("tasklist");
    if (task !== null) {
      this.taskInfo = JSON.parse(task);
      if (this.taskForm) {
        this.taskForm.patchValue(this.taskInfo);
      } else {
        console.error('Form is not initialized!');
      }
    } else {
      console.log("ไม่พบข้อมูล");
    }
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }

  editSuccess() {
    if (this.taskForm.valid) {
      localStorage.setItem("task", JSON.stringify(this.taskForm.value));
      this.router.navigate(['/']);
      alert("Edit success");
    }
  }
  
}
