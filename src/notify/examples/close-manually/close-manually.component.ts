import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-close-manually-example',
    templateUrl: './close-manually.component.html'
})
export class ThyNotifyCloseExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHasDetail() {
        const ref = this.notifyService.show({
            id: 'errorId',
            type: 'error',
            title: '错误',
            content: '获取数据失败！',
            detail: 'TypeError',
            duration: 0
        });
        ref.afterClosed().subscribe(() => {
            console.log(ref.id + ' 关闭了');
        });
    }

    remove() {
        this.notifyService.remove('errorId');
    }
}
