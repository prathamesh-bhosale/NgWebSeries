import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as CanvasJS from './../../../assets/js/canvasjs.min.js';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

    let datapoints = [
      { y: 71, label: "Crime" },
      { y: 55, label: "Suspense" },
      { y: 50, label: "Comedy" },
      { y: 65, label: "Romantic" },
      { y: 95, label: "Horror" },
      { y: 68, label: "Science Fiction" },
      { y: 28, label: "Thriller" },
      { y: 34, label: "Family" },
      { y: 14, label: "Kids" }
    ];

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Genrewise views report"
      },
      data: [{
        type: "column",
        dataPoints: datapoints
      }]
    });

    chart.render();
  }
}
