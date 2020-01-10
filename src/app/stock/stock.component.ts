import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { StockService } from '@services/stock.service';
import { forkJoin } from 'rxjs';
import { transformData } from '@utils/util';
import { IIndex } from '../index/index.component';

@Component({
  selector: 'st-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  chart: Highcharts.Chart;
  options: Highcharts.SeriesOptionsType[] = [
    {
      name: '昨日',
      type: 'line',
      color: 'blue',
      data: []
    },
    {
      name: '今日',
      type: 'line',
      color: 'red',
      data: []
    }
  ];
  code: string;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.chart = Highcharts.stockChart('stock', {
      rangeSelector: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      title: {
        text: '量能变化图'
      },
      yAxis: {
        labels: {
          formatter: function() {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [
          {
            value: 0,
            width: 2,
            color: 'silver'
          }
        ]
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },
      series: this.options
    });
  }

  getStock() {
    this.chart.showLoading();
    forkJoin(
      this.stockService.getYestodayData(this.code),
      this.stockService.getTodayData(this.code)
    ).subscribe(([yestodayData, todayData]) => {
      this.chart.hideLoading();
      yestodayData = transformData(yestodayData as IIndex[], 10000);
      todayData = transformData(todayData as IIndex[], 10000);
      this.options[0]['data'] = yestodayData;
      this.options[1]['data'] = todayData;
      this.chart.update({
        series: this.options
      });
    });
  }
}
