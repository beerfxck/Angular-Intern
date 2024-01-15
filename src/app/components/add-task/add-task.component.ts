// add-task.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  private router = inject(Router);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      topic: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null, Validators.required),
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  createTask(): void {
    if (this.taskForm.valid) {
      const storageData = localStorage.getItem("task");
      let existingData = storageData ? JSON.parse(storageData) : [];
      const idtask = existingData.length + 1;

      const newData = {
        id: idtask,
        ...this.taskForm.value, 
        date: new Date().toISOString(),
      };

      existingData = existingData.concat(newData);

      localStorage.setItem("task", JSON.stringify(existingData));

      this.router.navigate(['/']);
      alert("Create Task complete!");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  }
}
