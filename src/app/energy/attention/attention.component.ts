import { Component, OnInit } from '@angular/core';
import { AttentionService } from '@services/attention.service';
import { workTime } from '@utils/util';

export interface ChangeMoeny {
  display_name: string;
  money: number;
  increase: number;
}

@Component({
  selector: 'st-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
  displayedColumns: string[] = ['display_name', 'money', 'increase'];
  data: ChangeMoeny[];
  updateTime: number;
  constructor(private attentionService: AttentionService) {}

  ngOnInit() {
    this.getMoneyChange();
  }

  getMoneyChange() {
    this.attentionService.getMoneyChange().subscribe(
      (res: ChangeMoeny[]) => {
        this.updateTime = Date.now();
        this.data = res.map(item => {
          item.money = Math.ceil(item.money / 10000);
          return item;
        });
      },
      () => {},
      () => {
        if (workTime()) {
          setTimeout(() => {
            this.getMoneyChange();
          }, 60000);
        }
      }
    );
  }
}
