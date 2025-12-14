import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-common',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './common.html',
  styleUrl: './common.css',
})
export class CommonComponent {

}
