import { Component, OnInit, ElementRef, ViewChild, inject, Renderer2 } from '@angular/core';
import { CartService } from '../../services/checkout.service';
import { ProductsComponent } from '../products/products.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { checkServerIdentity } from 'tls';

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports:[RouterLink, CommonModule, ProductsComponent, CheckoutComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  cartService= inject(CartService);
  router=inject(Router);

  @ViewChild('button') button!: ElementRef;

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  ngAfterViewInit(): void {
    this.setupButtonClick();
  }

  setupButtonClick(): void {
    this.button.nativeElement.addEventListener('click', (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;

      if (!button.classList.contains('delete')) {
        button.classList.add('delete');
        setTimeout(() => button.classList.remove('delete'), 1200);
      }
      event.preventDefault();
    });
}

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  checkedOut = false;

  onButtonClick() {
    this.checkedOut = !this.checkedOut;
    alert("Your Order is Successfull");
    this.router.navigate(['home']);
  
  }
    
}
