import { ThyDialog, ThyFormGroupFooterAlign, ThyNotifyService } from 'ngx-tethys';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
    selector: 'thy-notify-open-detail-example',
    templateUrl: './open-detail.component.html'
})
export class ThyNotifyOpenDetailExampleComponent implements OnInit {
    align: ThyFormGroupFooterAlign = 'left';

    openConfirm = () => {
        this.thyDialog.confirm({
            title: '确认删除',
            content: '确认要删除这条任务<code>21111</code>吗？</script>',
            footerAlign: this.align,
            onOk: () => {
                return of([1]).pipe(
                    delay(2000),
                    map(() => {
                        return false;
                    })
                );
            }
        });
    };

    constructor(private notifyService: ThyNotifyService, private thyDialog: ThyDialog) {}

    ngOnInit() {}

    showDetail() {
        this.notifyService.openDetail(
            '创建成功',
            '点击查看',
            '我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的我是创建的',
            this.openConfirm
        );
    }
}
