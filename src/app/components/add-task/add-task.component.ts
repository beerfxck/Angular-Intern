// add-task.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {} // Inject the Router

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      topic: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }

  submitForm(): void {
    if(this.taskForm.valid){
      localStorage.setItem("task",JSON.stringify(this.taskForm.value));
      this.router.navigate(['/'])
      alert("create task success !!");
    } else {
      alert("Please fill tha data :)");
    }
  }
}
