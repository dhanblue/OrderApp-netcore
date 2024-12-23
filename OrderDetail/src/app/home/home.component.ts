import { Component} from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent   {

registerModel=false;
 
 
registerToggle(){
  this.registerModel=!this.registerModel;
}
cancelRegisterMode(event:boolean){
  this.registerModel=event;

}
 
}
