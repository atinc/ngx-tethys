import { Component, OnInit, TemplateRef, Renderer2, OnDestroy } from '@angular/core';
import { mixinUnsubscribe, ThyDialogConfig, MixinBase, ThyDialogSizes, ThyDialog, keycodes } from 'ngx-tethys';
import { DemoDialogContentComponent } from '../dialog-content.component';
import { taskTypes } from '../../../components/+select/mock-data';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-demo-dialog-basic',
    templateUrl: './dialog-basic.component.html'
})
export class DemoDialogBasicComponent extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    hasShowDialog = false;

    public config: ThyDialogConfig = {
        size: ThyDialogSizes.md,
        hasBackdrop: true,
        backdropClosable: true,
        closeOnNavigation: true
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
            DemoDialogContentComponent,
            Object.assign(
                {
                    initialState: {
                        data: `This is Pass Data`
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
