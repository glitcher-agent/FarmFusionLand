import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/checkout.service';

import { ProductsComponent } from '../products/products.component';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-paymnetinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paymnetinfo.component.html',
  styleUrl: './paymnetinfo.component.scss'
})
export class PaymnetinfoComponent {
  cartService= inject(CartService);
  router=inject(Router);
  checkedOut = false;

  onButtonClick() {
    this.checkedOut = !this.checkedOut;
   alert("Your Order is Successfull");
    this.router.navigate(['home']);
    this.cartService.removeAllCartItems();
  
  }
  backtoCart(){
    this.router.navigate(['checkout']);
  }
 
}

