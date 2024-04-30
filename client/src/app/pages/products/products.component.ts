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
  imageUrls: { [key: string]: string } = {
    'okra': 'https://as1.ftcdn.net/v2/jpg/00/17/24/66/1000_F_17246660_v9YMU5pOrBp3Hn18r07y9XuO3M2MyBBj.jpg',
    'tomato': 'https://t4.ftcdn.net/jpg/03/27/96/23/360_F_327962332_6mb5jQLnTOjhYeXML7v45Hc5eED2GYOD.jpg',
    'cauli flower': 'https://as2.ftcdn.net/v2/jpg/00/61/61/51/1000_F_61615152_0QCGxkDlRQVSSXlH1SO2ZoiW7L0C1yvs.jpg',
    'brinjal': 'https://t3.ftcdn.net/jpg/06/68/58/80/360_F_668588096_i6B1lKhuqx8KVHo4SBrvIcOEeC22GHDY.jpg',
    'potato': 'https://as2.ftcdn.net/v2/jpg/02/07/45/47/1000_F_207454727_u0PwgfySpifkkCS3RJg5XjG4DmtfUDaF.jpg',
    'red onion': 'https://t4.ftcdn.net/jpg/01/04/49/81/360_F_104498107_BGnHkwJnKYonPOLUJ8RHJAgha5iF3fY5.jpg',
    'sweet onion': 'https://t3.ftcdn.net/jpg/00/55/63/16/360_F_55631648_mAPu37JG8NAG71A3TrVvTLD0NMLtS2U5.jpg',
    'carrot': 'https://t4.ftcdn.net/jpg/07/28/00/23/360_F_728002393_wUYScbJCFpYJfQRP9A0B4mr182ab9Wh9.jpg',
    'beetroot': 'https://as1.ftcdn.net/v2/jpg/01/78/30/86/1000_F_178308611_IlmIKscnChQa7ykTW9pDttqw7Mrumnvu.jpg',
    'cabbage': 'https://t3.ftcdn.net/jpg/02/71/01/22/360_F_271012292_5K2Woa1luhxDozTgR34dPhsZi2nrSEmN.jpg',
    'capsicum': 'https://as1.ftcdn.net/v2/jpg/02/96/88/26/1000_F_296882668_sbiqYa5KrXOwDzvN91JTHjsx4Zs5nZHV.jpg',
    'beans': 'https://as1.ftcdn.net/v2/jpg/00/35/82/08/1000_F_35820852_675dRoqsMCU8xoJkxseYlAlXhOEn1fWx.jpg',
    'bitter gourd': 'https://t4.ftcdn.net/jpg/04/89/23/57/360_F_489235725_bfNmQJNHKzCyScLGEIIhiX0PvUXEgd9Z.jpg',
    'bottle gourd': 'https://as1.ftcdn.net/v2/jpg/00/68/89/58/1000_F_68895813_0HGYWdX72TKN5iWMm3HHrWG26NzWVyPM.jpg',
    'cucumber': 'https://as2.ftcdn.net/v2/jpg/02/66/68/37/1000_F_266683754_wzx9XxeNXKudct2Q3qwQf1PvVaQaKOf6.jpg',
    'drumstick': 'https://t3.ftcdn.net/jpg/05/85/66/68/360_F_585666841_9PNi8WG6rn45vYLY54YZGvxLblBVkAvh.jpg',
    'green chilli': 'https://t3.ftcdn.net/jpg/05/92/33/36/360_F_592333635_5VKxPqhR6xrjfjbV2r78kLhxTUFNU6cw.jpg',
    'lemon': 'https://t3.ftcdn.net/jpg/02/54/26/16/360_F_254261696_484qlllePzVLFSPCOxHWwJYpSlydUyLP.jpg',
    // Add more products and their respective image URLs here
  };



  getImageUrl(productName: string): string {
    // Convert the product name to lowercase for case-insensitive matching
    const lowercaseProductName = productName.toLowerCase();
    // Check if the product name exists in the imageUrls mapping
    if (this.imageUrls.hasOwnProperty(lowercaseProductName)) {
      // Return the corresponding image URL
        return this.imageUrls[lowercaseProductName];
      //return this.imageUrls[lowercaseProductName];
    } else {
      // If no matching image URL found, return a default image URL or handle the case accordingly
      return 'D:\Users\revan\Downloads\projectfinal\project1\project1\logo.png';
    }
  }
}


