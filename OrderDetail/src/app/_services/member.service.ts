import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AcccountService } from './acccount.service';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private httpclient = inject(HttpClient);
  private accountService = inject(AcccountService);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.httpclient.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: members => this.members.set(members)
    })

  }
  getMember(username: string) {
    const member = this.members().find(x => x.userName == username);
    if (member !== undefined) return of(member);
    return this.httpclient.get<Member>(this.baseUrl + 'users/' + username);

  }
  updateMember(member: Member) {
    return this.httpclient.put(this.baseUrl + 'users', member).pipe(
      tap(() => { this.members.update(members => members.map(m => m.userName === member.userName ? member : m)) })
    )
  }
}
