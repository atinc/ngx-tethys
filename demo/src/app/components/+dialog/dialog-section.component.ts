import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from '../../../../../src/dialog';
import { helpers } from '../../../../../src/util';
import { DemoDialogContentComponent } from './dialog-content.component';
import { Subject, of, defer } from 'rxjs';
import { takeUntil, delay, map } from 'rxjs/operators';
import { apiParameters } from './api-parameters';
import { taskTypes } from '../+select/mock-data';
import { DemoTreeSectionComponent } from '../+tree/tree-section.component';


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
export class DemoDialogSectionComponent implements OnDestroy {
    private ngUnsubscribe$ = new Subject();

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

    public thyPrimaryAction = (event: Event) => {
        return of(true).pipe(delay(1000));
    };

    constructor(public thyDialog: ThyDialog) {
        thyDialog
            .afterOpened()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(dialog => {
                console.log(dialog);
            });
        this.optionData = taskTypes;
    }

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template, {
            panelClass: 'selectDialogCustomer'
        });
    }

    openComponentDialog() {
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
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
