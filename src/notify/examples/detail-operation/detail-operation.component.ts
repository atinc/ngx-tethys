import { ThyNotifyService } from 'ngx-tethys';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-detail-operation-example',
    templateUrl: './detail-operation.component.html'
})
export class ThyNotifyDetailOperationExampleComponent implements OnInit {
    openAction = () => {
        alert(111);
    };
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHasDetailOperation() {
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                action: this.openAction
            },
            duration: 0
        });

        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                content: '查看内容',
                action: this.openAction
            },
            duration: 0
        });

        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '获取数据成功！',
            detail: '提示信息',
            duration: 0
        });
    }
}
