import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);

  loginUser: User = new User(0, '', '');
  registerUser: User = new User(0, '', '', '', 'user');
  forgetUser: User = new User(0, '', '', '');

  loginerror: string | null = null;
  registererror: string | null = null;
  forgeterror: string | null = null;

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.loginUser).subscribe({
      next: (user) => {
        this.loginUser = user
        console.log(this.loginUser)
        this.redirect(this.loginUser)
      },
      error: (errResponse) => {
        console.log(errResponse)
        this.loginerror = errResponse.error.Message
      }
    })
  }

  register(){
    this.userService.register(this.registerUser).subscribe({
      next: (user) => {
        this.registerUser = user
        console.log(this.registerUser)
        this.redirect(this.registerUser)
      },
      error: (errResponse) => {
        console.log(errResponse)
        this.registererror = errResponse.error.Message
      }
    })
  }

  forget(){
    this.userService.forgetPassword(this.forgetUser).subscribe({
      next: (msg) => {
        this.forgeterror = msg
      },
      error: (errResponse) => {
        console.log(errResponse)
        this.forgeterror = errResponse.error.Message
      }
    })
  }

  redirect(user: User){

    localStorage.setItem("user", JSON.stringify(user))

    if(user.role == "admin")
    {
      this.router.navigate(['/admin'])
    }
    else
    {
      this.router.navigate(['/user'])
    }
  }
}
