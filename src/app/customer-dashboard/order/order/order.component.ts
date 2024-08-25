import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  userId!: number;
  orders: Order[] = [];
  user:User|null=null;
  constructor(
    private route:Router,
    private orderService: OrderService) {}
  ngOnInit(): void {
        const userData = localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;
        if (this.user) {
          this.userId = this.user.id!;
        }
    if (this.userId !== 0) {
      this.orderService.getOrderByUserId(this.userId).subscribe({
        next: (orders: Order[]) => {
          this.orders = orders.map((order) => ({
            ...order,
            orderItems: order.orderItems,
          }));
          console.log('orders',orders);
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
        },
      });
    } else {
      console.log('User is not logged in');
    }
  }

  getOrderDetails(orderId: number): void {
    console.log('click', orderId);
    this.route.navigate(['/order-detail',orderId])
  }
}
