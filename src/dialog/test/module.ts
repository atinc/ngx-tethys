import { Directionality } from '@angular/cdk/bidi';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    Injector,
    input,
    NgModule,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    inject
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialog, ThyDialogModule, ThyDialogRef } from '../';

// simple dialog component
@Component({
    selector: 'thy-dialog-content-component',
    template: ` <div>Hello Dialog <button>Close</button></div> `
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
    `
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
    ]
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

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'thy-with-view-container-directive' })
export class WithViewContainerDirective {
    viewContainerRef = inject(ViewContainerRef);
}

@Component({
    selector: 'thy-with-child-view-component',
    template: ` <thy-with-view-container-directive></thy-with-view-container-directive> `
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
    `
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

@Component({ template: '' })
export class WithInjectedDataDialogComponent implements OnInit {
    data: any;

    input1 = input();

    constructor() {}

    ngOnInit() {}
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello'
})
export class WithOnPushViewContainerComponent {
    viewContainerRef = inject(ViewContainerRef);
}

const TEST_DIRECTIVES = [
    DialogSimpleContentComponent,
    DialogFullContentComponent,
    WithViewContainerDirective,
    WithTemplateRefComponent,
    WithChildViewContainerComponent,
    WithInjectedDataDialogComponent,
    WithOnPushViewContainerComponent
];
@NgModule({
    imports: [ThyDialogModule, NoopAnimationsModule],
    exports: TEST_DIRECTIVES,
    declarations: TEST_DIRECTIVES
})
export class DialogTestModule {}
