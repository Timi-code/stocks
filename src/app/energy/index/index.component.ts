import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { IndexService } from '@services/index.service';
import { transformData, workTime } from '@utils/util';
import { Subscription, forkJoin } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ChartDefaultOptions } from '../../common/chart.options';

export interface IIndex {
  time: string;
  current: number;
  money: number;
}

export interface ITotalData {
  yestoday_data: { money: number };
  today_data: { money: number };
}

@Component({
  selector: 'st-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
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

  selectedCode = 'ZZLT';
  indexs: { name: string; value: string }[] = [
    {
      name: '中证流通',
      value: 'ZZLT'
    },
    {
      name: '深证综指',
      value: 'SZZS'
    },
    {
      name: '深证成指',
      value: 'SZCZ'
    },
    {
      name: '上证指数',
      value: 'SZZZ'
    },
    {
      name: '中小板指',
      value: 'ZXBZ'
    },
    {
      name: '创业板指',
      value: 'CYBZ'
    },
    {
      name: '上证50',
      value: 'SZ50'
    },
    {
      name: '沪深300',
      value: 'HS300'
    },
    {
      name: '中证500',
      value: 'ZZ500'
    }
  ];
  updateTime: number;

  todayTotal: number = 0;
  yestodayTotal: number = 0;

  yestodayData: Subscription;
  todayData: Subscription;
  totalData: Subscription;
  sub: Subscription;

  constructor(private indexService: IndexService) {}

  ngOnInit() {
    this.initChart();
    this.initData();
  }

  initChart() {
    this.chart = Highcharts.stockChart('index', {
      ...ChartDefaultOptions,
      title: {
        text: '量能变化图'
      },
      series: this.options
    });
  }

  initData() {
    this.chart.showLoading();
    forkJoin(
      this.indexService.getYestodayData(this.selectedCode),
      this.indexService.getTodayData(this.selectedCode)
    ).subscribe(([yestodayData, todayData]) => {
      this.updateTime = Date.now();
      this.chart.hideLoading();
      yestodayData = transformData(yestodayData as IIndex[]);
      todayData = transformData(todayData as IIndex[]);
      this.options[0]['data'] = todayData;
      this.options[1]['data'] = yestodayData;
      this.chart.update({
        series: this.options
      });
      setTimeout(() => {
        this.getTodayData();
      }, 5000);
    });
    this.getNowTotalData();
  }

  getYestodayData() {
    this.indexService
      .getYestodayData(this.selectedCode)
      .subscribe((res: IIndex[]) => {
        const data = transformData(res);
        this.options[1]['data'] = data;
        this.chart.update({
          series: this.options
        });
      });
  }

  getTodayData() {
    if (this.todayData && !this.todayData.closed) this.todayData.unsubscribe();
    this.todayData = this.indexService
      .getTodayData(this.selectedCode)
      .subscribe(
        (res: IIndex[]) => {
          this.updateTime = Date.now();
          const data = transformData(res);
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
            }, 5000);
          }
        }
      );
  }

  getNowTotalData() {
    if (this.totalData && !this.totalData.closed) this.totalData.unsubscribe();
    this.totalData = this.indexService
      .nowTotalData(this.selectedCode)
      .subscribe(
        (res: ITotalData) => {
          this.yestodayTotal = Math.ceil(res.yestoday_data.money / 100000000);
          this.todayTotal = Math.ceil(res.today_data.money / 100000000);
        },
        () => {},
        () => {
          if (workTime()) {
            setTimeout(() => {
              this.getNowTotalData();
            }, 5000);
          }
        }
      );
  }

  selectionChange(change: MatSelectChange) {
    console.log(change.value);
    this.initData();
  }
}
