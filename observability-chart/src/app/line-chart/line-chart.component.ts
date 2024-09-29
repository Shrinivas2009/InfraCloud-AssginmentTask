import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  // Data from the task
  data = [
    { endpoint: "/home", time: '2023-10-08T02:18:17.735Z', requests: 2364, special: true },
    { endpoint: "/home", time: '2023-10-07T02:23:17.735Z', requests: 1132 },
    { endpoint: "/home", time: '2023-10-06T02:03:17.735Z', requests: 3433, special: true },
    { endpoint: "/product", time: '2023-10-07T02:13:17.735Z', requests: 1563 },
    { endpoint: "/product", time: '2023-10-06T02:12:17.735Z', requests: 1563 },
    { endpoint: "/contact", time: '2023-10-07T02:13:17.735Z', requests: 2298, special: true },
    { endpoint: "/product", time: '2023-10-08T02:17:17.735Z', requests: 3198, special: true },
    { endpoint: "/contact", time: '2023-10-08T02:13:17.735Z', requests: 1950, special: true },
    { endpoint: "/contact", time: '2023-10-06T02:01:17.735Z', requests: 2800 }
  ];


  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      }
    ]
  };

  // Define the chart options
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  chartData: any[] = [];
  chartLabels: string[] = [];

  ngOnInit() {
    this.prepareChartData();
  }

  prepareChartData() {
    const endpoints = Array.from(new Set(this.data.map(item => item.endpoint))); // Get unique endpoints
    const times = Array.from(new Set(this.data.map(item => moment(item.time).format('MMM DD, YYYY')))); // Format times

    this.chartLabels = times;

    endpoints.forEach(endpoint => {
      const endpointData = this.data
        .filter(item => item.endpoint === endpoint)
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

      const requests = endpointData.map(item => item.requests);

      this.chartData.push({
        data: requests,
        label: endpoint
      });
    });
  }

  filterSpecial() {
    this.chartData = [];
    const specialData = this.data.filter(item => item.special);

    const endpoints = Array.from(new Set(specialData.map(item => item.endpoint)));
    const times = Array.from(new Set(specialData.map(item => moment(item.time).format('MMM DD, YYYY'))));

    this.chartLabels = times;

    endpoints.forEach(endpoint => {
      const endpointData = specialData
        .filter(item => item.endpoint === endpoint)
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

      const requests = endpointData.map(item => item.requests);

      this.chartData.push({
        data: requests,
        label: endpoint
      });
    });
  }
}
