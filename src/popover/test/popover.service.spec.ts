import { Component, Injector, ViewContainerRef, ViewChild, Directive, NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
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
    @ViewChild(WithViewContainerDirective, {})
    childWithViewContainer: WithViewContainerDirective;

    @ViewChild('openPopoverOrigin')
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

const TEST_COMPONENTS = [
    PopoverBasicComponent,
    PopoverSimpleContentComponent,
    WithViewContainerDirective,
    WithChildViewContainerComponent
];
@NgModule({
    declarations: TEST_COMPONENTS,
    entryComponents: [PopoverSimpleContentComponent, WithChildViewContainerComponent],
    imports: [ThyPopoverModule, NoopAnimationsModule],
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
    });
});
