import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiquidityService {
  constructor(private http: HttpClient) {}

  getLiquidityData() {
    return this.http.get('/api/get_liquidity_premium.php').pipe(
      map(data => (Array.isArray(data) ? data : [])),
      retry(3)
    );
  }
}
