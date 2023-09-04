import { Component, OnInit, TemplateRef, Renderer2, OnDestroy } from '@angular/core';
import { UnsubscribeMixin } from 'ngx-tethys/core';
import { ThyDialogConfig, ThyDialogSizes, ThyDialog } from 'ngx-tethys/dialog';
import { keycodes } from 'ngx-tethys/util';
import { ThyDialogBasicContentComponent } from './dialog-content.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'thy-dialog-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDialogBasicExampleComponent extends UnsubscribeMixin implements OnInit, OnDestroy {
    hasShowDialog = false;

    public config: ThyDialogConfig = {
        size: ThyDialogSizes.md,
        hasBackdrop: true,
        backdropClosable: true,
        closeOnNavigation: true,
        hostClass: ['test-dialog-content', 'another-test-dialog-content']
    };

    public layoutConfig = {
        align: 'left',
        divider: true
    };

    unsubscribe: () => void;

    constructor(public thyDialog: ThyDialog, private renderer: Renderer2) {
        super();
        thyDialog
            .afterOpened()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(dialog => {
                console.log(dialog);
            });
        this.unsubscribe = renderer.listen(document, 'keydown', (event: KeyboardEvent) => {
            const isK = (event.ctrlKey || event.metaKey) && event.keyCode === keycodes.K;
            if (!this.hasShowDialog && isK) {
                this.openComponentDialog();
            }
        });
    }

    ngOnInit() {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(
            template,
            Object.assign(
                {
                    panelClass: 'select-dialog-custom'
                },
                this.config
            )
        );
    }

    openComponentDialog() {
        this.hasShowDialog = true;
        const dialogRef = this.thyDialog.open(
            ThyDialogBasicContentComponent,
            Object.assign(
                {
                    initialState: {
                        data: `This is Pass Data`,
                        align: this.layoutConfig.align,
                        divider: this.layoutConfig.divider
                    },
                    canClose: () => {
                        this.thyDialog.confirm({
                            title: '确认归档',
                            content: '确认要归档选中的6项任务吗？',
                            footerAlign: 'right',
                            okType: 'primary',
                            okText: '确认归档',
                            cancelText: '取消归档',
                            onOk: () => {
                                dialogRef.close(null, true);
                            }
                        });
                        return false;
                    }
                },
                this.config
            )
        );
        dialogRef.keydownEvents().subscribe(event => {
            console.log(`Dialog keydownEvents: ${event}`);
        });
        dialogRef.afterClosed().subscribe(result => {
            this.hasShowDialog = false;
            console.log(`Dialog afterClosed result: ${result}`);
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
