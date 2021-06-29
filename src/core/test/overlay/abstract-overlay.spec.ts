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
    NgModule,
    OnDestroy,
    StaticProvider,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyClickPositioner } from '../../click-positioner';
import { ThyAbstractOverlayContainer } from '../../overlay/abstract-overlay-container';
import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from '../../overlay/abstract-overlay-ref';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions, ThyAbstractOverlayPosition } from '../../overlay/abstract-overlay.config';
import { ComponentTypeOrTemplateRef, ThyAbstractOverlayService } from '../../overlay/abstract-overlay.service';

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
    template: `
        <ng-template cdkPortalOutlet></ng-template>
    `,
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
    }
})
export class TestDialogContainerComponent extends ThyAbstractOverlayContainer implements OnDestroy {
    config: ThyAbstractOverlayConfig;

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    beforeAttachPortal(): void {}

    constructor(changeDetectorRef: ChangeDetectorRef) {
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

abstract class TestDialogRef<T = undefined, TResult = undefined> extends ThyAbstractOverlayRef<T, TestDialogContainerComponent, TResult> {}
class InternalTestDialogRef<T = undefined, TResult = undefined> extends ThyAbstractInternalOverlayRef<
    T,
    TestDialogContainerComponent,
    TResult
> {
    updatePosition(position?: ThyAbstractOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}

@Injectable()
export class TestDialogService extends ThyAbstractOverlayService<TestDialogConfig, TestDialogContainerComponent> {
    constructor(overlay: Overlay, injector: Injector, clickPositioner: ThyClickPositioner) {
        super(testDialogOptions, overlay, injector, {});
    }

    protected buildOverlayConfig(config: TestDialogConfig): OverlayConfig {
        const size = config.size || 'md';
        const overlayConfig = this.buildBaseOverlayConfig(config, ['dialog-overlay-pane', `dialog-${size}`]);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected createAbstractOverlayRef<T>(
        overlayRef: OverlayRef,
        containerComponent: TestDialogContainerComponent,
        config: TestDialogConfig
    ): ThyAbstractOverlayRef<T, any> {
        return new InternalTestDialogRef(testDialogOptions, overlayRef, containerComponent, config);
    }

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
    declarations: [TestDialogContainerComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    entryComponents: [TestDialogContainerComponent],
    exports: [],
    providers: []
})
export class TestDialogModule {}

@Component({
    selector: 'test-dialog-basic',
    template: 'Hello Test Dialog'
})
class TestDialogBasicContentComponent {
    constructor(public testDialogRef: TestDialogRef<TestDialogBasicContentComponent>) {}
}

@Component({
    selector: 'test-dialog-view-container',
    template: 'Hello Test Dialog'
})
class TestDialogViewContainerComponent {
    constructor(private dialog: TestDialogService, private viewContainerRef: ViewContainerRef) {}

    open() {
        this.dialog.open(TestDialogBasicContentComponent, {
            viewContainerRef: this.viewContainerRef
        });
    }
}

describe('abstract-overlay', () => {
    let dialog: TestDialogService;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestDialogModule, NoopAnimationsModule],
            declarations: [TestDialogBasicContentComponent, TestDialogViewContainerComponent],
            providers: []
        });
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [TestDialogBasicContentComponent, TestDialogViewContainerComponent]
            }
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
});
