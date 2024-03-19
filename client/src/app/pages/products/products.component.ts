import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Profiles } from '../profiles/profiles';
import { Collection } from 'mongoose';
import { HeaderComponent } from '../../components/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/checkout.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',

})
export class ProductsComponent  {
  products !: Observable<Profiles[]>
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  storename!: string;
  searchKey:string ="";
  toastr = inject(ToastrService);
  constructor(private authService: AuthService, private cartService : CartService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.storename = val['storename'];
      console.log(this.storename)
      
    });
    this.getproducts();
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  getproducts(){
    this.products = this.authService.getProductsService(this.storename);
  }
  addtocart(value: any){
    this.cartService.addtoCart(value);
  }
}


