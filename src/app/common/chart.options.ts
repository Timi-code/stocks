import { TooltipFormatterContextObject } from 'highcharts';
import * as Highcharts from 'highcharts';

export const ChartDefaultOptions = {
  time: {
    useUTC: false
  },
  rangeSelector: {
    enabled: false
  },
  navigator: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  tooltip: {
    shared: true,
    split: false,
    style: {
      fontSize: '14px'
    },
    formatter: function() {
      let text = this.points.reduce(function(s: string, point: TooltipFormatterContextObject) {
        return s + `<br/><span style="color:${point.color}">●</span>` + point.series.name + ': ' + point.y;
      }, '<b>' + Highcharts.dateFormat('%H:%M:%S', this.x + 28800000) + '</b>');
      if (this.points.length === 2) text += `<br/><span style="color:purple">●</span>差额: ${this.points[0].y - this.points[1].y}`
      return text;
    }
  }
};
