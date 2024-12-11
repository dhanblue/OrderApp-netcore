import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

registerModel=false;
httpclient = inject(HttpClient);
users: any;

ngOnInit(): void {
  this.getUsers();
}
registerToggle(){
  this.registerModel=!this.registerModel;
}
cancelRegisterMode(event:boolean){
  this.registerModel=event;

}

getUsers() {
  this.httpclient.get("http://localhost:5000/api/users").subscribe({
    next: response => this.users = response,
    error: error => console.log(error), complete: () => console.log("Request has completed")
  })
}

}
