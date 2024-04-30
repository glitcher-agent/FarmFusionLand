
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registeradmin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registeradmin.component.html',
  styleUrl: './registeradmin.component.scss'
})
export class RegisteradminComponent {
  fb = inject(FormBuilder);
  authService =inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);
  registeradminForm !: FormGroup;
  
  ngOnInit(): void {
    this.registeradminForm =this.fb.group({
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
    this.authService.registeradminService(this.registeradminForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('User is created');
        this.registeradminForm.reset();
        this.router.navigate(['login']);
      },
      error:(err)=>{ 
        this.toastr.error(err.error);
      }
    })
  }
}
