import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/checkout.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = false;
  storedValue: string = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.isloggedin$.subscribe(isLoggedIn => {
        this.isLoggedin = isLoggedIn;
        const retrievedValue = localStorage.getItem('username');
        if (retrievedValue !== null && retrievedValue.trim() !== '') {
          this.storedValue = retrievedValue;
        } else {
          this.storedValue = isLoggedIn ? "User" : "User";
        }
      });
    }
    this.getCartItemCount();
  }
  

  cartItemCount: number = 0;

  getCartItemCount(): number {
    return this.cartService.getCartItemCount()
    }


  logout(): void {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    this.authService.isloggedin$.next(false);
    
  }
}