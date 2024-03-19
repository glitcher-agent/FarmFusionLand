import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  storename: string | undefined; // Define the storename property

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      storename: ['', Validators.required],
      productname: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  updatecollection(){
    const formData = this.updateForm.value;
    this.authService.updateCollectionService(formData)
    .subscribe({
      next:(res)=>{
        alert("product is updated");
        this.updateForm.reset();
      },
      error:(err)=>{ 
        console.log(err)
      }
    })
  }

}
