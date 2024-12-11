import { Component, inject } from '@angular/core';
import { AcccountService } from '../_services/acccount.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
   accountservice = inject(AcccountService);
  
  model: any = {};
  login() {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        console.log(response);
        
      },
      error: error => console.log(error)

    })
  }
logout(){
 this.accountservice.logout();

}


}
