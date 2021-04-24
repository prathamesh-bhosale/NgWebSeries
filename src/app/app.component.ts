import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year: number = new Date().getFullYear();
  name:string = "Prathamesh Bhosale"
  title = 'NgWebSeries';
}
