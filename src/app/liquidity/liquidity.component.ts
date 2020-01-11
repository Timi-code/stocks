import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '@services/liquidity.service';
import * as Highcharts from 'highcharts/highstock';
import { ChartDefaultOptions } from '../common/chart.options';

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
  constructor(private liquidityService: LiquidityService) {}

  ngOnInit() {
    this.initChart();
    this.getLiquidityData();
  }

  initChart() {
    this.chart = Highcharts.stockChart('liquidity', {
      ...ChartDefaultOptions,
      title: {
        text: '流动性溢价因子'
      },
      series: this.options
    });
  }

  getLiquidityData() {
    this.liquidityService.getLiquidityData().subscribe((res: ILiquidity[]) => {
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
      setTimeout(() => {
        this.getLiquidityData();
      }, 3000);
    });
  }
}
