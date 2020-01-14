import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  constructor(private http: HttpClient) {}

  getYestodayData(code: string) {
    return this.http
      .get('/api/get_index_tick_yestoday.php', {
        params: { code: code }
      })
      .pipe(
        map(data => (Array.isArray(data) ? data : [])),
        retry(3)
      );
  }

  getTodayData(code: string) {
    return this.http
      .get('/api/get_index_tick.php', {
        params: { code: code }
      })
      .pipe(
        map(data => (Array.isArray(data) ? data : [])),
        retry(3)
      );
  }

  nowTotalData(code: string) {
    return this.http
      .get('/api/get_current_money_compare.php', {
        params: { code: code }
      })
      .pipe(
        map(data => {
          if (!data) {
            throw new Error();
          }
          return data;
        }),
        retry(3)
      );
  }
}
