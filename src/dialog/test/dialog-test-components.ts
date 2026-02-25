import { Directionality } from '@angular/cdk/bidi';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    inject,
    Injector,
    input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    viewChild,
    InjectionToken
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDialog, ThyDialogModule, ThyDialogRef } from 'ngx-tethys/dialog';
import { ThyButtonModule } from 'ngx-tethys/button';

export const MY_TOKEN = new InjectionToken<string>('MY_TOKEN');
@Component({
    selector: 'thy-dialog-content-test-component',
    template: ` <div>Hello Dialog <button>Close</button></div> `
})
export class DialogSimpleContentTestComponent {
    dialogRef = inject<ThyDialogRef<DialogSimpleContentTestComponent>>(ThyDialogRef);
    dialogInjector = inject(Injector);
    directionality = inject(Directionality);
    token = inject(MY_TOKEN, { optional: true })
}
@Component({
    selector: 'thy-dialog-full-content-test-component',
    template: `
        <thy-dialog-header thyTitleTranslationKey="Translation Key Title"> </thy-dialog-header>
        <thy-dialog-body thyClearPadding>
            <p>dialog body</p>
        </thy-dialog-body>
        <thy-dialog-footer thyDivided="true">
            <button thyButton="primary" (click)="ok()">确定</button>
            <button thyButton="link-secondary" (click)="close()">取消</button>
        </thy-dialog-footer>
    `,
    imports: [ThyDialogModule, ThyButtonModule]
})
export class DialogFullContentTestComponent {
    dialogRef = inject<ThyDialogRef<DialogFullContentTestComponent>>(ThyDialogRef);
    dialogInjector = inject(Injector);

    ok() {
        this.close();
    }

    close() {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'thy-dialog-restore-test-component',
    template: `
        <div class="scrollable-container">
            <div class="view-container"></div>
            <button thyButton="primary" (click)="open()">打开</button>
            <div class="view-container"></div>
        </div>
    `,
    styles: [
        `
            .scrollable-container {
                overflow-y: scroll;
                height: 500px;
            }
            .view-container {
                height: 500px;
            }
        `
    ],
    imports: [ThyDialogModule, ThyButtonModule]
})
export class DialogRestoreTestComponent {
    private thyDialog = inject(ThyDialog);

    restoreFocus = true;

    restoreFocusOptions: FocusOptions = {
        preventScroll: true
    };

    dialogRef!: ThyDialogRef<DialogFullContentTestComponent>;

    open() {
        this.dialogRef = this.thyDialog.open(DialogFullContentTestComponent, {
            restoreFocus: this.restoreFocus,
            restoreFocusOptions: this.restoreFocusOptions
        });
    }
}

@Directive({ selector: '[thyWithViewContainerTestDirective]' })
export class WithViewContainerTestDirective {
    viewContainerRef = inject(ViewContainerRef);
}

@Component({
    selector: 'thy-with-child-view-test-component',
    template: ` <div thyWithViewContainerTestDirective></div> `,
    imports: [WithViewContainerTestDirective]
})
export class WithChildViewContainerTestComponent {
    readonly childWithViewContainer = viewChild.required(WithViewContainerTestDirective);

    get childViewContainer() {
        return this.childWithViewContainer().viewContainerRef;
    }
}

@Component({
    selector: 'thy-arbitrary-component-with-template-ref-test-component',
    template: `
        <ng-template let-initialState let-dialogRef="dialogRef">
            Cheese {{ localValue }} {{ initialState?.value }}{{ setDialogRef(dialogRef) }}</ng-template
        >
    `,
    imports: [ThyDialogModule]
})
export class WithTemplateRefTestComponent {
    localValue!: string;
    dialogRef!: ThyDialogRef<any>;

    readonly templateRef = viewChild(TemplateRef);

    setDialogRef(dialogRef: ThyDialogRef<WithTemplateRefTestComponent>): string {
        this.dialogRef = dialogRef;
        return '';
    }
}

@Component({ template: '' })
export class WithInjectedDataDialogTestComponent implements OnInit {
    data!: any;

    input1 = input();

    constructor() { }

    ngOnInit() { }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello'
})
export class WithOnPushViewContainerTestComponent {
    viewContainerRef = inject(ViewContainerRef);
}

@Component({
    selector: `thy-dialog-popup-first-test-component`,
    template: `
        <thy-dialog-header thyTitle="Dialog with first"></thy-dialog-header>
        <thy-dialog-body> 第一个弹框 </thy-dialog-body>
        <thy-dialog-footer>
            <button thyButton="primary" (click)="dialogRef.close()">确定</button>
        </thy-dialog-footer>
    `,
    imports: [ThyDialogModule, ThyButtonModule]
})
class PopupFirstTestComponent {
    dialogRef = inject(ThyDialogRef);
}
@Component({
    selector: `thy-dialog-popup-second-test-component`,
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
    imports: [ThyDialogModule, ThyButtonModule]
})
class PopupSecondTestComponent {
    dialogRef = inject(ThyDialogRef);
    thyDialog = inject(ThyDialog);
    toTop() {
        this.thyDialog.toTop('first');
    }
}

@Component({
    selector: 'thy-dialog-to-top-test-component',
    template: `
        <div class="btn-pair">
            <button thyButton="primary" (click)="open()">Open Dialog</button>
        </div>
    `,
    imports: [ThyDialogModule, ThyButtonModule]
})
export class DialogToTopTestComponent implements OnInit {
    readonly popupFirst = viewChild(PopupFirstTestComponent);

    readonly popupSecond = viewChild(PopupSecondTestComponent);

    public thyDialog = inject(ThyDialog);

    public openedDialogs: SafeAny[] = [];

    public viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

    constructor() { }

    ngOnInit() { }

    open() {
        this.openDialog(PopupFirstTestComponent, 'first', this.viewContainerRef);
        this.openDialog(PopupSecondTestComponent, 'second', this.viewContainerRef);
    }

    openDialog(template?: any, id?: string, viewContainerRef?: ViewContainerRef) {
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
