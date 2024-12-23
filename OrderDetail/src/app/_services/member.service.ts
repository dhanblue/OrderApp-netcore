import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AcccountService } from './acccount.service';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private httpclient = inject(HttpClient);
  private accountService = inject(AcccountService);
  baseUrl = environment.apiUrl;
  constructor() { }

  getMembers() {
    return this.httpclient.get<Member[]>(this.baseUrl + 'users');

  }
  getMember(username: string) {
    return this.httpclient.get<Member>(this.baseUrl + 'users/' + username);

  }
 
}
