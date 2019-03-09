import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ThyModalService } from '../../../../../src/modal';

@Component({
  selector: 'modal-content',
  template: `
    <thy-modal>
        <thy-modal-header [thyTitle]="title">
        </thy-modal-header>
        <thy-modal-body>
        <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
        </thy-modal-body>
    </thy-modal>
    `
})

export class DemoModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
    this.list.push('PROFIT!!!');
  }
}
