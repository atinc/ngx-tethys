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

@Component({
    selector: 'dialog-content-component',
    template: `
        <div>Hello Dialog</div>
    `
})
export class DialogContentComponent {
    constructor(
        public dialogRef: ThyDialogRef<DialogContentComponent>,
        public dialogInjector: Injector
    ) {}
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
    @ViewChild(WithViewContainerDirective)
    childWithViewContainer: WithViewContainerDirective;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}

@Component({
    selector: 'arbitrary-component-with-template-ref',
    template: `
        <ng-template let-initialState let-dialogRef="dialogRef">
            Cheese {{ localValue }} {{ initialState?.value
            }}{{ setDialogRef(dialogRef) }}</ng-template
        >
    `
})
export class WithTemplateRefComponent {
    localValue: string;
    dialogRef: ThyDialogRef<any>;

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    setDialogRef(dialogRef: ThyDialogRef<any>): string {
        this.dialogRef = dialogRef;
        return '';
    }
}

@Component({ template: '' })
export class WithInjectedDataDialogComponent implements OnInit {
    data: any;
    constructor() {
        // console.log(`WithInjectedDataDialogComponent constructor`);
    }

    ngOnInit() {
        // console.log(`WithInjectedDataDialogComponent ngOnInit`);
        // console.log(this.data);
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: 'hello'
})
export class WithOnPushViewContainerComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}

const TEST_DIRECTIVES = [
    DialogContentComponent,
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
        DialogContentComponent,
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
