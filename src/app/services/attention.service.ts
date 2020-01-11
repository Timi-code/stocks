import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {
  constructor(private http: HttpClient) {}

  getMoneyChange() {
    return this.http.get('/api/get_money_change.php');
  }
}
