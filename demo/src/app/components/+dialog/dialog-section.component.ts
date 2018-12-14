import { Component, OnDestroy } from '@angular/core';
import { ThyDialog } from '../../../../../src/dialog';
import { helpers } from '../../../../../src/util';
import { DemoDialogContentComponent } from './dialog-content.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'demo-dialog-section',
    templateUrl: './dialog-section.component.html'
})
export class DemoDialogSectionComponent implements OnDestroy {
    private ngUnsubscribe$ = new Subject();

    public apiParameters = [
        {
            property: 'ngModel',
            description: '双向绑定值,选中的可选值列表项或者具体时间',
            type: 'DateRangeItemInfo',
            default: ''
        }
    ];

    constructor(private thyDialog: ThyDialog) {
        thyDialog
            .afterOpened()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(dialog => {
                console.log(dialog);
            });
    }

    openComponentDialog() {
        const dialogRef = this.thyDialog.open(DemoDialogContentComponent, {});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
