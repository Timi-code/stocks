import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getYestodayData(code: string) {
    return this.http
      .get('/api/get_security_tick_yestoday.php', {
        params: { code: code }
      })
      .pipe(retry(3));
  }

  getTodayData(code: string) {
    return this.http
      .get('/api/get_security_tick.php', {
        params: { code: code }
      })
      .pipe(
        map(data => (Array.isArray(data) ? data : [])),
        retry(3)
      );
  }
}
