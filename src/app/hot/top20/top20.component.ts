import { Component, OnInit } from '@angular/core';
import { HotService } from '@services/hot.service';
import { workTime } from '@utils/util';

export interface IHot {
  code: string;
  day: string;
  display_name: string;
  count: number;
  increase: number;
}

@Component({
  selector: 'st-top20',
  templateUrl: './top20.component.html',
  styleUrls: ['./top20.component.scss']
})
export class Top20Component implements OnInit {
  data: IHot[];
  updateTime: number;
  displayedColumns: string[] = ['day', 'display_name', 'code', 'count', 'increase']

  constructor(
    private hotService: HotService
  ) { }

  ngOnInit() {
    this.getHotTop20();
  }

  getHotTop20() {
    this.hotService.getHotTop20()
      .subscribe((result: IHot[]) => {
        this.updateTime = Date.now();
        this.data = result;
      }),
      () => { },
      () => {
        if (workTime()) {
          setTimeout(() => {
            this.getHotTop20()
          }, 60000);
        }
      }
  }

}
