import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { transformData, workTime } from '@utils/util';
import { Subscription, forkJoin } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ChartDefaultOptions } from '../../common/chart.options';
import { IncrService } from '@services/incr.service';

export interface IIncr {
  time: string;
  count: number;
}

@Component({
  selector: 'st-incr-diff',
  templateUrl: './incr-diff.component.html',
  styleUrls: ['./incr-diff.component.scss']
})
export class IncrDiffComponent implements OnInit {

  chart: Highcharts.Chart;
  options: Highcharts.SeriesOptionsType[] = [
    {
      name: '今日',
      type: 'line',
      color: 'red',
      data: []
    },
    {
      name: '昨日',
      type: 'line',
      color: 'blue',
      data: []
    }
  ];

  updateTime: number;

  yestodayData: Subscription;
  todayData: Subscription;
  totalData: Subscription;
  sub: Subscription;

  constructor(private incrService: IncrService) {}
  ngOnInit(): void {
    this.initChart();
    this.initData();
  }

  initChart() {
    this.chart = Highcharts.stockChart('incr', {
      ...ChartDefaultOptions,
      series: this.options
    });
  }

  initData() {
    this.chart.showLoading();
    forkJoin([
      this.incrService.incrDiffYestoday(),
      this.incrService.incrDiffToday()
    ]).subscribe(([yestodayData, todayData]) => {
      this.updateTime = Date.now();
      this.chart.hideLoading();
      const yData = yestodayData.map(item => {
        let date = item.time.slice(11, 19);
        const time = new Date('2020 01 01 ' + date).getTime();
        return [time, item.count]
      })
      const tData = todayData.map(item => {
        let date = item.time.slice(11, 19);
        const time = new Date('2020 01 01 ' + date).getTime();
        return [time, item.count]
      })
      this.options[0]['data'] = tData;
      this.options[1]['data'] = yData;
      this.chart.update({
        series: this.options
      });
      setTimeout(() => {
        this.getTodayData();
      }, 60000);
    });
  }

  getTodayData() {
    if (this.todayData && !this.todayData.closed) this.todayData.unsubscribe();
    this.todayData = this.incrService
      .incrDiffToday()
      .subscribe(
        (res: IIncr[]) => {
          this.updateTime = Date.now();
          const data = res.map(item => {
            let date = item.time.slice(11, 19);
            const time = new Date('2020 01 01 ' + date).getTime();
            return [time, item.count]
          })
          this.options[0]['data'] = data;
          this.chart.update({
            series: this.options
          });
        },
        () => {},
        () => {
          if (workTime()) {
            setTimeout(() => {
              this.getTodayData();
            }, 60000);
          }
        }
      );
  }
}
