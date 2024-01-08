import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  taskId!: number; 
  taskDetails: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; 
  
      this.http.get(`http://103.13.31.37:17444/api/tasks/${this.taskId}`)
        .subscribe((data: any) => {
          this.taskDetails = data;
  
        });
    });
  }
  

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
