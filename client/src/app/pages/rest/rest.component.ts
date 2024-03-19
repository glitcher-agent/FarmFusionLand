import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rest',
  standalone: true,
  imports: [CommonModule, RestComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './rest.component.html',
  styleUrl: './rest.component.scss'
})
export class RestComponent implements OnInit {
  fb = inject(FormBuilder);

  resetForm !: FormGroup;
  toastr = inject(ToastrService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService=inject(AuthService);
  token!: string;
  
  ngOnInit(): void {
    this.resetForm =this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token)
    });
  }


  submit(){
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next: (res)=>{
        this.toastr.success(res);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err)=>{
        this.toastr.warning(err.error.message);
      }
    })

  }
}
