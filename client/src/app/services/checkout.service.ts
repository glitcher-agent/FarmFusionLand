import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  toastr = inject(ToastrService);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartList = [...this.cartList, ...product];
    this.productList.next(this.cartList);
  }

  addtoCart(product: any) {
    this.cartList.push(product);
    this.productList.next(this.cartList);
    this.getTotalPrice();
    this.toastr.success('Product Added to Cart');
  }

  getTotalPrice(): number {
    return this.cartList.reduce((total, item) => total + Number(item.price), 0);
  }

  removeCartItem(product: any) {
    const index = this.cartList.findIndex((item: any) => product.id === item.id);
  
    if (index !== -1) {
      this.cartList.splice(index, 1);
      this.productList.next(this.cartList);
    }
    this.toastr.warning('Product removed from cart');
  }
  removeAllCartItems() {
    this.cartList = [];
    this.productList.next(this.cartList);
  }

  getCartItemCount(): number {
    return this.cartList.length;
  }
}
