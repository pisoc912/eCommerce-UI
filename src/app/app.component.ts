import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Order-UI';
  isSeller : boolean = false;
  isLogged:boolean=false

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isLogged = user !== null;
    this.isSeller = user?.role === 'SELLER'
  }
}
