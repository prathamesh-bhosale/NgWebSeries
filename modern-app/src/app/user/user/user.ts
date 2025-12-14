import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class UserComponent implements OnInit {

  private router = inject(Router);
  user: User | null = null;

  constructor() {
    const userStr = localStorage.getItem("user");
    if(userStr) {
      this.user = JSON.parse(userStr);
    }
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
