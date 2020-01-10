import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  constructor(private http: HttpClient) {}

  getYestodayData(code: string) {
    return this.http.get('/api/get_index_tick_yestoday.php', {
      params: { code: code }
    });
  }

  getTodayData(code: string) {
    return this.http.get('/api/get_index_tick.php', {
      params: { code: code }
    });
  }

  nowTotalData(code: string) {
    return this.http.get('/api/get_current_money_compare.php', {
      params: { code: code }
    });
  }
}
