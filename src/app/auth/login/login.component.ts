import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  errorMsg:string | null = null;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){
    this.loginForm = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            console.log(JSON.stringify(response));
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/']).then(()=>{
              window.location.reload()
            });
          },
          error: (err) => (this.errorMsg = 'Invalid email or password'),
        });
    }
  }

}
