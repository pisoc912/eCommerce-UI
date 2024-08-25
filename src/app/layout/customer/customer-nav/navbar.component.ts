import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartNum: number = 0;
  user!: User | null;
  private subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the current user from the AuthService
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      if (this.user.id) {
        this.fetchCartItems();
      }
    } else {
      console.log('User is not logged in');
    }

    this.cartService.getCartItemCount().subscribe((count)=>{
      this.cartNum = count;
    })
  }

  fetchCartItems(): void {
    if (this.user) {
      this.cartService.getCartByUserId(this.user.id!).subscribe({
        next: (cart) => {
          if (cart && cart.cartItems) {
            this.cartNum = cart.cartItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            this.cartService.updateCartItemCount(this.cartNum);
          }
        },
        error: (err) => {
          console.error('Error fetching cart:', err);
        },
      });
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
