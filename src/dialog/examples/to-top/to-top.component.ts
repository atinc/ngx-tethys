import { Component, inject, Injectable, OnInit, ViewContainerRef } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader, ThyDialogRef } from 'ngx-tethys/dialog';

@Injectable()
export class dialogService {
    private thyDialog = inject(ThyDialog);

    private openedDialogs: ThyDialogRef<any>[] = [];

    open(template?: any, id?: string, viewContainerRef?: ViewContainerRef) {
        const hasOpenedDialogRef = this.openedDialogs.find(dialog => dialog.id === id);
        if (hasOpenedDialogRef) {
            this.thyDialog.toTop(id);
            return;
        }
        const dialogRef = this.thyDialog.open(template, {
            id: id,
            viewContainerRef: viewContainerRef,
            initialState: {}
        });
        this.openedDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => {
            this.openedDialogs = this.openedDialogs.filter(item => item !== dialogRef);
        });
    }
}

@Component({
    selector: `thy-dialog-popup-first-example`,
    template: `
        <thy-dialog-header thyTitle="Dialog with first"></thy-dialog-header>
        <thy-dialog-body> 第一个弹框 </thy-dialog-body>
        <thy-dialog-footer>
            <button thyButton="primary" (click)="dialogRef.close()">确定</button>
        </thy-dialog-footer>
    `,
    standalone: true,
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
class ThyDialogPopupFirstComponent {
    dialogRef = inject(ThyDialogRef);
}

@Component({
    selector: `thy-dialog-popup-second-example`,
    template: `
        <thy-dialog-header thyTitle="Dialog with second"></thy-dialog-header>
        <thy-dialog-body>
            <div class="btn-pair mt-2">
                <div>第二个弹框</div>
            </div>
        </thy-dialog-body>
        <thy-dialog-footer>
            <button thyButton="primary" (click)="toTop()">弹窗一置顶</button>
            <button thyButton="primary" (click)="dialogRef.close()">确定</button>
        </thy-dialog-footer>
    `,
    standalone: true,
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
class ThyDialogPopupSecondComponent {
    dialogRef = inject(ThyDialogRef);

    private dialogService = inject(dialogService);

    toTop() {
        this.dialogService.open(ThyDialogPopupFirstComponent, 'first');
    }
}

@Component({
    selector: 'thy-dialog-to-top-example',
    templateUrl: './to-top.component.html',
    standalone: true,
    providers: [dialogService],
    imports: [ThyButton]
})
export class ThyDialogToTopExampleComponent implements OnInit {
    private dialogService = inject(dialogService);

    constructor(public viewContainerRef: ViewContainerRef) {}

    ngOnInit() {}

    open() {
        this.dialogService.open(ThyDialogPopupFirstComponent, 'first', this.viewContainerRef);
        this.dialogService.open(ThyDialogPopupSecondComponent, 'second', this.viewContainerRef);
    }
}
