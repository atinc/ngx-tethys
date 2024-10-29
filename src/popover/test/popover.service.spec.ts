import { ContentObserver } from '@angular/cdk/observers';
import { CloseScrollStrategy, Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    Injector,
    NgModule,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    inject as coreInject
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Subject } from 'rxjs';

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
    selector: 'thy-popover-basic',
    template: `
        <button #trigger>Open</button>
        <ng-template #customTemplate></ng-template>
    `
})
class PopoverBasicComponent {
    @ViewChild('customTemplate') template: TemplateRef<any>;

    @ViewChild('trigger') trigger: TemplateRef<any>;
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'thy-with-view-container-directive' })
class WithViewContainerDirective {
    viewContainerRef = coreInject(ViewContainerRef);
}

@Component({
    selector: 'thy-with-child-view-container-component',
    template: `
        <thy-with-view-container-directive></thy-with-view-container-directive>
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
    selector: 'thy-popover-simple-content-component',
    template: `
        <div class="simple-content-test">
            Hello Popover <button>Close</button>
            <ul>
                @for (item of demos; track $index) {
                    <li>
                        <a href="javascript:;">
                            <span thyDropdownMenuItemName>图标{{ item }}</span>
                        </a>
                    </li>
                }
            </ul>
        </div>
    `
})
export class PopoverSimpleContentComponent {
    popoverRef = coreInject<ThyPopoverRef<PopoverSimpleContentComponent>>(ThyPopoverRef);
    popoverInjector = coreInject(Injector);
    private cdr = coreInject(ChangeDetectorRef);

    demos: number[];

    updateContent() {
        this.demos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        this.cdr.detectChanges();
    }
}

@Component({
    selector: 'thy-popover-manual-closure-content-component',
    template: `
        <a class="btn" #btn1>Open1</a>
        <ng-template #template1><div class="template1">template1</div></ng-template>

        <a class="btn" #btn2>Open2</a>
        <ng-template #template2><div class="template2">template2</div></ng-template>
    `
})
export class PopoverManualClosureContentComponent {
    popover = coreInject(ThyPopover);
    overlay = coreInject(Overlay);
    popoverInjector = coreInject(Injector);

    @ViewChild('btn1', { static: true })
    btn1: HTMLElement;

    @ViewChild('btn2', { static: true })
    btn2: HTMLElement;

    @ViewChild('template1', { static: true }) template1: TemplateRef<any>;

    @ViewChild('template2', { static: true }) template2: TemplateRef<any>;
}

@Component({
    selector: 'thy-popover-outside-closable',
    template: `
        <button #outsideBtn>outside btn</button>
        <a class="btn" #openBtn>Open</a>
        <ng-template #template><div class="template">template</div></ng-template>
    `
})
export class PopoverOutsideClosableComponent {
    @ViewChild('outsideBtn', { static: true })
    outsideBtn: ElementRef<any>;

    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    @ViewChild('template', { static: true })
    template: TemplateRef<any>;
}

@Component({
    selector: 'thy-popover-inside-closable',
    template: `
        <a class="btn" #openBtn>Open</a>
        <ng-template #template><div #innerContent>template</div></ng-template>
    `
})
export class PopoverInsideClosableComponent {
    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    @ViewChild('template', { static: true })
    template: TemplateRef<any>;
}

@Component({
    selector: 'thy-popover-config',
    template: `
        <a class="btn" #openBtn>Open</a>
        <ng-template #template><div class="template">template</div></ng-template>
    `
})
export class PopoverConfigComponent {
    popover = coreInject(ThyPopover);
    overlay = coreInject(Overlay);

    public popoverRef: ThyPopoverRef<any>;

    @ViewChild('openBtn', { static: true })
    openBtn: ElementRef<any>;

    @ViewChild('template', { static: true })
    template: TemplateRef<any>;
}

const TEST_COMPONENTS = [
    PopoverBasicComponent,
    PopoverSimpleContentComponent,
    WithViewContainerDirective,
    WithChildViewContainerComponent,
    PopoverManualClosureContentComponent,
    PopoverOutsideClosableComponent,
    PopoverInsideClosableComponent,
    PopoverConfigComponent
];
@NgModule({
    declarations: TEST_COMPONENTS,
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

        it('should be able to find a popover by id', fakeAsync(() => {
            const popoverRef = popover.open(PopoverSimpleContentComponent, {
                id: 'pizza',
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            expect(popover.getPopoverById('pizza')).toBe(popoverRef);
            expect(popover.getPopoverById('pizza').updatePosition()).toBeTruthy();
        }));

        it('should get correct openedPopovers', fakeAsync(() => {
            const popoverRef = popover.open(PopoverSimpleContentComponent, {
                id: 'pizza',
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            const openedPopover = popover.getOpenedPopovers();
            expect(openedPopover.length).toEqual(1);
            expect(openedPopover[0]).toEqual(popoverRef);

            const popoverRef1 = popover.open(PopoverSimpleContentComponent, {
                id: 'hamburg',
                origin: viewContainerFixture.componentInstance.openTemplate
            });

            tick(1000);
            viewContainerFixture.detectChanges();
            expect(openedPopover.length).toEqual(2);
            expect(openedPopover[1]).toEqual(popoverRef1);
            flush();
        }));

        it('should find the closest dialog', fakeAsync(() => {
            const popoverRef = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            viewContainerFixture.detectChanges();
            const element = getPopoverContainerElement() as HTMLElement;
            tick(1000);
            viewContainerFixture.detectChanges();
            expect(popover.getClosestPopover(element.querySelector('thy-popover-simple-content-component'))).toBeTruthy();
        }));

        it('should find the null', fakeAsync(() => {
            const popoverRef = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin
            });
            viewContainerFixture.detectChanges();
            const element = getPopoverContainerElement() as HTMLElement;
            tick(1000);
            viewContainerFixture.detectChanges();
            element.querySelector('thy-popover-simple-content-component').closest('.thy-popover-container').removeAttribute('id');
            expect(popover.getClosestPopover(element.querySelector('thy-popover-simple-content-component'))).toBe(null);
        }));

        it('should update position when autoAdaptive is true', fakeAsync(() => {
            const contentObserver = TestBed.inject(ContentObserver);
            const observeSubject = new Subject<void>();
            let containerElementRef: ElementRef<HTMLElement> = null;
            spyOn(contentObserver, 'observe').and.callFake((_containerElementRef: ElementRef<HTMLElement>) => {
                containerElementRef = _containerElementRef;
                return observeSubject;
            });

            expect(containerElementRef).toBeFalsy();
            const popoverRef = popover.open(PopoverSimpleContentComponent, {
                origin: viewContainerFixture.componentInstance.openPopoverOrigin,
                autoAdaptive: true,
                placement: 'top'
            });
            viewContainerFixture.detectChanges();
            expect(containerElementRef).toBeTruthy();
            expect(containerElementRef.nativeElement.classList.contains('thy-popover-container')).toBeTruthy();
            const spyUpdatePosition = spyOn(popoverRef, 'updatePosition');
            expect(spyUpdatePosition).not.toHaveBeenCalled();
            // Need mock content observe change because MutationObserver not patched by zone.js in fakeAsync
            // detail issue: https://github.com/angular/angular/issues/31695
            observeSubject.next();
            expect(spyUpdatePosition).toHaveBeenCalled();
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
        let btn1: HTMLElement, btn2: HTMLElement;
        let template1: TemplateRef<any>, template2: TemplateRef<any>;

        beforeEach(() => {
            viewContainerFixtureManualClosure = TestBed.createComponent(PopoverManualClosureContentComponent);
            const instance = viewContainerFixtureManualClosure.componentInstance;

            btn1 = instance.btn1;
            btn2 = instance.btn2;

            template1 = instance.template1;
            template2 = instance.template2;

            viewContainerFixtureManualClosure.detectChanges();
        });

        it('manualClosure, open manualClosure times', () => {
            popover.open(template1, {
                origin: btn1,
                manualClosure: true
            });
            popover.open(template2, {
                origin: btn2,
                manualClosure: true
            });

            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template1');
            expect(overlayContainerElement.textContent).toContain('template2');
        });

        it('not manualClosure, open manualClosure times', fakeAsync(() => {
            popover.open(template1, {
                origin: btn1
            });
            popover.open(template2, {
                origin: btn2
            });

            viewContainerFixtureManualClosure.detectChanges();
            tick(1000);
            expect(overlayContainerElement.textContent).not.toContain('template1');
            expect(overlayContainerElement.textContent).toContain('template2');
        }));

        it('manualClosure and not manualClosure, mixed open', fakeAsync(() => {
            popover.open(template1, {
                origin: btn1
            });
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template1');

            popover.open(template2, {
                origin: btn2,
                manualClosure: true
            });
            viewContainerFixtureManualClosure.detectChanges();
            tick(1000);
            expect(overlayContainerElement.textContent).not.toContain('template1');
            expect(overlayContainerElement.textContent).toContain('template2');

            popover.open(template1, {
                origin: btn1
            });
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template1');
        }));

        it('manualClosure, click the same origin again which has opened popover', fakeAsync(() => {
            popover.open(template1, {
                origin: btn1,
                manualClosure: true
            });
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template1');

            popover.open(template1, {
                origin: btn1,
                manualClosure: true
            });
            tick(1000);
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).not.toContain('template1');
        }));

        it('not manualClosure, click the same origin again which has opened popover', fakeAsync(() => {
            popover.open(template1, {
                origin: btn1,
                hasBackdrop: false
            });
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template1');

            popover.open(template1, {
                origin: btn1,
                hasBackdrop: false
            });
            tick(1000);
            viewContainerFixtureManualClosure.detectChanges();
            expect(overlayContainerElement.textContent).not.toContain('template1');
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

        it('should close popover when click dom outside popover container', fakeAsync(() => {
            popover.open(outsideClosableComponent.template, {
                origin: outsideClosableComponent.openBtn,
                hasBackdrop: false,
                outsideClosable: true
            });

            outsideClosableFixture.detectChanges();
            tick(1000);
            expect(overlayContainerElement.textContent).toContain('template');

            outsideClosableComponent.outsideBtn.nativeElement.click();
            outsideClosableFixture.detectChanges();
            tick(1000);
            expect(overlayContainerElement.textContent).not.toContain('template');
        }));

        it('should not close popover when click dom inside popover container', fakeAsync(() => {
            popover.open(outsideClosableComponent.template, {
                origin: outsideClosableComponent.openBtn,
                hasBackdrop: false,
                outsideClosable: true
            });
            outsideClosableFixture.detectChanges();

            const innerContent = document.querySelector('.thy-popover-container') as HTMLElement;
            innerContent.click();

            tick(1000);
            outsideClosableFixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('template');
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
            popover.open(insideClosableComponent.template, {
                origin: insideClosableComponent.openBtn,
                insideClosable: true
            });
            insideClosableFixture.detectChanges;
            tick(1000);

            const innerContent = document.querySelector('.thy-popover-container') as HTMLElement;
            innerContent.click();
            tick(1000);
            expect(document.querySelector('.template')).toBeFalsy();
        }));
    });

    describe('config', () => {
        const config = { hasBackdrop: false, outsideClosable: true };
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

            it('should apply closeScrollStrategy when set close in token', fakeAsync(() => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    ...config
                });

                expect(popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(closeScrollStrategy);
            }));

            it('should apply reposition scroll strategy when set reposition', () => {
                const scrollStrategy = popoverConfigComponent.overlay.scrollStrategies.reposition();
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    ...config,
                    scrollStrategy: scrollStrategy
                });

                expect(popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(scrollStrategy);
                expect((popoverRef.getOverlayRef().getConfig().positionStrategy as any)._canPush).toEqual(true);
            });

            it('should support set canPush to false', () => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    ...config,
                    scrollStrategy: popoverConfigComponent.overlay.scrollStrategies.reposition(),
                    canPush: false
                });
                expect((popoverRef.getOverlayRef().getConfig().positionStrategy as any)._canPush).toEqual(false);
            });

            it('should use the provided defaults', () => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
                const defaultConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...globalDefaultConfig, ...otherConfig };
                expect(comparePopoverConfig(defaultConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
                const paneElement = getOverlayPaneElement();
                expect(paneElement).toBeTruthy();
                expect(paneElement.classList.contains(`cdk-overlay-pane`)).toBeTruthy();
            });

            it('should be overridable by open() options', fakeAsync(() => {
                const _config = { offset: 4, backdropClosable: true, closeOnNavigation: true };
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    ...config,
                    ..._config
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
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
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn
                });

                expect(typeof popoverRef.getOverlayRef().getConfig().scrollStrategy).toEqual(
                    typeof popoverConfigComponent.overlay.scrollStrategies.block()
                );
            });

            it('should use the provided defaults', () => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
                const expectConfig = { ...THY_POPOVER_DEFAULT_CONFIG_VALUE, ...otherConfig };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should hav custom panel class when panelClass is string[]', () => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    panelClass: ['class1', 'class2']
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
                const expectConfig = {
                    ...THY_POPOVER_DEFAULT_CONFIG_VALUE,
                    ...otherConfig,
                    ...{ panelClass: ['class1', 'class2'] }
                };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should hav custom panel class when panelClass is string', () => {
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    panelClass: 'panel-class'
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
                const expectConfig = {
                    ...THY_POPOVER_DEFAULT_CONFIG_VALUE,
                    ...otherConfig,
                    ...{ panelClass: ['panel-class'] }
                };
                expect(comparePopoverConfig(expectConfig as ThyPopoverConfig, currentConfig as ThyPopoverConfig)).toBeTruthy();
            });

            it('should be overridable by open() options', fakeAsync(() => {
                const _config = { offset: 4, backdropClosable: true, closeOnNavigation: true };
                const popoverRef = popover.open(popoverConfigComponent.template, {
                    origin: popoverConfigComponent.openBtn,
                    ..._config
                });

                const currentConfig = popoverRef.getOverlayRef().getConfig();
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
        let expectValue = expectConfig[key];

        // 自动加上 thy-popover-panel
        if (key === 'panelClass') {
            expectValue = ['thy-popover-panel', ...expectValue];
        }
        if (!isUndefinedOrNull(expectValue) && !isUndefinedOrNull(currentConfig[key])) {
            if (isArray(currentConfig[key]) && isArray(expectValue)) {
                isSame = currentConfig[key].join(',') === expectValue.join(',');
            } else if (expectValue !== currentConfig[key]) {
                isSame = false;
            }
        }
        return isSame;
    });

    return isSame;
}
