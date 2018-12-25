import { Component, OnDestroy, TemplateRef } from '@angular/core';
import {
    ThyDialog,
    ThyDialogConfig,
    ThyDialogSizes
} from '../../../../../src/dialog';
import { helpers } from '../../../../../src/util';
import { DemoDialogContentComponent } from './dialog-content.component';
import { Subject, of, defer } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { apiParameters } from './api-parameters';

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
    }

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
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

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
