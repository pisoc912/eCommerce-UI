import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-details.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orderId!: number;
  orderDetail!: OrderDetail;
  shippingFee = 15.0;

  constructor(
    private router: Router,
    private snackBar:MatSnackBar,
    private orderService: OrderService) {}

  ngOnInit(): void {
    const currentUrl = this.router.url; // Get the current URL
    const urlSegments = currentUrl.split('/'); // Split the URL into segments
    const orderIdParam = urlSegments[urlSegments.length - 1]; // Get the last segment

    if (orderIdParam) {
      this.orderId = +orderIdParam;
      this.orderService.getOrderByOrderId(this.orderId).subscribe({
        next: (detail: OrderDetail) => {
          console.log('orderDetail', detail);
          this.orderDetail = detail;
        },
        error: (err) => {
          console.error('Error fetching order details:', err);
        },
      });
    } else {
      console.error('Order ID is not available in the route parameters.');
    }
  }

  goBack() {
    this.router.navigate(['/order']);
  }

  calculateSubtotal() {
    return this.orderDetail.orderTotalPrice;
  }

  calculateTax() {
    return this.calculateSubtotal() * 0.1;
  }

  calculateTotal(){
    return this.calculateSubtotal() + this.calculateTax() + this.shippingFee;
  }

  reorder(orderId:number){
    this.orderService.reorder(orderId).subscribe({
      next:(newOrder)=>{this.snackBar.open("Order reordered successfully",'',{duration:2000})
        console.log('reorder',newOrder);
        this.router.navigate(['/order']);
      },
      error:(err)=>{
        this.snackBar.open(`Error: ${err.message}`,'',{duration:3000})
      }
    })
  }

  cancelOrder(orderId:number){
    console.log('cancel order');
    this.orderService.cancelOrder(orderId).subscribe({
      next:()=>{
        this.snackBar.open("Order canceled successfully",'',{duration:2000})
        this.router.navigate(["/order"])
      },
      error:(err)=>{
        this.snackBar.open(`Error ${err.message}`,'',{duration:3000})
      }
    })
  }
}
