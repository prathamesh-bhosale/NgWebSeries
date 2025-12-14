import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log(this.user)

    if(this.user == null || this.user.role != "user")
    {
      this.logout()
    }
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("user")
    this.router.navigate(['/common/login'])
  }


}
