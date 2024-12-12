import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AcccountService } from '../_services/acccount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  private accountServices = inject(AcccountService);
  private toastr=inject(ToastrService);
  // userFromHomeComponent=input.required<any>();
  cancelRegister = output<boolean>();
  register() {
    this.accountServices.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
