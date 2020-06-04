import { ThyDialogModule, ThyDialogRef } from '..';
import {
    NgModule,
    ViewChild,
    TemplateRef,
    Component,
    Directive,
    ViewContainerRef,
    Injector,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Directionality } from '@angular/cdk/bidi';

// simple dialog component
@Component({
    selector: 'dialog-content-component',
    template: `
        <div>Hello Dialog <button>Close</button></div>
    `
})
export class DialogSimpleContentComponent {
    constructor(
        public dialogRef: ThyDialogRef<DialogSimpleContentComponent>,
        public dialogInjector: Injector,
        public directionality: Directionality
    ) {}
}

// full dialog component
@Component({
    selector: 'dialog-full-content-component',
    template: `
        <thy-dialog-header thyTitle="Install Angular"> </thy-dialog-header>
        <thy-dialog-body>
            <p>dialog body</p>
        </thy-dialog-body>
        <thy-dialog-footer thyShowBorderTop="true">
            <button thyButton="primary" (click)="ok()">确认</button>
            <button thyButton="link-secondary" (click)="close()">取消</button>
        </thy-dialog-footer>
    `
})
export class DialogFullContentComponent {
    constructor(public dialogRef: ThyDialogRef<DialogFullContentComponent>, public dialogInjector: Injector) {}

    ok() {
        this.close();
    }

    close() {
        this.dialogRef.close();
    }
}

@Directive({ selector: 'with-view-container-directive' })
export class WithViewContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
    selector: 'with-child-view-component',
    template: `
        <with-view-container-directive></with-view-container-directive>
    `
})
export class WithChildViewContainerComponent {
    @ViewChild(WithViewContainerDirective, { static: true })
    childWithViewContainer: WithViewContainerDirective;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}

@Component({
    selector: 'arbitrary-component-with-template-ref',
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
    constructor() {}

    ngOnInit() {}
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello'
})
export class WithOnPushViewContainerComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
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
    declarations: TEST_DIRECTIVES,
    entryComponents: [
        DialogSimpleContentComponent,
        DialogFullContentComponent,
        WithInjectedDataDialogComponent,
        WithChildViewContainerComponent,
        WithOnPushViewContainerComponent
        //   ComponentWithTemplateRef,
        //   ContentElementDialog,
        //   DialogWithInjectedData,
        //   DialogWithoutFocusableElements,
    ]
})
export class DialogTestModule {}
