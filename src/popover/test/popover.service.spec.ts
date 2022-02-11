import { Directionality } from '@angular/cdk/bidi';
import { CloseScrollStrategy, Overlay, OverlayContainer, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, Directive, ElementRef, Injector, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { isArray, isUndefinedOrNull } from '../../util';
import { ThyPopoverModule } from '../module';
import { ThyPopoverRef } from '../popover-ref';
import {
    THY_POPOVER_DEFAULT_CONFIG,
    THY_POPOVER_DEFAULT_CONFIG_VALUE,
    THY_POPOVER_SCROLL_STRATEGY,
    ThyPopoverConfig
} from '../popover.config';
import { ThyPopover } from '../popover.service';

@Component({
    selector: 'popover-basic',
    template: `
        <button #trigger>Open</button>
        <ng-template #customTemplate></ng-template>
    `
})
class PopoverBasicComponent {
    @ViewChild('customTemplate') template: TemplateRef<any>;

    @ViewChild('trigger') trigger: TemplateRef<any>;

    openComponentPopover() {}
}

@Directive({ selector: 'with-view-container-directive' })
class WithViewContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
    selector: 'with-child-view-container-component',
    template: `
        <with-view-container-directive></with-view-container-directive>
        <button #openPopoverOrigin>Open Popover</button>
        <button #openTemplate>open template</button>
        <ng-template #template>
            <div>template</div>
        </ng-template>
    `
})
class WithChildViewContainerComponent {
    @ViewChild(WithViewContainerDirective, { static: true })
    childWithViewContainer: WithViewContainerDirective;

    @ViewChild('openPopoverOrigin', { static: true })
    openPopoverOrigin: HTMLElement;

    @ViewChild('openTemplate', { static: true })
    openTemplate: HTMLElement;

    @ViewChild('template', { static: true })
    template: TemplateRef<any>;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}

@Component({
    selector: 'popover-simple-content-component',
    template: `
        <div>Hello Popover <button>Close</button></div>
    `
})
export class PopoverSimpleContentComponent {
    constructor(
        public popoverRef: ThyPopoverRef<PopoverSimpleContentComponent>,
        public popoverInjector: Injector,
        public directionality: Directionality
    ) {}
}

@Component({
    selector: 'popover-manual-closure-content-component',
    template: `
        <a class="btn btn1" #btn1 (click)="open1(btn1, template1)">Open1</a>
        <ng-template #template1><div class="template1">template1</div></ng-template>

        <a class="btn btn2" #btn2 (click)="open2(btn2, template2)">Open2</a>
        <ng-template #template2><div class="template2">template2</div></ng-template>

        <a class="btn btn3" #btn3 (click)="open3(btn3, template3)">Open3</a>
        <ng-template #template3><div class="template3">template3</div></ng-template>

        <a class="btn btn4" #btn4 (click)="open4(btn4, template4)">Open4</a>
        <ng-template #template4><div class="template4">template4</div></ng-template>

        <a class="btn btn5" #btn5 (click)="open5(btn5, template5)">Open5</a>
        <ng-template #template5><div class="template5">template5</div></ng-template>
    `
})
export class PopoverManualClosureContentComponent implements OnInit {
    constructor(
        public popover: ThyPopover,
        public overlay: Overlay,
        public popoverInjector: Injector,
        public directionality: Directionality
    ) {}

    public popoverRef: ThyPopoverRef<any>;

    public scrollStrategy: ScrollStrategy;

    open1(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popover.open(template, {
            origin,
            manualClosure: true
        });
    }

    open2(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popover.open(template, {
            origin,
            originActiveClass: 'active-class',
            manualClosure: true
        });
    }

    open3(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popover.open(template, {
            origin,
            originActiveClass: ['active-class2', 'active-class3']
        });
    }

    open4(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popoverRef = this.popover.open(template, {
            origin,
            hasBackdrop: false
        });
    }

    open5(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popoverRef = this.popover.open(template, {
            origin,
            scrollStrategy: this.scrollStrategy
        });
    }

    ngOnInit() {
        this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    }
}

@Component({
    selector: 'popover-outside-closable',
    template: `
        <button #outsideBtn>outside btn</button>
        <a class="btn" #openBtn (click)="open(openBtn, template)">Open</a>
        <ng-template #template><div class="template">template</div></ng-template>
    `
})
export class PopoverOutsideClosableComponent {
    constructor(
        public popover: ThyPopover,
        public overlay: Overlay,
        public popoverInjector: Injector,
        public directionality: Directionality
    ) {}

    public popoverRef: ThyPopoverRef<any>;

    @ViewChild('outsideBtn', { static: true })
    outsideBtn: ElementRef<any>;

    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    open(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popoverRef = this.popover.open(template, {
            origin,
            hasBackdrop: false,
            outsideClosable: true
        });
    }
}

@Component({
    selector: 'popover-inside-closable',
    template: `
        <a class="btn" #openBtn (click)="open(openBtn, template)">Open</a>
        <ng-template #template><div class="template">template</div></ng-template>
    `
})
export class PopoverInsideClosableComponent {
    constructor(public popover: ThyPopover) {}

    public popoverRef: ThyPopoverRef<any>;

    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    open(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popoverRef = this.popover.open(template, {
            origin,
            insideClosable: true
        });
    }
}

@Component({
    selector: 'popover-config',
    template: `
        <a class="btn" #openBtn (click)="open(openBtn, template)">Open</a>
        <ng-template #template><div class="template">template</div></ng-template>
    `
})
export class PopoverConfigComponent {
    constructor(
        public popover: ThyPopover,
        public overlay: Overlay,
        public popoverInjector: Injector,
        public directionality: Directionality
    ) {}

    public popoverRef: ThyPopoverRef<any>;

    public config: any = { hasBackdrop: false, outsideClosable: true };

    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    open(origin: HTMLElement, template: TemplateRef<HTMLElement>) {
        this.popoverRef = this.popover.open(template, {
            origin,
            ...this.config
        });
    }
}

const TEST_COMPONENTS = [
    PopoverBasicComponent,
    PopoverSimpleContentComponent,
    WithViewContainerDirective,
    WithChildViewContainerComponent,
    PopoverManualClosureContentComponent,
    PopoverOutsideClosableComponent,
    PopoverConfigComponent
];
@NgModule({
    declarations: TEST_COMPONENTS,
    entryComponents: [PopoverSimpleContentComponent, WithChildViewContainerComponent],
    imports: [ThyPopoverModule, NoopAnimationsModule, OverlayModule],
    exports: TEST_COMPONENTS
})
class PopoverTestModule {}

describe(`thyPopover`, () => {
    let popover: ThyPopover;
    let mockLocation: SpyLocation;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: Element;
    let viewContainerFixture: ComponentFixture<WithChildViewContainerComponent>;
    let overlay: Overlay;

    function getPopoverContainerElement() {
        return overlayContainerElement.querySelector(`thy-popover-container`);
    }

    function getOverlayBackdropElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    }

    function getOverlayPaneElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-pane');
    }

    function assertPopoverContainer() {
        const popoverContainerElement = getPopoverContainerElement();
        expect(popoverContainerElement.classList.contains('thy-popover-container')).toBe(true);
        expect(popoverContainerElement.getAttribute('role')).toBe('popover');
        const overlayPaneElement = getOverlayPaneElement();
        expect(overlayPaneElement).toBeTruthy();
    }

    function assertPopoverSimpleContentComponent(popoverRef: ThyPopoverRef<PopoverSimpleContentComponent>) {
        expect(overlayContainerElement.textContent).toContain('Hello Popover');
        expect(popoverRef.componentInstance instanceof PopoverSimpleContentComponent).toBe(true);
        expect(popoverRef.componentInstance.popoverRef).toBe(popoverRef);

        viewContainerFixture.detectChanges();
        assertPopoverContainer();
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PopoverTestModule],
            providers: [{ provide: Location, useClass: SpyLocation }]
        });
        TestBed.compileComponents();
    });

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('basic', () => {
        beforeEach(inject(
            [ThyPopover, Location, OverlayContainer, Overlay],
            (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer, _overlay: Overlay) => {
                popover = _popover;
                mockLocation = _location as SpyLocation;
                overlayContainer = _overlayContainer;
                overlayContainerElement = _overlayContainer.getContainerElement();
                overlay = _overlay;
            }
        ));

        beforeEach(() => {
            viewContainerFixture = TestBed.createComponent(WithChildViewContainerComponent);
            viewContainerFixture.detectChanges();
        });

        it('should open a popover with a component', () => {
            const overlayRef = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            assertPopoverSimpleContentComponent(overlayRef);
        });

        it('should get correct pane class', () => {
            popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            const paneElement = getOverlayPaneElement();
            expect(paneElement).toBeTruthy();
            expect(paneElement.classList.contains(`cdk-overlay-pane`)).toBeTruthy();
        });

        it('should open a popover with a template', () => {
            const overlayRef = popover.open(viewContainerFixture.componentInstance.template, {
                origin: viewContainerFixture.componentInstance.openTemplate
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template');
            assertPopoverContainer();
        });

        it('should closeAll when call closeAll', fakeAsync(() => {
            popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            popover.open(viewContainerFixture.componentInstance.template, {
                origin: viewContainerFixture.componentInstance.openTemplate
            });
            tick(1000);
            viewContainerFixture.detectChanges();
            let containers = overlayContainerElement.querySelectorAll(`thy-popover-container`);
            expect(containers.length).toBe(2);
            popover.closeAll();
            tick(1000);
            viewContainerFixture.detectChanges();
            containers = overlayContainerElement.querySelectorAll(`thy-popover-container`);
            expect(containers.length).toBe(0);
        }));

        it('should closeLast when call close', fakeAsync(() => {
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true
            });
            popover.open(viewContainerFixture.componentInstance.template, {
                origin: viewContainerFixture.componentInstance.openTemplate
            });

            popover.close();
            viewContainerFixture.detectChanges();
            flush();

            assertPopoverSimpleContentComponent(ref);
            expect(overlayContainerElement.textContent).not.toContain('template');
        }));

        it('should add default class to origin', () => {
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true
            });
            const element = getOverlayPaneElement();
            expect(document.querySelector('.thy-popover-origin-active')).toBeTruthy();
        });

        it('should add `active-class` to origin when originActiveClass is string', () => {
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true,
                originActiveClass: 'active-class'
            });
            expect(document.querySelector('.active-class')).toBeTruthy();
        });

        it('should add active classes to origin when originActiveClass is Array', () => {
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true,
                originActiveClass: ['active-class2', 'active-class3']
            });
            expect(document.querySelector('.active-class2')).toBeTruthy();
            expect(document.querySelector('.active-class3')).toBeTruthy();
        });

        it('should apply reposition scroll strategy when set reposition', () => {
            const scrollStrategy = overlay.scrollStrategies.reposition();
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true,
                scrollStrategy: scrollStrategy
            });
            expect(ref.componentInstance.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(scrollStrategy);
        });

        it('should close when the injectable is destroyed', fakeAsync(() => {
            const ref = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                manualClosure: true,
                originActiveClass: ['active-class2', 'active-class3']
            });

            expect(overlayContainerElement.querySelectorAll('thy-popover-container').length).toBe(1);

            popover.ngOnDestroy();
            viewContainerFixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelectorAll('thy-popover-container').length).toBe(0);
        }));
    });

    describe('manualClosure', () => {
        beforeEach(inject(
            [ThyPopover, Location, OverlayContainer, Overlay],
            (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer, _overlay: Overlay) => {
                popover = _popover;
                mockLocation = _location as SpyLocation;
                overlayContainer = _overlayContainer;
                overlayContainerElement = _overlayContainer.getContainerElement();
                overlay = _overlay;
            }
        ));

        beforeEach(() => {
            viewContainerFixture = TestBed.createComponent(WithChildViewContainerComponent);
            viewContainerFixture.detectChanges();
        });

        let viewContainerFixtureManualClosure: ComponentFixture<PopoverManualClosureContentComponent>;
        let btnElement1: HTMLElement,
            btnElement2: HTMLElement,
            btnElement3: HTMLElement,
            btnElement4: HTMLElement,
            btnElement5: HTMLElement;

        beforeEach(() => {
            viewContainerFixtureManualClosure = TestBed.createComponent(PopoverManualClosureContentComponent);
            btnElement1 = viewContainerFixtureManualClosure.nativeElement.querySelector('.btn1');
            btnElement2 = viewContainerFixtureManualClosure.nativeElement.querySelector('.btn2');
            btnElement3 = viewContainerFixtureManualClosure.nativeElement.querySelector('.btn3');
            btnElement4 = viewContainerFixtureManualClosure.nativeElement.querySelector('.btn4');
            btnElement5 = viewContainerFixtureManualClosure.nativeElement.querySelector('.btn5');
            viewContainerFixtureManualClosure.detectChanges();
        });

        it('manualClosure, open manualClosure times', () => {
            btnElement1.click();
            btnElement2.click();
            expect(document.querySelector('.template1')).toBeTruthy();
            expect(document.querySelector('.template2')).toBeTruthy();
        });

        it('not manualClosure, open manualClosure times', fakeAsync(() => {
            btnElement3.click();
            btnElement4.click();
            tick(1000);
            expect(document.querySelector('.template3')).toBeFalsy();
            expect(document.querySelector('.template4')).toBeTruthy();
        }));

        it('manualClosure and not manualClosure, mixed open', fakeAsync(() => {
            btnElement3.click();
            expect(document.querySelector('.template3')).toBeTruthy();
            btnElement1.click();
            tick(1000);
            expect(document.querySelector('.template3')).toBeFalsy();
            expect(document.querySelector('.template1')).toBeTruthy();
            btnElement3.click();
            tick(1000);
            expect(document.querySelector('.template3')).toBeTruthy();
        }));

        it('manualClosure, click the same origin again which has opened popover', fakeAsync(() => {
            btnElement1.click();
            expect(document.querySelector('.template1')).toBeTruthy();

            btnElement1.click();
            tick(1000);
            expect(document.querySelector('.template1')).toBeFalsy();
        }));

        it('not manualClosure, click the same origin again which has opened popover', fakeAsync(() => {
            btnElement4.click();
            expect(document.querySelector('.template4')).toBeTruthy();

            btnElement4.click();
            tick(1000);
            expect(document.querySelector('.template4')).toBeFalsy();
        }));
    });

    describe('outsideClosable', () => {
        let outsideClosableFixture: ComponentFixture<PopoverOutsideClosableComponent>;
        let outsideClosableComponent: PopoverOutsideClosableComponent;

        beforeEach(inject(
            [ThyPopover, Location, OverlayContainer, Overlay],
            (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer, _overlay: Overlay) => {
                popover = _popover;
                mockLocation = _location as SpyLocation;
                overlayContainer = _overlayContainer;
                overlayContainerElement = _overlayContainer.getContainerElement();
                overlay = _overlay;
            }
        ));

        beforeEach(() => {
            outsideClosableFixture = TestBed.createComponent(PopoverOutsideClosableComponent);
            outsideClosableFixture.detectChanges();
            outsideClosableComponent = outsideClosableFixture.componentInstance;
        });

        it('should close popover when click dom outside popovercontainer', fakeAsync(() => {
            outsideClosableComponent.openBtn.nativeElement.click();
            tick(1000);
            expect(document.querySelector('.template')).toBeTruthy();
            outsideClosableComponent.outsideBtn.nativeElement.click();
            tick(1000);
            expect(document.querySelector('.template')).not.toBeTruthy();
        }));

        it('should not close popover when click dom inside popovercontainer', fakeAsync(() => {
            outsideClosableComponent.openBtn.nativeElement.click();
            tick(1000);
            const innerContent = document.querySelector('.thy-popover-container') as HTMLElement;
            innerContent.click();
            tick(1000);
            expect(document.querySelector('.template')).toBeTruthy();
        }));
    });

    describe('insideClosable', () => {
        let insideClosableFixture: ComponentFixture<PopoverInsideClosableComponent>;
        let insideClosableComponent: PopoverInsideClosableComponent;

        beforeEach(inject(
            [ThyPopover, Location, OverlayContainer, Overlay],
            (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer, _overlay: Overlay) => {
                popover = _popover;
                mockLocation = _location as SpyLocation;
                overlayContainer = _overlayContainer;
                overlayContainerElement = _overlayContainer.getContainerElement();
                overlay = _overlay;
            }
        ));

        beforeEach(() => {
            insideClosableFixture = TestBed.createComponent(PopoverInsideClosableComponent);
            insideClosableFixture.detectChanges();
            insideClosableComponent = insideClosableFixture.componentInstance;
        });

        it('should close popover when click dom inside popovercontainer', fakeAsync(() => {
            insideClosableComponent.openBtn.nativeElement.click();
            tick(1000);
            const innerContent = document.querySelector('.thy-popover-container') as HTMLElement;
            innerContent.click();
            tick(1000);
            expect(document.querySelector('.template')).toBeFalsy();
        }));
    });

    describe('config', () => {
        const otherConfig: { panelClass: string[] } = { panelClass: [] };
        describe('has default config', () => {
            let popoverConfigFixture: ComponentFixture<PopoverConfigComponent>;
            let popoverConfigComponent: PopoverConfigComponent;
            let closeScrollStrategy: CloseScrollStrategy;
            const globalDefaultConfig = { hasBackdrop: false };

            beforeEach(() => {
                TestBed.overrideModule(PopoverTestModule, {
                    set: {
                        providers: [
                            {
                                provide: THY_POPOVER_SCROLL_STRATEGY,
                                deps: [Overlay],
                                useFactory: (_overlay: Overlay) => {
                                    closeScrollStrategy = _overlay.scrollStrategies.close();
                                    return () => closeScrollStrategy;
                                }
                            },
                            {
                                provide: THY_POPOVER_DEFAULT_CONFIG,
                                useValue: globalDefaultConfig
                            }
                        ]
                    }
                });
                TestBed.compileComponents();
            });

            beforeEach(inject(
                [ThyPopover, Location, OverlayContainer],
                (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer) => {
                    popover = _popover;
                    mockLocation = _location as SpyLocation;
                    overlayContainer = _overlayContainer;
                    overlayContainerElement = _overlayContainer.getContainerElement();
                }
            ));

            beforeEach(() => {
                popoverConfigFixture = TestBed.createComponent(PopoverConfigComponent);
                popoverConfigFixture.detectChanges();
                popoverConfigComponent = popoverConfigFixture.componentInstance;
            });

            it('should apply closeScrollStrategy when set close in token', () => {
                popoverConfigComponent.openBtn.nativeElement.click();
                expect(popoverConfigComponent.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(closeScrollStrategy);
            });

            it('should apply reposition scroll strategy when set reposition', () => {
                const scrollStrategy = popoverConfigComponent.overlay.scrollStrategies.reposition();
                popoverConfigComponent.config = {
                    ...popoverConfigComponent.config,
                    scrollStrategy: scrollStrategy
                };
                popoverConfigComponent.openBtn.nativeElement.click();
                expect(popoverConfigComponent.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(scrollStrategy);
            });

            it('should use the provided defaults', () => {
                popoverConfigComponent.config = {};
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const defaultConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...globalDefaultConfig, ...otherConfig };
                expect(comparePopoverConfig(defaultConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
                const paneElement = getOverlayPaneElement();
                expect(paneElement).toBeTruthy();
                expect(paneElement.classList.contains(`cdk-overlay-pane`)).toBeTruthy();
            });

            it('should be overridable by open() options', fakeAsync(() => {
                const config = { offset: 4, backdropClosable: true, closeOnNavigation: true };
                popoverConfigComponent.config = { ...config };
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const expectConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...globalDefaultConfig, ...otherConfig, ...config };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            }));
        });

        describe('not set default config', () => {
            let popoverConfigFixture: ComponentFixture<PopoverConfigComponent>;
            let popoverConfigComponent: PopoverConfigComponent;

            beforeEach(inject(
                [ThyPopover, Location, OverlayContainer],
                (_popover: ThyPopover, _location: Location, _overlayContainer: OverlayContainer) => {
                    popover = _popover;
                    mockLocation = _location as SpyLocation;
                    overlayContainer = _overlayContainer;
                    overlayContainerElement = _overlayContainer.getContainerElement();
                }
            ));

            beforeEach(() => {
                popoverConfigFixture = TestBed.createComponent(PopoverConfigComponent);
                popoverConfigFixture.detectChanges();
                popoverConfigComponent = popoverConfigFixture.componentInstance;
            });

            it('should apply blockScrollStrategy when not set scrollStrategy', () => {
                popoverConfigComponent.openBtn.nativeElement.click();
                expect(typeof popoverConfigComponent.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(
                    typeof popoverConfigComponent.overlay.scrollStrategies.block()
                );
            });

            it('should use the provided defaults', () => {
                popoverConfigComponent.config = {};
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const expectConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...otherConfig };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should hav custom panel class when panelClass is string[]', () => {
                const config = { panelClass: ['class1', 'class2'] };
                popoverConfigComponent.config = config;
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const expectConfig = {
                    ...THY_POPOVER_DEFAULT_CONFIG_VALUE,
                    ...otherConfig,
                    ...{ panelClass: ['class1', 'class2'] }
                };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should hav custom panel class when panelClass is string', () => {
                const config = { panelClass: 'panel-class' };
                popoverConfigComponent.config = config;
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const expectConfig = {
                    ...THY_POPOVER_DEFAULT_CONFIG_VALUE,
                    ...otherConfig,
                    ...{ panelClass: ['panel-class'] }
                };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should be overridable by open() options', fakeAsync(() => {
                const config = { offset: 4, backdropClosable: true, closeOnNavigation: true };
                popoverConfigComponent.config = { ...config };
                popoverConfigComponent.openBtn.nativeElement.click();
                const currentConfig = popoverConfigComponent.popoverRef.getOverlayRef().getConfig();
                const expectConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...otherConfig, ...config };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            }));
        });
    });
});

function comparePopoverConfig(expectConfig: ThyPopoverConfig, currentConfig: ThyPopoverConfig) {
    let isSame = false;
    const keys = Object.keys(THY_POPOVER_DEFAULT_CONFIG_VALUE);
    keys.forEach(key => {
        if (!isUndefinedOrNull(expectConfig[key]) && !isUndefinedOrNull(currentConfig[key])) {
            if (isArray(currentConfig[key]) && isArray(expectConfig[key])) {
                isSame = currentConfig[key].join(',') === expectConfig[key].join(',');
            } else if (expectConfig[key] !== currentConfig[key]) {
                isSame = false;
            }
        }
        return isSame;
    });
    return isSame;
}
