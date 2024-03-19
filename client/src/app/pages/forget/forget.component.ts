import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {

  fb = inject(FormBuilder);
  authService =inject(AuthService);
  toastr = inject(ToastrService);
  forgetForm !: FormGroup;
  
  ngOnInit(): void {
    this.forgetForm =this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  forget(){
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next: (res)=>{
        this.toastr.success(res);
        this.forgetForm.reset();
      },
      error: (err)=>{
        this.toastr.error(err.error);
      }
    })
  }
}
