import { Component, OnDestroy, TemplateRef, Renderer2 } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from '../../../../../src/dialog';
import { helpers, keycodes } from '../../../../../src/util';
import { DemoDialogContentComponent } from './dialog-content.component';
import { Subject, of, defer } from 'rxjs';
import { takeUntil, delay, map } from 'rxjs/operators';
import { apiParameters } from './api-parameters';
import { taskTypes } from '../+select/mock-data';
import { DemoTreeSectionComponent } from '../+tree/tree-section.component';
import { mixinUnsubscribe, MixinBase } from '../../../../../src/core';

const exampleCode = `
import { DialogContentComponent } from './dialog-content.component';

export class DialogComponent {
    constructor(public thyDialog: ThyDialog) {
    }

    open() {
        this.thyDialog.open(DialogContentComponent, {
            size: ThyDialogSizes.md,
            hasBackdrop: true,
            backdropClosable: true,
            closeOnNavigation: true,
            initialState: {
                data: 'some data'
            }
        });
    }

    openTemplate(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

}
`;
@Component({
    selector: 'demo-dialog-section',
    templateUrl: './dialog-section.component.html'
})
export class DemoDialogSectionComponent extends mixinUnsubscribe(MixinBase) implements OnDestroy {
    // private ngUnsubscribe$ = new Subject();

    public exampleCode: string = exampleCode;

    public config: ThyDialogConfig = {
        size: ThyDialogSizes.md,
        hasBackdrop: true,
        backdropClosable: true,
        closeOnNavigation: true
    };

    public apiParameters = apiParameters;

    optionData = [];

    selectedItem = this.optionData[0];

    hasShowDialog = false;

    unsubscribe: () => void;

    public thyPrimaryAction = (event: Event) => {
        return of(true).pipe(delay(1000));
    };

    constructor(public thyDialog: ThyDialog, private renderer: Renderer2) {
        super();
        thyDialog
            .afterOpened()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(dialog => {
                console.log(dialog);
            });
        this.optionData = taskTypes;

        this.unsubscribe = renderer.listen(document, 'keydown', (event: KeyboardEvent) => {
            const isK = (event.ctrlKey || event.metaKey) && event.keyCode === keycodes.K;
            if (!this.hasShowDialog && isK) {
                this.openComponentDialog();
            }
        });
        // document.addEventListener('keydown', (event: KeyboardEvent) => {
        //     const isK = (event.ctrlKey || event.metaKey) && event.keyCode === keycodes.K;
        //     if (!this.hasShowDialog && isK) {
        //         this.openComponentDialog();
        //     }
        // });
    }

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

    openConfirm() {
        this.thyDialog.confirm({
            title: '确认删除',
            content: '确认要删除这条任务<code>21111</code>吗？</script>',
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

    openTreeDemo() {
        this.thyDialog.open(DemoTreeSectionComponent);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
