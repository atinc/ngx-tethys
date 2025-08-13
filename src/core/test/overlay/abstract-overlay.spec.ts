import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { Overlay, OverlayConfig, OverlayContainer, OverlayModule, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Injectable,
    Injector,
    Input,
    input,
    NgModule,
    OnDestroy,
    StaticProvider,
    ViewChild,
    ViewContainerRef,
    inject as coreInject
} from '@angular/core';
import { TestBed, fakeAsync, flush, inject } from '@angular/core/testing';
import {
    ThyAbstractOverlayContainer,
    ThyAbstractInternalOverlayRef,
    ThyAbstractOverlayRef,
    ThyAbstractOverlayConfig,
    ThyAbstractOverlayOptions,
    ThyAbstractOverlayPosition,
    ComponentTypeOrTemplateRef,
    ThyAbstractOverlayService
} from 'ngx-tethys/core';
import { helpers } from 'ngx-tethys/util';

const overlayWrapperClass = '.cdk-global-overlay-wrapper';
const dialogPaneClass = '.dialog-overlay-pane';

const testDialogOptions: ThyAbstractOverlayOptions = {
    name: 'test-dialog',
    animationEnabled: true,
    disposeWhenClose: true
};

class TestDialogConfig<TData = any> extends ThyAbstractOverlayConfig<TData> {
    scrollStrategy?: ScrollStrategy;
    /** Dialog size md, lg, sm*/
    size?: 'sm' | 'md' | 'lg';
    role?: string;
}

@Component({
    selector: 'test-dialog-container',
    template: ` <ng-template cdkPortalOutlet></ng-template> `,
    host: {
        class: 'test-dialog-container',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': 'id',
        '[attr.role]': 'config.role',
        '[attr.aria-labelledby]': 'config.ariaLabel ? null : ariaLabelledBy',
        '[attr.aria-label]': 'config.ariaLabel'
        // '[attr.aria-describedby]': 'config.ariaDescribedBy || null',
        // '[@dialogContainer]': 'animationState',
        // '(@dialogContainer.start)': 'onAnimationStart($event)',
        // '(@dialogContainer.done)': 'onAnimationDone($event)'
    },
    imports: [CdkPortalOutlet]
})
export class TestDialogContainerComponent<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements OnDestroy {
    config: ThyAbstractOverlayConfig<TData>;

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    beforeAttachPortal(): void {}

    constructor() {
        const changeDetectorRef = coreInject(ChangeDetectorRef);

        super(testDialogOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'void';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }

    ngOnDestroy() {
        super.destroy();
    }
}

abstract class TestDialogRef<T = unknown, TResult = unknown> extends ThyAbstractOverlayRef<T, TestDialogContainerComponent, TResult> {}
class InternalTestDialogRef<T = unknown, TResult = unknown, TData = unknown> extends ThyAbstractInternalOverlayRef<
    T,
    TestDialogContainerComponent<TData>,
    TResult
> {
    updatePosition(position?: ThyAbstractOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}

@Injectable()
export class TestDialogService extends ThyAbstractOverlayService<TestDialogConfig, TestDialogContainerComponent> {
    constructor() {
        const overlay = coreInject(Overlay);
        const injector = coreInject(Injector);

        super(testDialogOptions, overlay, injector, {});
    }

    protected buildOverlayConfig(config: TestDialogConfig): OverlayConfig {
        const size = config.size || 'md';
        const overlayConfig = this.buildBaseOverlayConfig(config, ['dialog-overlay-pane', `dialog-${size}`]);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected createAbstractOverlayRef<T, TResult>(
        overlayRef: OverlayRef,
        containerInstance: TestDialogContainerComponent,
        config: TestDialogConfig
    ): ThyAbstractOverlayRef<T, TestDialogContainerComponent, TResult> {
        return new InternalTestDialogRef<T, TResult>(testDialogOptions, overlayRef, containerInstance, config);
    }

    // protected createAbstractOverlayRef<T, TData>(
    //     overlayRef: OverlayRef,
    //     containerComponent: TestDialogContainerComponent<TData>,
    //     config: TestDialogConfig
    // ): ThyAbstractOverlayRef<T, TestDialogContainerComponent<TData>> {
    //     return new InternalTestDialogRef<T,>(testDialogOptions, overlayRef, containerComponent, config);
    // }

    protected attachOverlayContainer(overlay: OverlayRef, config: TestDialogConfig): TestDialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [
                {
                    provide: TestDialogConfig,
                    useValue: config
                }
            ]
        });
        const containerPortal = new ComponentPortal(TestDialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach(containerPortal);
        return containerRef.instance;
    }

    protected createInjector<T>(
        config: TestDialogConfig,
        abstractOverlayRef: ThyAbstractOverlayRef<T, any>,
        containerInstance: TestDialogContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: TestDialogContainerComponent, useValue: containerInstance },
            {
                provide: TestDialogRef,
                useValue: abstractOverlayRef
            }
        ];
        return Injector.create({ parent: userInjector || this.injector, providers: injectionTokens });
    }

    open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: TestDialogConfig<TData>
    ): TestDialogRef<T, TResult> {
        return this.openOverlay(componentOrTemplateRef, config) as TestDialogRef<T, TResult>;
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, TestDialogContainerComponent],
    exports: [],
    providers: []
})
export class TestDialogModule {}

@Component({
    selector: 'test-dialog-basic',
    template: `Hello Test Dialog<ng-content></ng-content> `,
    imports: [TestDialogModule]
})
class TestDialogBasicContentComponent {
    testDialogRef = coreInject<TestDialogRef<TestDialogBasicContentComponent>>(TestDialogRef);

    prop1: string;

    input1 = input('input1');

    inputWithSetValue: string;

    @Input('inputWithSetAlias') set inputWithSet(value: string) {
        this.inputWithSetValue = value;
    }
}

@Component({
    selector: 'test-dialog-view-container',
    template: 'Hello Test Dialog',
    imports: [TestDialogModule]
})
class TestDialogViewContainerComponent {
    private dialog = coreInject(TestDialogService);
    private viewContainerRef = coreInject(ViewContainerRef);

    open() {
        this.dialog.open(TestDialogBasicContentComponent, {
            viewContainerRef: this.viewContainerRef
        });
    }
}

describe('abstract-overlay', () => {
    let dialog: TestDialogService | undefined = undefined;
    let overlayContainer: OverlayContainer | undefined = undefined;
    let overlayContainerElement: HTMLElement | undefined = undefined;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [TestDialogService]
        });

        TestBed.compileComponents();
    });

    beforeEach(inject([TestDialogService, OverlayContainer], (_dialog: TestDialogService, _overlayContainer: OverlayContainer) => {
        dialog = _dialog;
        // mockLocation = _location as SpyLocation;
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it(`should open test dialog`, () => {
        const dialogRef = dialog.open(TestDialogBasicContentComponent);
        expect(overlayContainerElement.textContent).toContain('Hello Test Dialog');
        expect(dialogRef.componentInstance instanceof TestDialogBasicContentComponent).toBe(true);
        expect(dialogRef.componentInstance.testDialogRef).toBe(dialogRef);
    });

    it(`should destroy overlay when dialog opened with viewContainerRef`, fakeAsync(() => {
        const fixture = TestBed.createComponent(TestDialogViewContainerComponent);
        const component = fixture.componentInstance;
        component.open();
        expect(overlayContainerElement.querySelector(overlayWrapperClass)).toBeTruthy();
        expect(overlayContainerElement.querySelector(dialogPaneClass)).toBeTruthy();
        fixture.destroy();
        flush();
        expect(overlayContainerElement.querySelector(overlayWrapperClass)).toBeFalsy();
        expect(overlayContainerElement.querySelector(dialogPaneClass)).toBeFalsy();
    }));

    it(`should open test dialog with initialState`, () => {
        const prop1Value = helpers.generateRandomStr();
        const input1Value = helpers.generateRandomStr();
        const inputValueWithSet = helpers.generateRandomStr();
        const dialogRef = dialog.open(TestDialogBasicContentComponent, {
            initialState: {
                prop1: prop1Value,
                input1: input1Value,
                inputWithSet: inputValueWithSet
            }
        });
        expect(overlayContainerElement.textContent).toContain('Hello Test Dialog');
        expect(dialogRef.componentInstance instanceof TestDialogBasicContentComponent).toBe(true);
        expect(dialogRef.componentInstance.prop1).toBe(prop1Value);
        expect(dialogRef.componentInstance.input1()).toBe(input1Value);
        expect(dialogRef.componentInstance.inputWithSetValue).toBe(inputValueWithSet);
    });

    it(`should open test dialog with initialState alias input`, () => {
        const inputValue = helpers.generateRandomStr();
        const dialogRef = dialog.open(TestDialogBasicContentComponent, {
            initialState: {
                inputWithSetAlias: inputValue
            }
        });
        expect(overlayContainerElement.textContent).toContain('Hello Test Dialog');
        expect(dialogRef.componentInstance instanceof TestDialogBasicContentComponent).toBe(true);
        expect(dialogRef.componentInstance.inputWithSetValue).toBe(inputValue);
    });

    it(`should open test dialog with projectableNodes`, () => {
        const divElement = document.createElement('div');
        divElement.innerText = ' Content for projectableNodes';
        const dialogRef = dialog.open(TestDialogBasicContentComponent, {
            projectableNodes: [[divElement]]
        });
        expect(overlayContainerElement.textContent).toContain('Hello Test Dialog Content for projectableNodes');
        expect(dialogRef.componentInstance instanceof TestDialogBasicContentComponent).toBe(true);
        expect(dialogRef.componentInstance.testDialogRef).toBe(dialogRef);
    });

    describe('paneClass', () => {
        it('should get incorrect default pane classes', () => {
            dialog.open(TestDialogBasicContentComponent);
            const paneElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(paneElement).toBeTruthy();
            expect(paneElement.classList.contains('dialog-overlay-pane')).toBeTruthy();
            expect(paneElement.classList.contains('dialog-md')).toBeTruthy();
        });

        it('should get custom pane class "one-class"', () => {
            dialog.open(TestDialogBasicContentComponent, { panelClass: 'one-class' });
            const paneElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(paneElement.classList.contains('dialog-overlay-pane')).toBeTruthy();
            expect(paneElement.classList.contains('dialog-md')).toBeTruthy();
            expect(paneElement.classList.contains('one-class')).toBeTruthy();
        });

        it('should get custom pane classes ["one-class", "two-class"]', () => {
            dialog.open(TestDialogBasicContentComponent, { panelClass: ['one-class', 'two-class'] });
            const paneElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(paneElement.classList.contains('dialog-overlay-pane')).toBeTruthy();
            expect(paneElement.classList.contains('dialog-md')).toBeTruthy();
            expect(paneElement.classList.contains('one-class')).toBeTruthy();
            expect(paneElement.classList.contains('two-class')).toBeTruthy();
        });
    });

    describe('hostClass', () => {
        it('should have not class when hostClass is null', () => {
            dialog.open(TestDialogBasicContentComponent);
            const basicContentComponent = overlayContainerElement.querySelector('test-dialog-basic');
            expect(basicContentComponent.classList.length).toEqual(0);
        });

        it('should get custom host class "test-dialog-content"', () => {
            dialog.open(TestDialogBasicContentComponent, { hostClass: 'test-dialog-content' });
            const basicContentComponent = overlayContainerElement.querySelector('test-dialog-basic');
            expect(basicContentComponent.classList.contains('test-dialog-content')).toBeTruthy();
        });

        it('should get custom host classes ["test-dialog-content", "another-test-dialog-content"]', () => {
            dialog.open(TestDialogBasicContentComponent, { hostClass: ['test-dialog-content', 'another-test-dialog-content'] });
            const basicContentComponent = overlayContainerElement.querySelector('test-dialog-basic');
            expect(basicContentComponent.classList.contains('test-dialog-content')).toBeTruthy();
            expect(basicContentComponent.classList.contains('another-test-dialog-content')).toBeTruthy();
        });
    });
});
