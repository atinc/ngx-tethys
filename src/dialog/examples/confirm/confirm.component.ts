import { Component, inject } from '@angular/core';
import { ThyConfirmConfig, ThyDialog } from 'ngx-tethys/dialog';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
    selector: 'thy-dialog-confirm-example',
    templateUrl: './confirm.component.html'
})
export class ThyDialogConfirmExampleComponent {
    private thyDialog = inject(ThyDialog);

    public okType: 'primary' | 'danger';

    openPrimaryConfirm() {
        const confirmConfig: ThyConfirmConfig = {
            title: '确认归档',
            content: '确认要归档选中的6项任务吗？',
            footerAlign: 'right',
            okType: 'primary',
            okText: '确认归档',
            cancelText: '取消归档',
            onCancel: () => {
                console.log('取消归档');
            },
            onOk: () => {
                return of([1]).pipe(
                    delay(2000),
                    map(() => {
                        return false;
                    })
                );
            }
        };

        this.thyDialog.confirm(confirmConfig);
    }

    openDangerConfirm() {
        this.thyDialog.confirm({
            content: '确认要删除这条任务<code>21111</code>吗？</script>'
        });
    }
}
