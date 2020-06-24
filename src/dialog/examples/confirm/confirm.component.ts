import { Component } from '@angular/core';
import { ThyDialog, ThyFormGroupFooterAlign } from 'ngx-tethys';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
    selector: 'thy-dialog-confirm-example',
    templateUrl: './confirm.component.html'
})
export class ThyDialogConfirmExampleComponent {
    align: ThyFormGroupFooterAlign = 'left';

    constructor(private thyDialog: ThyDialog) {}

    openConfirm() {
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
    }
}
