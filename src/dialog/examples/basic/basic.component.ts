import { Component, OnInit, TemplateRef, Renderer2, OnDestroy, inject, DestroyRef } from '@angular/core';
import { ThyDialogConfig, ThyDialogSizes, ThyDialog } from 'ngx-tethys/dialog';
import { keycodes } from 'ngx-tethys/util';
import { ThyDialogBasicContentComponent } from './dialog-content.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'thy-dialog-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyDialogBasicExampleComponent implements OnInit, OnDestroy {
    thyDialog = inject(ThyDialog);
    private renderer = inject(Renderer2);

    private readonly destroyRef = inject(DestroyRef);

    hasShowDialog = false;

    public config: ThyDialogConfig = {
        size: ThyDialogSizes.md,
        hasBackdrop: true,
        backdropClosable: true,
        closeOnNavigation: true,
        hostClass: ['thy-dialog-content', 'test-dialog-content', 'another-test-dialog-content']
    };

    public layoutConfig = {
        align: 'right',
        divider: true
    };

    unsubscribe: () => void;

    constructor() {
        const thyDialog = this.thyDialog;
        const renderer = this.renderer;

        thyDialog
            .afterOpened()
            .pipe(takeUntilDestroyed(this.destroyRef))
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
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
