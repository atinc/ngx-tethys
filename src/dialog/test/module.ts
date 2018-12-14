import { ThyDialogModule, ThyDialogRef } from '..';
import {
    NgModule,
    ViewChild,
    TemplateRef,
    Component,
    Directive,
    ViewContainerRef,
    Injector
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
    selector: 'arbitrary-component',
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
        <ng-template let-data let-dialogRef="dialogRef">
            Cheese {{ localValue }} {{ data?.value
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

const TEST_DIRECTIVES = [
    DialogContentComponent,
    WithViewContainerDirective,
    WithTemplateRefComponent,
    WithChildViewContainerComponent
];
@NgModule({
    imports: [ThyDialogModule, NoopAnimationsModule],
    exports: TEST_DIRECTIVES,
    declarations: TEST_DIRECTIVES,
    entryComponents: [
        DialogContentComponent,
        WithChildViewContainerComponent
        //   ComponentWithTemplateRef,
        //   PizzaMsg,
        //   ContentElementDialog,
        //   DialogWithInjectedData,
        //   DialogWithoutFocusableElements,
    ]
})
export class DialogTestModule {}
