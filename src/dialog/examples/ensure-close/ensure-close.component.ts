import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { mixinUnsubscribe, ThyDialogConfig, MixinBase, ThyDialogSizes, ThyDialog } from 'ngx-tethys';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'thy-dialog-ensure-close-example',
    templateUrl: './ensure-close.component.html'
})
export class ThyDialogEnsureCloseExampleComponent extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    public config: ThyDialogConfig = {
        size: ThyDialogSizes.md,
        hasBackdrop: true,
        backdropClosable: true,
        closeOnNavigation: true
    };

    constructor(public thyDialog: ThyDialog) {
        super();
    }

    ngOnInit() {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(
            template,
            Object.assign(
                {
                    panelClass: 'select-dialog-custom',
                    ensureClose: () => this.beforeHidden()
                },
                this.config
            )
        );
    }

    beforeHidden(): Observable<boolean> {
        const closeResolve = new Subject<boolean>();
        this.thyDialog.confirm({
            title: '确认归档',
            content: '确认要归档选中的6项任务吗？',
            footerAlign: 'right',
            okType: 'primary',
            okText: '确认归档',
            cancelText: '取消归档',
            onOk: () => {
                closeResolve.next(true);
            }
        });
        return closeResolve;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
