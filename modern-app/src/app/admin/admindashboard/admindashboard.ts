import { Component, OnInit } from '@angular/core';

// import * as CanvasJS from './../../assets/js/canvasjs.min.js';
// We use global CanvasJS
declare var CanvasJS: any;

@Component({
  selector: 'app-admindashboard',
  imports: [],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css'
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

    // Dummy data or fetch from API?
    // Legacy code used hardcoded dataPoints.
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

    if (typeof CanvasJS !== 'undefined') {
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
    } else {
      console.warn('CanvasJS is not loaded');
    }
  }
}
