import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-switch',
  templateUrl: './auth-switch.component.html',
  styleUrls: ['./auth-switch.component.css']
})
export class AuthSwitchComponent {
  isLogin:boolean = true;
  toggleForm(){
    this.isLogin = !this.isLogin
  }
}
