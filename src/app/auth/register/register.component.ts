import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isSeller: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CUSTOMER', [Validators.required]],
    });
  }


  onSubmit(){
    if(this.registerForm.valid){
      const formData = this.registerForm.value;
      this.authService.register(formData).subscribe({
        next:(res)=>{
          console.log("response",res);
        }
      })
      console.log('Registration data', formData);
      this.router.navigate(['/login'])
    } else{
      console.error('Form is invalid')
    }
  }
}
