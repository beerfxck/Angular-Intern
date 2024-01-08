import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  idtask!: number; 
  taskDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService  
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idtask = +params['id']; 

      this.apiService.getTaskById(this.idtask)
        .subscribe((data: any) => {
          this.taskDetails = data;
        });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
