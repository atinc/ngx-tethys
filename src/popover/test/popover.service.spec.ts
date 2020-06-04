import { Component, Injector, ViewContainerRef, ViewChild, Directive, NgModule, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayContainer, Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, inject, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyPopoverModule } from '../module';
import { ThyPopover } from '../popover.service';
import { ThyPopoverRef } from '../popover-ref';
import { Directionality } from '@angular/cdk/bidi';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

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

        <a class="btn btn5" #btn5 (click)="open5(btn5, template5)">Open4</a>
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
        this.popover.open(template, {
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
    describe('basic', () => {
        let popover: ThyPopover;
        let mockLocation: SpyLocation;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: Element;
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

        let viewContainerFixture: ComponentFixture<WithChildViewContainerComponent>;

        beforeEach(() => {
            viewContainerFixture = TestBed.createComponent(WithChildViewContainerComponent);
            viewContainerFixture.detectChanges();
        });

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

        it('should open a popover with a component', () => {
            const overlayRef = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            assertPopoverSimpleContentComponent(overlayRef);
        });

        describe('manualClosure', () => {
            let viewContainerFixtureManualClosure: ComponentFixture<PopoverManualClosureContentComponent>;
            let btnElement1, btnElement2, btnElement3, btnElement4, btnElement5;

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

            it('apply reposition scroll strategy', () => {
                btnElement5.click();
                expect(viewContainerFixtureManualClosure.componentInstance.popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(
                    viewContainerFixtureManualClosure.componentInstance.scrollStrategy
                );
            });
        });

        describe('outsideClosable', () => {
            let outsideClosableFixture: ComponentFixture<PopoverOutsideClosableComponent>;
            let outsideClosableComponent: PopoverOutsideClosableComponent;
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
        });
    });
});
