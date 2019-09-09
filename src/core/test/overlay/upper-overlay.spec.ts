import { ViewChild, Component, ChangeDetectorRef, Injectable, NgModule, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkPortalOutlet, PortalInjector, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';
import {
    OverlayConfig,
    OverlayRef,
    ScrollStrategy,
    OverlayContainer,
    OverlayModule,
    Overlay
} from '@angular/cdk/overlay';
import { TestBed, inject } from '@angular/core/testing';

import { ThyUpperOverlayService, ComponentTypeOrTemplateRef } from '../../overlay/upper-overlay.service';
import {
    ThyUpperOverlayConfig,
    ThyUpperOverlayOptions,
    ThyUpperOverlayPosition
} from '../../overlay/upper-overlay.config';
import { ThyUpperOverlayContainer } from '../../overlay/upper-overlay-container';
import { ThyUpperOverlayRef, ThyInternalUpperOverlayRef } from '../../overlay/upper-overlay-ref';
import { helpers } from '../../../util';
import { Directionality } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyClickPositioner } from '../../click-positioner';
import { map } from 'rxjs/operators';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

const testDialogOptions: ThyUpperOverlayOptions = {
    name: 'test-dialog',
    animationEnabled: true,
    disposeWhenClose: true
};

class TestDialogConfig<TData = any> extends ThyUpperOverlayConfig<TData> {
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
export class TestDialogContainerComponent extends ThyUpperOverlayContainer {
    config: ThyUpperOverlayConfig;

    animationOpeningDone: Observable<boolean>;

    animationClosingDone: Observable<boolean>;

    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    beforeAttachPortal(): void {}

    constructor(changeDetectorRef: ChangeDetectorRef) {
        super(testDialogOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            map((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'void';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            map((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }
}

abstract class TestDialogRef<T = undefined, TResult = undefined> extends ThyUpperOverlayRef<T, TResult> {}
class InternalTestDialogRef<T = undefined, TResult = undefined> extends ThyInternalUpperOverlayRef<T, TResult> {
    updatePosition(position?: ThyUpperOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}

@Injectable({
    providedIn: 'root'
})
export class TestDialogService extends ThyUpperOverlayService<TestDialogConfig, TestDialogContainerComponent> {
    private getOverlayPanelClasses(dialogConfig: TestDialogConfig) {
        let classes = [`cdk-overlay-pane`, `dialog-overlay-pane`];
        const size = dialogConfig.size || 'md';
        classes.push(`dialog-${size}`);
        if (dialogConfig.panelClass) {
            if (helpers.isArray(dialogConfig.panelClass)) {
                classes = classes.concat(dialogConfig.panelClass);
            } else {
                classes.push(dialogConfig.panelClass as string);
            }
        }
        return classes;
    }

    constructor(overlay: Overlay, injector: Injector, clickPositioner: ThyClickPositioner) {
        super(testDialogOptions, overlay, injector, {}, clickPositioner);
    }

    protected buildOverlayConfig(config: TestDialogConfig): OverlayConfig {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: config.scrollStrategy || this.overlay.scrollStrategies.block(),
            panelClass: this.getOverlayPanelClasses(config),
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            disposeOnNavigation: config.closeOnNavigation
        });

        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }

        return overlayConfig;
    }

    protected createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerComponent: TestDialogContainerComponent,
        config: TestDialogConfig
    ): ThyUpperOverlayRef<T, any> {
        return new InternalTestDialogRef(testDialogOptions, overlayRef, containerComponent, config);
    }

    protected attachUpperOverlayContainer(overlay: OverlayRef, config: TestDialogConfig): TestDialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[TestDialogConfig, config]]));
        const containerPortal = new ComponentPortal(TestDialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach(containerPortal);
        return containerRef.instance;
    }

    protected createInjector<T>(
        config: TestDialogConfig,
        upperOverlayRef: ThyUpperOverlayRef<T, any>,
        containerInstance: TestDialogContainerComponent
    ): PortalInjector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [TestDialogContainerComponent, containerInstance],
            [TestDialogRef, upperOverlayRef]
        ]);

        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }

    open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: TestDialogConfig<TData>
    ): TestDialogRef<T, TResult> {
        return this.openUpperOverlay(componentOrTemplateRef, config) as TestDialogRef<T, TResult>;
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

describe('upper-overlay', () => {
    let dialog: TestDialogService;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestDialogModule, NoopAnimationsModule],
            declarations: [TestDialogBasicContentComponent],
            providers: []
        });
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [TestDialogBasicContentComponent]
            }
        });

        TestBed.compileComponents();
    });

    beforeEach(inject(
        [TestDialogService, OverlayContainer],
        (_dialog: TestDialogService, _overlayContainer: OverlayContainer) => {
            dialog = _dialog;
            // mockLocation = _location as SpyLocation;
            overlayContainer = _overlayContainer;
            overlayContainerElement = _overlayContainer.getContainerElement();
        }
    ));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it(`should open test dialog`, () => {
        const dialogRef = dialog.open(TestDialogBasicContentComponent);
        expect(overlayContainerElement.textContent).toContain('Hello Test Dialog');
        expect(dialogRef.componentInstance instanceof TestDialogBasicContentComponent).toBe(true);
        expect(dialogRef.componentInstance.testDialogRef).toBe(dialogRef);
    });
});
