import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folllower',
  templateUrl: './folllower.component.html',
  styleUrls: ['./folllower.component.css']
})
export class FolllowerComponent {

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }
}
