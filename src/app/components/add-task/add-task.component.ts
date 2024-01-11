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
      topic: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Replace '/' with the desired route to navigate back
  }

  submitForm(): void {
    if (this.taskForm.valid) {
      // Perform actions with the form data, such as saving it
      console.log('Form submitted successfully:', this.taskForm.value);
    }
  }
}
