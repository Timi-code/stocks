import { Component, OnInit } from '@angular/core';
import { AttentionService } from '@services/attention.service';

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
  constructor(private attentionService: AttentionService) {}

  ngOnInit() {
    this.getMoneyChange();
  }

  getMoneyChange() {
    this.attentionService.getMoneyChange().subscribe(
      (res: ChangeMoeny[]) => {
        this.data = res.map(item => {
          item.money = Math.ceil(item.money / 10000);
          return item;
        });
      },
      () => {},
      () => {
        setTimeout(() => {
          this.getMoneyChange();
        }, 3000);
      }
    );
  }
}
