import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false; // Boolean flag to indicate whether the user is an admin

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Call your API service to fetch user data
    if (typeof localStorage !== 'undefined') {
      const role =localStorage.getItem("role")
        // Check if the user's role is not "user"
        if (role !== "user") {
          this.isAdmin = true; // Set isAdmin flag to true
        }
    }
  }
}
