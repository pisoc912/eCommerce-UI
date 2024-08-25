import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-seller-nav',
  templateUrl: './seller-nav.component.html',
  styleUrls: ['./seller-nav.component.css']
})
export class SellerNavComponent {
  constructor(
    private router:Router,
    public authService:AuthService){}
  logout(){
    this.authService.logout()
    this.router.navigate(["/"]).then(()=>{
      window.location.reload()
    })
  }
}
