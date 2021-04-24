import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: User = {id: null, name: null, password: null}
  registerUser: User = {id: null, name: null, emailid: null, password: null,
  role: "user"}
  forgetUser: User = {id: null, name: null, emailid: null, password: null}

  loginerror: string = null
  registererror: string = null
  forgeterror: string = null

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.loginUser).subscribe(
      (user) => {
        this.loginUser = user
        console.log(this.loginUser)
        this.redirect(this.loginUser)
      },
      (errResponse) => {
        console.log(errResponse)
        this.loginerror = errResponse.error.Message
      }
    )
  }

  register(){
    this.userService.register(this.registerUser).subscribe(
      (user) => {
        this.registerUser = user
        console.log(this.registerUser)
        this.redirect(this.registerUser)
      },
      (errResponse) => {
        console.log(errResponse)
        this.registererror = errResponse.error.Message
      }
    )
  }

  forget(){
    this.userService.forgetPassword(this.forgetUser).subscribe(
      (msg) => {
        this.forgeterror = msg
      },
      (errResponse) => {
        console.log(errResponse)
        this.forgeterror = errResponse.error.Message
      }
    )
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
