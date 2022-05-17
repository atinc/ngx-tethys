import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-close-example',
    templateUrl: './close.component.html'
})
export class ThyNotifyCloseExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHasDetail() {
        this.notifyService.show({
            id: 'errorId',
            type: 'error',
            title: '错误',
            content: '获取数据失败！',
            detail: 'TypeError',
            duration: 0
        });
    }

    removeNotifyById() {
        this.notifyService.removeNotifyById('errorId');
    }
}
