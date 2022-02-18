import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import {first} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
  activeItemList:any;
    items:any = [];
  private dateTime: Date;
  confirmId: any;
  spinnerVisible = true;

    constructor(private accountService: AccountService, private spinner: NgxSpinnerService) {
        this.user = this.accountService.userValue;
        this.activeItemList = {};
/*        this.items = [
          {keyId:'12', reviewUser:'Batuhan', reviewDate: '01.01.1991', reviewDescription: "Onaylayınız", isreview: "yes"},
          {keyId:'13', reviewUser:'User1', reviewDate: '01.01.1991', reviewDescription: "Onaylayınız", isreview: "no"},
          {keyId:'14', reviewUser:'User2', reviewDate: '01.01.1992', reviewDescription: "123", isreview: "yes"}
        ];*/
      this.spinnerVisible=true;
      this.spinner.show();
      this.getReviewList();

    }

  getDetail(item) {
    this.getReviewDetail(item.keyId);
  }
  logout() {
    this.accountService.logout();
  }

  getReviewList(){

    this.accountService.reviewlist()
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          if(data['status']==true){
            this.items = JSON.parse(data["listReceiveData"]).reverse();
            this.spinnerVisible=false;
          }


        },
        error => {
          debugger;
        });

  }
  getReviewDetail(keyId){

    this.spinnerVisible=true;
    this.spinner.show();
    this.accountService.reviewDetail(keyId)
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          if(data['status']==true){
            this.activeItemList = JSON.parse(data["listReceiveData"]).reverse();
            this.spinnerVisible=false;
          }


        },
        error => {
          debugger;
        });

  }

  confirmWindow(keyId){
      this.confirmId = keyId;
  }

  confirmReview(description) {

    this.spinnerVisible=true;
    this.spinner.show();
    this.accountService.getReviewConfirm(this.confirmId,this.user, description)
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          if(data['status']==true){
            this.getReviewList();
          }


        },
        error => {
          debugger;
        });
  }

  sendReview(versionNo,commitDescription) {

    this.spinnerVisible=true;
    this.spinner.show();
    this.accountService.sendReview(versionNo,this.user,commitDescription)
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          if(data['status']==true){
            this.getReviewList();
          }


        },
        error => {
          debugger;
          this.spinnerVisible=false;
        });
  }
}
