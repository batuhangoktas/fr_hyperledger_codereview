import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<any>((localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }
    public userSubjectValue(){
      this.userSubject = new BehaviorSubject<any>((localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
    }

    login(username, password) {

      return this.http.get(`${environment.apiUrl}/login?` + 'username=' + username + '&' + 'password=' + password);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

  reviewlist() {
    return this.http.get(`${environment.apiUrl}/getassets?`);
  }

  reviewDetail(keyId) {
    return this.http.get(`${environment.apiUrl}/getwith?` + 'keyid=' + keyId);
  }

  getReviewConfirm(keyId,userid,description){
    return this.http.get(`${environment.apiUrl}/addwith?` + 'keyid=' + keyId  + '&' +  'userid=' + userid + '&' +  'description=' + description);
  }

  sendReview(keyId,userid,commitDescription){
    return this.http.get(`${environment.apiUrl}/addasset?` + 'keyid=' + keyId + '&' +  'userid=' + userid + '&' +  'commitDescription=' + commitDescription);
  }
}
