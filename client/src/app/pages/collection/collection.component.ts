import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent {

  fb = inject(FormBuilder);
  authService =inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);
  collectionForm !: FormGroup;

  ngOnInit(): void {
    this.collectionForm =this.fb.group({
      storename: ['', Validators.required],
      productname: ['', Validators.required],
      price: ['', Validators.required],

    });

  }

  collection(){
    this.authService.createCollectionService(this.collectionForm.value)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Store is Created please add products to yor store');
        this.collectionForm.reset();
        this.router.navigate(['profiles']);
      },
      error:(err)=>{ 
        console.log(err);
      }
    })
  }

}
