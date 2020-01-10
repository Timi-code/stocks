import { Component, OnInit } from '@angular/core';
import { ComponentLevelService } from '@services/component-level.service';

@Component({
  selector: 'st-move-box',
  templateUrl: './move-box.component.html',
  styleUrls: ['./move-box.component.scss']
})
export class MoveBoxComponent implements OnInit {
  index: number = 1;
  constructor(private levelService: ComponentLevelService) {}

  ngOnInit() {}

  clickHandle() {
    this.index = this.levelService.lastLevel();
    console.log(this.index);
  }

  closeHandle(ev: MouseEvent) {
    ev.stopPropagation();
  }
}
