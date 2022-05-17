import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit } from '@angular/core';

const DETAIL = `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
- Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
[rendered]ℹ ｢wdm｣: Compiled successfully.`;

@Component({
    selector: 'thy-notify-detail-example',
    templateUrl: './detail.component.html'
})
export class ThyNotifyDetailExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHasDetail() {
        this.notifyService.show({
            id: 'errorId',
            type: 'error',
            title: '错误',
            content: '获取数据失败！',
            detail: DETAIL,
            duration: 0
        });
        this.notifyService.show({
            type: 'warning',
            title: '警告',
            content: '获取数据异常！',
            detail: DETAIL,
            duration: 0
        });
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '获取数据成功！',
            detail: DETAIL,
            duration: 0
        });
        this.notifyService.show({
            type: 'info',
            title: '提示信息',
            content: '信息提示！',
            detail: DETAIL,
            duration: 0
        });
    }
}
