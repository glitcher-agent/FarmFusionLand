import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService =inject(AuthService);
  router =inject(Router);
  loginForm !: FormGroup;
  toastr = inject(ToastrService);
  

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  
  }

  login(){
    //console.log("woking");
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Please verify your Login');
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("username", res.data.userName);
        localStorage.setItem("role", res.data.roles[0].role);
        this.authService.isloggedin$.next(true);
        const otp = Math.floor(100000 + Math.random() * 900000);
        this.authService.sendOTPByEmail(this.loginForm.value.email, otp)
        .subscribe({
          next: (res)=>{
            this.toastr.success(res);

          },
          error: (err)=>{
            this.toastr.error(err.error);
          }
        });
        localStorage.setItem('otp', String(otp));
        this.router.navigate(['otp']);
        this.loginForm.reset();
      },
      error:(err)=>{ 
        this.toastr.error(err.error); 
      }
    })
  }

}
