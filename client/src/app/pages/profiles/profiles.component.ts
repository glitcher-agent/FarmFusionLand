import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profiles } from './profiles';
import { Console } from 'console';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',

})
export class ProfilesComponent implements OnInit {
  router =inject(Router);
  profiles !: Observable<Profiles[]>
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.getcollection(); 
  }
  getcollection(){
    this.profiles = this.authService.getCollectionService()
  }
}


