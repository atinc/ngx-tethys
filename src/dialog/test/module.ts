import { Directionality } from '@angular/cdk/bidi';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    inject,
    Injector,
    input,
    NgModule,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDialog, ThyDialogModule, ThyDialogRef } from '../';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// simple dialog component
@Component({
    selector: 'thy-dialog-content-component',
    template: ` <div>Hello Dialog <button>Close</button></div> `,
    standalone: false
})
export class DialogSimpleContentComponent {
    dialogRef = inject<ThyDialogRef<DialogSimpleContentComponent>>(ThyDialogRef);
    dialogInjector = inject(Injector);
    directionality = inject(Directionality);
}

// full dialog component
@Component({
    selector: 'thy-dialog-full-content-component',
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
    standalone: false
})
export class DialogFullContentComponent {
    dialogRef = inject<ThyDialogRef<DialogFullContentComponent>>(ThyDialogRef);
    dialogInjector = inject(Injector);

    ok() {
        this.close();
    }

    close() {
        this.dialogRef.close();
    }
}

// dialog
@Component({
    selector: 'thy-dialog-restore-component',
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
    standalone: false
})
export class DialogRestoreComponent {
    private thyDialog = inject(ThyDialog);

    restoreFocus = true;

    restoreFocusOptions: FocusOptions = {
        preventScroll: true
    };

    dialogRef: ThyDialogRef<DialogFullContentComponent>;

    open() {
        this.dialogRef = this.thyDialog.open(DialogFullContentComponent, {
            restoreFocus: this.restoreFocus,
            restoreFocusOptions: this.restoreFocusOptions
        });
    }
}

@Directive({
    selector: '[thyWithViewContainer]',
    standalone: false
})
export class WithViewContainerDirective {
    viewContainerRef = inject(ViewContainerRef);
}

@Component({
    selector: 'thy-with-child-view-component',
    template: ` <div thyWithViewContainer></div> `,
    standalone: false
})
export class WithChildViewContainerComponent {
    @ViewChild(WithViewContainerDirective, { static: true })
    childWithViewContainer: WithViewContainerDirective;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}

@Component({
    selector: 'thy-arbitrary-component-with-template-ref',
    template: `
        <ng-template let-initialState let-dialogRef="dialogRef">
            Cheese {{ localValue }} {{ initialState?.value }}{{ setDialogRef(dialogRef) }}</ng-template
        >
    `,
    standalone: false
})
export class WithTemplateRefComponent {
    localValue: string;
    dialogRef: ThyDialogRef<any>;

    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

    setDialogRef(dialogRef: ThyDialogRef<WithTemplateRefComponent>): string {
        this.dialogRef = dialogRef;
        return '';
    }
}

@Component({
    template: '',
    standalone: false
})
export class WithInjectedDataDialogComponent implements OnInit {
    data: any;

    input1 = input();

    constructor() {}

    ngOnInit() {}
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello',
    standalone: false
})
export class WithOnPushViewContainerComponent {
    viewContainerRef = inject(ViewContainerRef);
}

//  multi dialog component
@Component({
    selector: `thy-dialog-popup-first-component`,
    template: `
        <thy-dialog-header thyTitle="Dialog with first"></thy-dialog-header>
        <thy-dialog-body> 第一个弹框 </thy-dialog-body>
        <thy-dialog-footer>
            <button thyButton="primary" (click)="dialogRef.close()">确定</button>
        </thy-dialog-footer>
    `,
    standalone: false
})
class PopupFirstComponent {
    dialogRef = inject(ThyDialogRef);
}
@Component({
    selector: `thy-dialog-popup-second-component`,
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
    standalone: false
})
class PopupSecondComponent {
    dialogRef = inject(ThyDialogRef);
    thyDialog = inject(ThyDialog);
    toTop() {
        this.thyDialog.toTop('first');
    }
}

@Component({
    selector: 'thy-dialog-to-top-component',
    template: `
        <div class="btn-pair">
            <button thyButton="primary" (click)="open()">Open Dialog</button>
        </div>
    `,
    standalone: false
})
export class DialogToTopComponent implements OnInit {
    @ViewChild(PopupFirstComponent, { static: true }) popupFirst: PopupFirstComponent;

    @ViewChild(PopupSecondComponent, { static: true }) popupSecond: PopupSecondComponent;

    public thyDialog = inject(ThyDialog);

    public openedDialogs: SafeAny[] = [];

    constructor(public viewContainerRef: ViewContainerRef) {}
    ngOnInit() {}
    open() {
        this.openDialog(PopupFirstComponent, 'first', this.viewContainerRef);
        this.openDialog(PopupSecondComponent, 'second', this.viewContainerRef);
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

const TEST_DIRECTIVES = [
    DialogSimpleContentComponent,
    DialogFullContentComponent,
    WithViewContainerDirective,
    WithTemplateRefComponent,
    WithChildViewContainerComponent,
    WithInjectedDataDialogComponent,
    WithOnPushViewContainerComponent,
    DialogToTopComponent
];
@NgModule({
    imports: [ThyDialogModule, NoopAnimationsModule],
    providers: [provideHttpClient(), provideHttpClientTesting()],
    exports: TEST_DIRECTIVES,
    declarations: TEST_DIRECTIVES
})
export class DialogTestModule {}
