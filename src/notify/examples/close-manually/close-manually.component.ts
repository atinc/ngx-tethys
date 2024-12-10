import { ThyNotifyRef, ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit, inject } from '@angular/core';

@Component({
    selector: 'thy-notify-close-manually-example',
    templateUrl: './close-manually.component.html',
    standalone: false
})
export class ThyNotifyCloseExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    private notifyRef: ThyNotifyRef;

    ngOnInit() {}

    showHasDetail() {
        this.notifyRef = this.notifyService.show({
            id: 'errorId',
            type: 'error',
            title: '错误',
            content: '获取数据失败！',
            detail: 'TypeError',
            duration: 0
        });
        this.notifyRef.afterClosed().subscribe(() => {
            console.log(`notify ${this.notifyRef.id} 被关闭了`);
        });
    }

    remove() {
        this.notifyRef.close();
    }
}
