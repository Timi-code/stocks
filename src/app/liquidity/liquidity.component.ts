import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '@services/liquidity.service';
import * as Highcharts from 'highcharts/highstock';
import { ChartDefaultOptions } from '../common/chart.options';
import { workTime } from '@utils/util';

export interface ILiquidity {
  date: string;
  liquidity_premium: number;
  liquidity_premium_weighted: number;
}

@Component({
  selector: 'st-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.scss']
})
export class LiquidityComponent implements OnInit {
  chart: Highcharts.Chart;
  options: Highcharts.SeriesOptionsType[] = [
    {
      name: '未加权',
      type: 'line',
      color: 'blue',
      data: []
    },
    {
      name: '加权',
      type: 'line',
      color: 'red',
      data: []
    }
  ];
  updateTime: number;
  constructor(private liquidityService: LiquidityService) {}

  ngOnInit() {
    this.initChart();
    this.getLiquidityData();
  }

  initChart() {
    this.chart = Highcharts.stockChart('liquidity', {
      ...ChartDefaultOptions,
      tooltip: {
        shared: true,
        split: false,
        formatter: function() {
          let text = this.points.reduce(function(s: string, point: Highcharts.TooltipFormatterContextObject) {
            return s + `<br/><span style="color:${point.color}">●</span>` + point.series.name + ': ' + point.y;
          }, '<b>' + Highcharts.dateFormat('%Y-%m-%d', this.x + 28800000) + '</b>');
          if (this.points.length === 2) text += `<br/><span style="color:purple">●</span>差额: ${this.points[0].y - this.points[1].y}`
          return text;
        }
      },
      title: {
        text: '流动性溢价因子'
      },
      series: this.options
    });
  }

  getLiquidityData() {
    this.liquidityService.getLiquidityData().subscribe(
      (res: ILiquidity[]) => {
        this.updateTime = Date.now();
        this.options[0]['data'] = res.map(item => {
          return [
            new Date(item.date).getTime(),
            +item.liquidity_premium.toFixed(2)
          ];
        });
        this.options[1]['data'] = res.map(item => {
          return [
            new Date(item.date).getTime(),
            +item.liquidity_premium_weighted.toFixed(2)
          ];
        });
        this.chart.update({
          series: this.options
        });
      },
      () => {},
      () => {
        if (workTime()) {
          setTimeout(() => {
            this.getLiquidityData();
          }, 60000);
        }
      }
    );
  }
}
