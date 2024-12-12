import { Component, inject } from '@angular/core';
import { AcccountService } from '../_services/acccount.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountservice = inject(AcccountService);
  private router = inject(Router);
  private toastr=inject(ToastrService);
  model: any = {};
  login() {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        console.log(response);
      },
      error: error =>this.toastr.error(error.error)

    })
  }
  logout() {
    this.accountservice.logout();
    this.router.navigateByUrl('/');
  }
}
