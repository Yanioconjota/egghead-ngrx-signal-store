import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeStore } from './employee-store';

@Component({
  selector: 'employee-page',
  standalone: true,
  imports: [
    RouterModule,
  ],
  providers: [EmployeeStore],
  template: `
<h1>Our Employees</h1>
<router-outlet></router-outlet>
  `,
  styles: [``]
})
export class EmployeePageComponent {
}
