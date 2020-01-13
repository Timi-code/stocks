import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { StockService } from '@services/stock.service';
import { forkJoin } from 'rxjs';
import { transformData, workTime } from '@utils/util';
import { IIndex } from '../index/index.component';
import { ChartDefaultOptions } from '../common/chart.options';

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
  updateTime: number;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.chart = Highcharts.stockChart('stock', {
      ...ChartDefaultOptions,
      title: {
        text: '量能变化图'
      },
      series: this.options
    });
  }

  getStock() {
    this.chart.showLoading();
    forkJoin(
      this.stockService.getYestodayData(this.code),
      this.stockService.getTodayData(this.code)
    ).subscribe(
      ([yestodayData, todayData]) => {
        this.chart.hideLoading();
        yestodayData = transformData(yestodayData as IIndex[], 10000);
        todayData = transformData(todayData as IIndex[], 10000);
        this.options[0]['data'] = yestodayData;
        this.options[1]['data'] = todayData;
        this.chart.update({
          series: this.options
        });
        setTimeout(() => {
          this.getTodayData();
        }, 5000);
      },
      () => {
        this.chart.hideLoading();
        alert('股票代码错误');
        this.code = '';
      }
    );
  }

  getTodayData() {
    this.stockService.getTodayData(this.code).subscribe((res: IIndex[]) => {
      this.updateTime = Date.now();
      const todayData = transformData(res, 10000);
      this.options[1]['data'] = todayData;
      this.chart.update({
        series: this.options
      });
      if (workTime()) {
        setTimeout(() => {
          this.getTodayData();
        }, 5000);
      }
    });
  }
}
