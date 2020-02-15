import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotService {

  constructor(
    private http: HttpClient
  ) { }

  // 搜索热度最高的TOP20
  getHotTop20() {
    return this.http.get('/api/get_hot.php')
  }

  // 某个股票的搜索热度
  getSecurityHot(code: string) {
    return this.http.get('/api/get_security_hot.php', { params: { code: code } })
  }
}
