import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../_models/user';
import { AcccountService } from '../_services/acccount.service';

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
  // userFromHomeComponent=input.required<any>();
  cancelRegister = output<boolean>();
  register() {
    this.accountServices.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
