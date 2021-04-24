import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log(this.user)

    if(this.user == null || this.user.role != "admin")
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
