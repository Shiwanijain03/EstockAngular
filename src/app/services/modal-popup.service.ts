import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
 

/*
 * This class contains all service methods related to modal popup
 *
 * @author Upendra Shukla
 * @author Deepak Kumar
 * @author Shavet Garg
 * @version 1.0
 * */

@Injectable({
  providedIn: 'root'
})
export class ModalPopupService {
  constructor(
    private modalService: NzModalService,
    private router: Router 
  ) {}

  showDeleteConfirm(title: string, description: string, okCallback: any): void {
    this.modalService.confirm({
      nzTitle: title,
      nzContent: '<b style="color: red;">' + description + '</b>',
      nzOkText: "Yes",
      nzOnOk: okCallback,
      nzCancelText: "No",
      nzOnCancel: () => console.log('Cancel')
    });
  }



  success(message: string, callbackFunction?: any): void {
    if (callbackFunction == null) {
      callbackFunction = () => {};
    }
    this.modalService.success({
      nzTitle: "Success",
      nzContent: message,
      nzOnOk: callbackFunction
    });
  }

  errorWithCallback(message: string, callbackFunction?: any): void {
    if (callbackFunction == null) {
      callbackFunction = () => {};
    }

    this.modalService.error({
      nzTitle: "Error",
      nzContent: message,
      nzOnOk: callbackFunction
    });
  }

  error(message: string): void {
    this.modalService.error({
      nzTitle: "Error",
      nzContent: message
    });
  }
}