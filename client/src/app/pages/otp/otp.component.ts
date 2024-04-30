import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  check() {
    // Retrieve the OTP entered by the user from the form input
    const enteredOTP = this.otpForm.value.otp;
  
    // Retrieve the OTP stored in the local storage
    const storedOTP = localStorage.getItem("otp");
    console.log(storedOTP,enteredOTP);
  
    // Check if both OTPs are present and match
    if (Number(enteredOTP)  === Number(storedOTP)) {
      this.router.navigate(['home']);
      this.toastr.success("Login Success");

      
    } else {
      this.toastr.error("OTP is not valid or expired");
      
    }
  }
  
}
