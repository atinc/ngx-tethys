import { Directionality } from '@angular/cdk/bidi';
import { CloseScrollStrategy, Overlay, OverlayContainer, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, Directive, ElementRef, Injector, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyPopoverModule } from '../module';
import { ThyPopoverRef } from '../popover-ref';
import { THY_POPOVER_DEFAULT_CONFIG } from '../popover.config';
import { ThyPopover } from '../popover.service';

@Component({
    selector: 'popover-basic',
    template: `
        <button (click)="openComponentPopover()">Open</button>
    `
})
class PopoverBasicComponent {
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
    `
})
class WithChildViewContainerComponent {
    @ViewChild(WithViewContainerDirective, { static: true })
    childWithViewContainer: WithViewContainerDirective;

    @ViewChild('openPopoverOrigin', { static: true })
    openPopoverOrigin: HTMLElement;

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
            origin
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

const TEST_COMPONENTS = [
    PopoverBasicComponent,
    PopoverSimpleContentComponent,
    WithViewContainerDirective,
    WithChildViewContainerComponent,
    PopoverManualClosureContentComponent,
    PopoverOutsideClosableComponent
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

    function getPopoverContainerElement() {
        return overlayContainerElement.querySelector(`thy-popover-container`);
    }

    function getOverlayBackdropElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    }

    function getOverlayPaneElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-pane');
    }

    function assertPopoverSimpleContentComponent(popoverRef: ThyPopoverRef<PopoverSimpleContentComponent>) {
        expect(overlayContainerElement.textContent).toContain('Hello Popover');
        expect(popoverRef.componentInstance instanceof PopoverSimpleContentComponent).toBe(true);
        expect(popoverRef.componentInstance.popoverRef).toBe(popoverRef);

        viewContainerFixture.detectChanges();
        const popoverContainerElement = getPopoverContainerElement();
        expect(popoverContainerElement.classList.contains('thy-popover-container')).toBe(true);
        expect(popoverContainerElement.getAttribute('role')).toBe('popover');
        const overlayPaneElement = getOverlayPaneElement();
        expect(overlayPaneElement).toBeTruthy();
    }

    describe('manualClosure', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PopoverTestModule],
                providers: [{ provide: Location, useClass: SpyLocation }]
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

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

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

        it('closeAll', fakeAsync(() => {
            btnElement1.click();
            btnElement3.click();
            popover.closeAll();
            tick(1000);
            viewContainerFixtureManualClosure.detectChanges();
            expect(document.querySelector('.template1')).toBeFalsy();
            expect(document.querySelector('.template3')).toBeFalsy();
        }));

        it('closeLast', fakeAsync(() => {
            btnElement1.click();
            btnElement2.click();
            btnElement3.click();
            popover.close();
            tick(1000);
            viewContainerFixtureManualClosure.detectChanges();
            expect(document.querySelector('.template1')).toBeTruthy();
            expect(document.querySelector('.template2')).toBeTruthy();
            expect(document.querySelector('.template3')).toBeFalsy();
        }));

        // it('closeLast 2', fakeAsync(() => {
        //     btnElement1.click();
        //     btnElement2.click();
        //     btnElement3.click();
        //     popover.closeLast(2);
        //     tick(1000);
        //     viewContainerFixtureManualClosure.detectChanges();
        //     expect(document.querySelector('.template1')).toBeTruthy();
        //     expect(document.querySelector('.template2')).toBeFalsy();
        //     expect(document.querySelector('.template3')).toBeFalsy();
        // }));

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

        it('origin add active className, default', () => {
            btnElement1.click();
            const element = getOverlayPaneElement();
            expect(document.querySelector('.thy-popover-origin-active')).toBeTruthy();
        });

        it('origin add active className, originActiveClass', () => {
            btnElement2.click();
            expect(document.querySelector('.active-class')).toBeTruthy();
        });

        it('origin add active className, originActiveClass with Array', () => {
            btnElement3.click();
            expect(document.querySelector('.active-class2')).toBeTruthy();
            expect(document.querySelector('.active-class3')).toBeTruthy();
        });

        it('should apply reposition scroll strategy when set reposition', () => {
            btnElement5.click();
            expect(viewContainerFixtureManualClosure.componentInstance.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(
                viewContainerFixtureManualClosure.componentInstance.scrollStrategy
            );
        });
    });

    describe('outsideClosable', () => {
        let outsideClosableFixture: ComponentFixture<PopoverOutsideClosableComponent>;
        let outsideClosableComponent: PopoverOutsideClosableComponent;
        let closeScrollStrategy: CloseScrollStrategy;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PopoverTestModule],
                providers: [
                    { provide: Location, useClass: SpyLocation },
                    {
                        provide: THY_POPOVER_DEFAULT_CONFIG,
                        deps: [Overlay],
                        useFactory: (overlay: Overlay) => {
                            return () => {
                                closeScrollStrategy = overlay.scrollStrategies.close();
                                return {
                                    scrollStrategy: closeScrollStrategy
                                };
                            };
                        }
                    }
                ]
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

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

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

    describe('config', () => {
        describe('has default config', () => {
            let outsideClosableFixture: ComponentFixture<PopoverOutsideClosableComponent>;
            let outsideClosableComponent: PopoverOutsideClosableComponent;
            let closeScrollStrategy: CloseScrollStrategy;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [PopoverTestModule],
                    providers: [
                        { provide: Location, useClass: SpyLocation },
                        {
                            provide: THY_POPOVER_DEFAULT_CONFIG,
                            deps: [Overlay],
                            useFactory: (overlay: Overlay) => {
                                return () => {
                                    closeScrollStrategy = overlay.scrollStrategies.close();
                                    return {
                                        scrollStrategy: closeScrollStrategy
                                    };
                                };
                            }
                        }
                    ]
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
                outsideClosableFixture = TestBed.createComponent(PopoverOutsideClosableComponent);
                outsideClosableFixture.detectChanges();
                outsideClosableComponent = outsideClosableFixture.componentInstance;
            });

            afterEach(() => {
                overlayContainer.ngOnDestroy();
            });

            it('should apply closeScrollStrategy when set close in token', () => {
                outsideClosableComponent.openBtn.nativeElement.click();
                expect(outsideClosableComponent.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(closeScrollStrategy);
            });
        });

        describe('not set default config', () => {
            let outsideClosableFixture: ComponentFixture<PopoverOutsideClosableComponent>;
            let outsideClosableComponent: PopoverOutsideClosableComponent;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [PopoverTestModule],
                    providers: [{ provide: Location, useClass: SpyLocation }]
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
                outsideClosableFixture = TestBed.createComponent(PopoverOutsideClosableComponent);
                outsideClosableFixture.detectChanges();
                outsideClosableComponent = outsideClosableFixture.componentInstance;
            });

            afterEach(() => {
                overlayContainer.ngOnDestroy();
            });

            it('should apply blockScrollStrategy when not set scrollStrategy', () => {
                outsideClosableComponent.openBtn.nativeElement.click();
                expect(outsideClosableComponent.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(
                    outsideClosableComponent.overlay.scrollStrategies.block()
                );
            });
        });
    });
});
