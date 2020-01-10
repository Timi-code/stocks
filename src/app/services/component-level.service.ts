import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentLevelService {
  private level: number = 1;
  levelSubject = new BehaviorSubject<number>(1);

  constructor() {}

  lastLevel() {
    return ++this.level;
  }
}
