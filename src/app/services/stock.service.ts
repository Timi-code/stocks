import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getYestodayData(code: string) {
    return this.http.get('/api/get_security_tick_yestoday.php', {
      params: { code: code }
    });
  }

  getTodayData(code: string) {
    return this.http.get('/api/get_security_tick.php', {
      params: { code: code }
    });
  }
}
