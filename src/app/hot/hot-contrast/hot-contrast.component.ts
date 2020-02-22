import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HotService } from '@services/hot.service';
import { workTime } from '@utils/util';

export interface ISecurityHot {
  code: string;
  count: number;
  day: string;
}

@Component({
  selector: 'st-hot-contrast',
  templateUrl: './hot-contrast.component.html',
  styleUrls: ['./hot-contrast.component.scss']
})
export class HotContrastComponent implements OnInit {
  chart: Highcharts.Chart;
  options: Highcharts.SeriesOptionsType[] = [
    {
      name: '今日',
      type: 'line',
      color: 'red',
      data: []
    }
  ];
  updateTime: number;

  code: string;

  constructor(
    private hotService: HotService
  ) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.chart = Highcharts.chart('hot', {
      title: {
        text: '当前最火热的股票'
      },
      series: this.options
    });
  }

  getSecurityHot() {
    this.chart.showLoading();
    this.hotService.getSecurityHot(this.code)
      .subscribe((result: ISecurityHot[]) => {
        this.updateTime = Date.now();
        this.chart.hideLoading();
        this.options[0]['data'] = result.map(item => {
          return [item.day, item.count]
        })
        const categories = result.map(item => item.day);
        this.chart.update({
          xAxis: {
            categories: categories
          },
          series: this.options
        });
      }),
      () => { },
      () => {
        this.chart.hideLoading();
        if (workTime()) {
          setTimeout(() => {
            this.getSecurityHot();
          }, 1800000);
        }
      }
  }
}
