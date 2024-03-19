import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService =inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);
  registerForm !: FormGroup;
  
  ngOnInit(): void {
    this.registerForm =this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }

  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('User is created');
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error:(err)=>{ 
        this.toastr.error(err.error);
      }
    })
  }
}
