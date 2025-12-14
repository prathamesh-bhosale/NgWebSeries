import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {

  private router = inject(Router);
  user: User | null = null;

  constructor() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
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
