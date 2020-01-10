import { Component, OnInit } from '@angular/core';
import { LiquidityService } from '@services/liquidity.service';
import * as Highcharts from 'highcharts/highstock';

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
        text: '流动性溢价因子'
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
    });
  }
}
