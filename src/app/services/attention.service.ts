import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {
  constructor(private http: HttpClient) {}

  getMoneyChange() {
    return this.http.get('/api/get_money_change.php').pipe(
      map(data => (Array.isArray(data) ? data : [])),
      retry(3)
    );
  }
}
