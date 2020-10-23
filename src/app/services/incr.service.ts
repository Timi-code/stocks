import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIncr } from '../energy/incr-diff/incr-diff.component';

@Injectable({
  providedIn: 'root'
})
export class IncrService {

  constructor(
    private http: HttpClient
  ) { }

  incrDiffYestoday() {
    return this.http.get<IIncr[]>('/api/get_incr_diff_yestoday.php')
  }

  incrDiffToday() {
    return this.http.get<IIncr[]>('/api/get_incr_diff.php')
  }
}
