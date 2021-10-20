import { Component } from '@angular/core';
import { ThyConfirmConfig, ThyDialog } from 'ngx-tethys';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
    selector: 'thy-dialog-confirm-example',
    templateUrl: './confirm.component.html'
})
export class ThyDialogConfirmExampleComponent {
    public okType: 'primary' | 'danger';

    constructor(private thyDialog: ThyDialog) {}

    openPrimaryConfirm() {
        const confirmConfig: ThyConfirmConfig = {
            title: '确认归档',
            content: '确认要归档选中的6项任务吗？',
            footerAlign: 'right',
            okType: 'primary',
            okText: '确认归档',
            cancelText: '取消归档',
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
            title: '确认删除',
            content: '确认要删除这条任务<code>21111</code>吗？</script>',
            footerAlign: 'right',
            okType: 'danger',
            okText: '确认删除',
            cancelText: '取消删除',
            onOk: () => {
                return of([1]).pipe(
                    delay(2000),
                    map(() => {
                        return false;
                    })
                );
            }
        });
    }
}
