import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyPopover, ThyPopoverModule, ThyPopoverRef } from 'ngx-tethys/popover';
import { dispatchMouseEvent, dispatchTouchEvent } from 'ngx-tethys/testing';
import { ThyColorPickerCustomPanelComponent } from '../color-picker-custom-panel.component';
import { ThyColorPickerPanelComponent } from '../color-picker-panel.component';
import { ThyColorPickerDirective } from '../color-picker.component';
import { ThyCoordinatesDirective } from '../coordinates.directive';
import { ThyColor } from '../helpers/color.class';
import { ThyColorPickerModule } from '../module';

@Component({
    selector: 'thy-demo-color-picker-basic',
    template: `
        <span>已选择颜色：</span>
        <div
            class="box"
            [ngStyle]="{ background: color }"
            [thyHasBackdrop]="hasBackdrop"
            thyColorPicker
            [(ngModel)]="color"
            [disabled]="disabled"
            [thyDisabled]="disabled"
            [thyTrigger]="trigger"
            [thyShowDelay]="showDelay"
            [thyHideDelay]="hideDelay"
            (ngModelChange)="change($event)"
            (thyPanelOpen)="panelOpen($event)"
            (thyPanelClose)="panelClose($event)"
            [thyPresetColors]="presetColors"></div>
        <thy-color-picker-panel [colorChange]="defaultPanelColorChange" [color]="defaultPanelColor"></thy-color-picker-panel>
    `,
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
        `
    ]
})
class ThyDemoColorPickerComponent {
    @ViewChild(ThyColorPickerDirective, { static: true }) colorPicker: ThyColorPickerDirective;
    @ViewChild(ThyColorPickerPanelComponent) defaultPanel: ThyColorPickerPanelComponent;
    color = '#ddd';

    defaultPanelColor = '#fafafa';

    hasBackdrop = true;

    trigger = 'click';

    showDelay = 0;

    hideDelay = 0;

    presetColors: string[];

    disabled = false;

    constructor(public elementRef: ElementRef<HTMLElement>, private thyPopoverRef: ThyPopoverRef<ThyColorPickerPanelComponent>) {}

    change(color: string) {}

    panelOpen() {}

    panelClose() {}

    defaultPanelColorChange = (color: string) => {
        this.defaultPanelColor = color;
    };
}

@Component({
    selector: 'thy-demo-color-default-panel',
    template: `
        <thy-color-picker-panel
            [colorChange]="defaultPanelColorChange"
            [color]="defaultPanelColor"
            [defaultColor]="defaultColor"
            [transparentColorSelectable]="transparentColorSelectable"></thy-color-picker-panel>
    `
})
class ThyDemoColorDefaultPanelComponent {
    @ViewChild(ThyColorPickerPanelComponent) defaultPanel: ThyColorPickerPanelComponent;
    defaultPanelColor = '#fafafa';
    defaultColor = '';
    transparentColorSelectable: boolean;
    constructor(public elementRef: ElementRef<HTMLElement>, public thyPopover: ThyPopover) {}

    defaultPanelColorChange = (color: string) => {
        this.defaultPanelColor = color;
    };
}
@Component({
    selector: 'thy-demo-picker-panel',
    template: ` <thy-color-picker-custom-panel [pickerColorChange]="pickerColorChange" [color]="color"></thy-color-picker-custom-panel> `
})
class ThyDemoPickerPanelComponent {
    @ViewChild(ThyColorPickerCustomPanelComponent) pickerPanel: ThyColorPickerCustomPanelComponent;

    color = '#fafafa';
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    pickerColorChange = (color: string) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-coordinates-directive',
    template: ` <div class="box" thyColorCoordinates (coordinatesChange)="handleChange($event)"></div> `,
    styles: [
        `
            .box {
                position: absolute;
                width: 200px;
                height: 200px;
                cursor: pointer;
            }
        `
    ]
})
class ThyDemoCoordinatesDirectiveComponent {
    @ViewChild(ThyCoordinatesDirective) coordinates: ThyCoordinatesDirective;

    e: {
        x: number;
        y: number;
        top: number;
        left: number;
        containerHeight: number;
        containerWidth: number;
        $event: Event;
    };
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    handleChange = (event: {
        x: number;
        y: number;
        top: number;
        left: number;
        containerHeight: number;
        containerWidth: number;
        $event: Event;
    }) => {
        this.e = event;
    };
}

describe(`color-picker`, () => {
    let fixture: ComponentFixture<ThyDemoColorPickerComponent>;
    let boxElement: HTMLElement;
    let fixtureInstance: ThyDemoColorPickerComponent;
    let colorPickerElement: HTMLElement;
    let colorPickerDirective: ThyColorPickerDirective;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let colorPickerDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyDialogModule,
                ThyColorPickerModule,
                ThyPopoverModule,
                BrowserAnimationsModule,
                ThyColorPickerPanelComponent,
                NoopAnimationsModule
            ],
            providers: [ThyPopover, ThyPopoverRef],
            declarations: [ThyDemoColorPickerComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        localStorage.clear();
        fixture = TestBed.createComponent(ThyDemoColorPickerComponent);
        fixtureInstance = fixture.componentInstance;

        boxElement = fixture.debugElement.nativeElement.querySelector('.box');
        colorPickerDebugElement = fixture.debugElement.query(By.directive(ThyColorPickerDirective));
        colorPickerElement = colorPickerDebugElement.nativeElement;
        colorPickerDirective = colorPickerDebugElement.injector.get(ThyColorPickerDirective);
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('color-picker directive', () => {
        function openDefaultPanel() {
            fixture.detectChanges();
            dispatchMouseEvent(boxElement, 'click');
            fixture.detectChanges();
            flush();
        }

        it('should create', () => {
            expect(fixtureInstance).toBeDefined();
        });

        it('should get correct style when disabled', fakeAsync(() => {
            expect(boxElement.classList.contains('thy-color-picker-disabled')).toBeFalsy();
            fixtureInstance.disabled = true;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(boxElement.classList.contains('thy-color-picker-disabled')).toBeTruthy();
            const index = colorPickerDebugElement.attributes.tabindex;
            expect(index).toBe('-1');
            fixtureInstance.disabled = false;
            fixture.detectChanges();
            const tabindex = colorPickerDebugElement.attributes.tabindex;
            expect(tabindex).toBe('0');
        }));

        it('should open color-picker default panel', fakeAsync(() => {
            openDefaultPanel();
            expect(overlayContainerElement).toBeTruthy();
            fixture.detectChanges();
            const overlayPaneElement: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(overlayPaneElement).toBeTruthy();
            fixture.detectChanges();
            expect(overlayPaneElement.style.width).toEqual('286px');
            const colorDefaultPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-color-picker-panel');
            expect(colorDefaultPanelElement).toBeTruthy();
        }));

        it('should open color-picker panel when trigger is hover', fakeAsync(() => {
            fixtureInstance.trigger = 'hover';
            fixtureInstance.hasBackdrop = false;
            fixture.detectChanges();
            dispatchMouseEvent(boxElement, 'mouseenter');
            fixture.detectChanges();
            flush();

            const defaultColorPanel = overlayContainerElement.querySelector('.thy-color-picker-panel');
            expect(defaultColorPanel).toBeTruthy();

            dispatchMouseEvent(defaultColorPanel, 'mousemove');
            expect(defaultColorPanel).toBeTruthy();

            const moreButton: HTMLElement = overlayContainerElement.querySelector('.more-color');
            expect(moreButton).toBeTruthy();
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();
            const customColorPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');

            dispatchMouseEvent(customColorPanelElement, 'mousemove');
            expect(defaultColorPanel).toBeTruthy();
            expect(customColorPanelElement).toBeTruthy();
        }));

        it('should close color-picker panel when mouseleave', fakeAsync(() => {
            fixtureInstance.trigger = 'hover';
            fixtureInstance.hasBackdrop = false;
            fixture.detectChanges();

            dispatchMouseEvent(boxElement, 'mouseenter');
            fixture.detectChanges();
            flush();
            let defaultColorPanelElement = overlayContainerElement.querySelector('.thy-color-picker-panel');
            const moreButton: HTMLElement = overlayContainerElement.querySelector('.more-color');
            expect(moreButton).toBeTruthy();

            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();
            let customColorPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');

            expect(defaultColorPanelElement).toBeTruthy();
            expect(customColorPanelElement).toBeTruthy();

            const spanElement = fixture.debugElement.nativeElement.querySelector('span');
            dispatchMouseEvent(spanElement, 'mousemove');
            fixture.detectChanges();
            flush();
            defaultColorPanelElement = overlayContainerElement.querySelector('.thy-color-picker-panel');
            customColorPanelElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');
            expect(defaultColorPanelElement).toBeFalsy();
            expect(customColorPanelElement).toBeFalsy();
        }));

        it('should be able to override the show and hide delays', fakeAsync(() => {
            fixtureInstance.showDelay = 500;
            fixtureInstance.hideDelay = 500;
            fixtureInstance.trigger = 'hover';
            fixtureInstance.hasBackdrop = false;
            fixture.detectChanges();
            dispatchMouseEvent(boxElement, 'mouseenter');
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeFalsy();

            tick(500);
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeTruthy();

            const spanElement = fixture.debugElement.nativeElement.querySelector('span');
            dispatchMouseEvent(spanElement, 'mousemove');
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeTruthy();

            tick(500);
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeFalsy();
            flush();
        }));

        it('should open picker panel', fakeAsync(() => {
            openDefaultPanel();
            const moreButton: HTMLElement = overlayContainerElement.querySelector('.more-color');
            expect(moreButton).toBeTruthy();
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();
            let pickerPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');
            expect(pickerPanelElement).toBeTruthy();

            dispatchMouseEvent(moreButton, 'click');
            tick(100);
            fixture.detectChanges();
            pickerPanelElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');
            expect(pickerPanelElement).toBeTruthy();
        }));

        it('should get correct bgcolor', fakeAsync(() => {
            openDefaultPanel();
            expect(colorPickerDebugElement.componentInstance.colorPicker.backgroundColor).toEqual('#ddd');
        }));

        it('should model change', fakeAsync(() => {
            openDefaultPanel();
            const change = spyOn(colorPickerDebugElement.componentInstance.colorPicker, 'onChangeFn');

            colorPickerDebugElement.componentInstance.colorPicker.onModelChange('#ffffff');
            fixture.detectChanges();
            expect(colorPickerDebugElement.componentInstance.colorPicker.color).toEqual('#ffffff');
            expect(change).toHaveBeenCalled();
        }));

        it('should dispatch thyPanelOpen', fakeAsync(() => {
            const panelOpen = jasmine.createSpy('panel open');
            fixture.componentInstance.panelOpen = panelOpen;
            fixture.detectChanges();
            openDefaultPanel();
            fixture.detectChanges();
            expect(panelOpen).toHaveBeenCalled();
            expect(panelOpen).toHaveBeenCalledWith((colorPickerDirective as any).popoverRef);
        }));

        it('should dispatch thyPanelClose', fakeAsync(() => {
            const panelClose = jasmine.createSpy('panel close');
            fixture.componentInstance.panelClose = panelClose;
            fixture.detectChanges();
            openDefaultPanel();
            colorPickerDebugElement.componentInstance.colorPicker.hide();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            tick();
            flush();
            expect(panelClose).toHaveBeenCalled();
            expect(panelClose).toHaveBeenCalledWith((colorPickerDirective as any).popoverRef);
        }));

        it('should get recentColors from localStorage', fakeAsync(() => {
            localStorage.setItem('recentColors', '["#ff0000"]');
            openDefaultPanel();
            fixture.detectChanges();
            expect(fixtureInstance.defaultPanel.recentColors).toEqual(['#ff0000']);
            localStorage.setItem('recentColors', '');
        }));

        it('should not has backdrop when thyHasBackdrop is false', fakeAsync(() => {
            fixtureInstance.hasBackdrop = false;
            openDefaultPanel();
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-popover-container')).toBeTruthy();
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();

            const moreButton: HTMLElement = overlayContainerElement.querySelector('.more-color');
            expect(moreButton).toBeTruthy();
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();
            const pickerPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-color-picker-custom-panel');
            dispatchMouseEvent(pickerPanelElement, 'click');
            fixture.detectChanges();
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeTruthy();
            expect(overlayContainerElement.querySelector('.thy-color-picker-custom-panel')).toBeTruthy();

            dispatchMouseEvent(boxElement, 'click');
            fixture.detectChanges();
            flush();
            expect(overlayContainerElement.querySelector('.thy-color-picker-panel')).toBeFalsy();
            expect(overlayContainerElement.querySelector('.thy-color-picker-custom-panel')).toBeFalsy();
        }));

        it('should normally closed color-picker component used hide func', fakeAsync(() => {
            openDefaultPanel();
            expect(overlayContainerElement).toBeTruthy();
            colorPickerDebugElement.componentInstance.colorPicker.hide();
            expect(overlayContainerElement.querySelector('thy-default-picker-active')).toBeFalsy();
            fixture.detectChanges();
            flush();
        }));
    });
});

describe('color-default-panel', () => {
    let fixture: ComponentFixture<ThyDemoColorDefaultPanelComponent>;
    let fixtureInstance: ThyDemoColorDefaultPanelComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    const closeCallback = jasmine.createSpy('popover close');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyDialogModule,
                ThyColorPickerModule,
                ThyPopoverModule,
                BrowserAnimationsModule,
                ThyColorPickerPanelComponent,
                NoopAnimationsModule
            ],
            providers: [
                ThyPopover,
                {
                    provide: ThyPopoverRef,
                    useValue: {
                        close: () => {
                            closeCallback();
                        }
                    }
                }
            ],
            declarations: [ThyDemoColorDefaultPanelComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoColorDefaultPanelComponent);
        fixtureInstance = fixture.componentInstance;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('default-panel-component', () => {
        it('should change default panel color after dispatch selectColor', fakeAsync(() => {
            fixture.detectChanges();
            const defaultPanel = fixtureInstance.defaultPanel;
            defaultPanel.selectColor('#ff0000');
            fixture.detectChanges();
            expect(defaultPanel.color).toEqual('#ff0000');
            expect(fixtureInstance.defaultPanelColor).toEqual('#ff0000');
        }));

        it('should return correct icon color', fakeAsync(() => {
            fixture.detectChanges();
            expect(fixtureInstance.defaultPanel.getIconColor('#ffffff')).toEqual('black');
            expect(fixtureInstance.defaultPanel.getIconColor('#000000')).toEqual('white');
        }));

        it('should set correct recent color', fakeAsync(() => {
            const moreButton: HTMLElement = document.querySelector('.more-color');
            expect(moreButton).toBeTruthy();
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();

            fixtureInstance.defaultPanel.newColor = '#fafafa';
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            fixtureInstance.thyPopover.closeAll();
            fixture.detectChanges();
            tick(500);

            expect(localStorage.getItem('recentColors')).toEqual('["#fafafa"]');
        }));

        it('should set correct recent color when recentColors has items', fakeAsync(() => {
            const moreButton: HTMLElement = document.querySelector('.more-color');
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();

            fixtureInstance.defaultPanel.recentColors = ['#aaaaaa', '#fafafa'];
            fixtureInstance.defaultPanel.newColor = '#fafafa';
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            fixtureInstance.thyPopover.closeAll();
            fixture.detectChanges();
            tick(500);
            expect(localStorage.getItem('recentColors')).toEqual('["#fafafa","#aaaaaa"]');
        }));

        it('should show default color select item when defaultColor has value', fakeAsync(() => {
            const quickColor = '#333333';
            fixture.detectChanges();
            fixtureInstance.defaultColor = quickColor;
            fixture.detectChanges();
            flush();
            const quickColorEl = document.querySelector('.quick-color');
            expect(quickColorEl.textContent).toBe('默认颜色');
            expect(fixtureInstance.defaultPanelColor).not.toBe(quickColor);
            dispatchMouseEvent(quickColorEl, 'click');
            fixture.detectChanges();
            flush();
            expect(fixtureInstance.defaultPanelColor).toBe(quickColor);
        }));

        it('should show transparent color select item when defaultColor is empty and transparentColorSelectable is true', fakeAsync(() => {
            const quickColor = 'transparent';
            fixture.detectChanges();
            fixtureInstance.defaultColor = undefined;
            fixtureInstance.transparentColorSelectable = true;
            fixture.detectChanges();
            flush();
            const quickColorEl = document.querySelector('.quick-color');
            expect(quickColorEl.textContent).toBe('无填充色');
            expect(fixtureInstance.defaultPanelColor).not.toBe(quickColor);
            dispatchMouseEvent(quickColorEl, 'click');
            fixture.detectChanges();
            flush();
            expect(fixtureInstance.defaultPanelColor).toBe(quickColor);
        }));
    });
});

describe('picker-panel', () => {
    let fixture: ComponentFixture<ThyDemoPickerPanelComponent>;
    let fixtureInstance: ThyDemoPickerPanelComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyDialogModule,
                ThyColorPickerModule,
                ThyPopoverModule,
                BrowserAnimationsModule,
                ThyColorPickerCustomPanelComponent,
                NoopAnimationsModule
            ],
            providers: [ThyPopover, ThyPopoverRef],
            declarations: [ThyDemoPickerPanelComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoPickerPanelComponent);
        fixtureInstance = fixture.componentInstance;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('picker-panel-component', () => {
        it('should called colorChangeEvent', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.pickerPanel.colorChangeEvent(new ThyColor('#ccc'));
            fixture.detectChanges();
            const defaultColorPanel = overlayContainerElement.querySelector('.thy-color-picker-panel');
            expect(defaultColorPanel).toBeFalsy();
            expect(fixtureInstance.color).toEqual('#CCCCCC');
        }));
    });
});

describe('coordinates-directive', () => {
    let fixture: ComponentFixture<ThyDemoCoordinatesDirectiveComponent>;
    let fixtureInstance: ThyDemoCoordinatesDirectiveComponent;
    let boxElement: HTMLElement;
    let boxRect: DOMRect;
    let coordinatesDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyDialogModule,
                ThyColorPickerModule,
                ThyPopoverModule,
                BrowserAnimationsModule,
                ThyCoordinatesDirective,
                NoopAnimationsModule
            ],
            providers: [ThyPopover, ThyPopoverRef],
            declarations: [ThyDemoCoordinatesDirectiveComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoCoordinatesDirectiveComponent);
        fixtureInstance = fixture.componentInstance;
        boxElement = fixture.debugElement.nativeElement.querySelector('.box');
        coordinatesDebugElement = fixture.debugElement.query(By.directive(ThyCoordinatesDirective));
    });

    describe('coordinates-directive', () => {
        it('should change when mousedown', fakeAsync(() => {
            fixture.detectChanges();
            boxRect = boxElement.getBoundingClientRect();
            dispatchMouseEvent(boxElement, 'mousedown', 100, 100);
            dispatchMouseEvent(document, 'mousemove', 200, 200);
            dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.e.x).toEqual(200);
            expect(fixtureInstance.e.y).toEqual(200);
        }));
    });
});

describe(`for touch usage`, () => {
    let fixture: ComponentFixture<ThyDemoColorPickerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };
    let buttonElement: HTMLElement;

    beforeEach(() => {
        platform = { IOS: false, isBrowser: true, ANDROID: false };
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ThyDialogModule,
                OverlayModule,
                ThyColorPickerModule,
                ThyPopoverModule,
                NoopAnimationsModule,
                ThyColorPickerPanelComponent
            ],
            providers: [ThyPopover, ThyPopoverRef, { provide: Platform, useFactory: () => platform }],
            declarations: [ThyDemoColorPickerComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    beforeEach(() => {
        platform.ANDROID = true;
        fixture = TestBed.createComponent(ThyDemoColorPickerComponent);
        fixture.detectChanges();
        buttonElement = fixture.debugElement.nativeElement.querySelector('.box');
    });

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    function assertColorPanel(isExist: boolean): void {
        const defaultColorPanel = overlayContainerElement.querySelector('thy-color-picker-panel');
        if (isExist) {
            expect(defaultColorPanel).toBeTruthy();
        } else {
            expect(defaultColorPanel).toBeFalsy();
        }
    }

    it('should show the color picker for tap', fakeAsync(() => {
        assertColorPanel(false);
        dispatchTouchEvent(buttonElement, 'touchstart');
        fixture.detectChanges();
        tick(100); // tap time
        dispatchTouchEvent(buttonElement, 'touchend');
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        assertColorPanel(true);
        flush();
    }));

    it('should show the color picker for long press', fakeAsync(() => {
        assertColorPanel(false);
        dispatchTouchEvent(buttonElement, 'touchstart');
        fixture.detectChanges();
        tick(600); // default long press time is 500
        assertColorPanel(true);
        flush();
    }));

    it('should not prevent the default action on touchstart', () => {
        const event = dispatchTouchEvent(buttonElement, 'touchstart');
        fixture.detectChanges();
        expect(event.defaultPrevented).toBe(false);
    });

    it('should not close with auto close', fakeAsync(() => {
        dispatchTouchEvent(buttonElement, 'touchstart');
        fixture.detectChanges();
        tick(100);
        dispatchTouchEvent(buttonElement, 'touchend');
        fixture.detectChanges();
        tick(100);
        assertColorPanel(true);
        tick(2000);
        assertColorPanel(true);
    }));

    it('should close on touchmove', fakeAsync(() => {
        dispatchTouchEvent(buttonElement, 'touchstart');
        fixture.detectChanges();
        tick(100);
        assertColorPanel(false);

        dispatchTouchEvent(buttonElement, 'touchmove');
        fixture.detectChanges();
        tick(100); // touch moving
        assertColorPanel(false);

        dispatchTouchEvent(buttonElement, 'touchend');
        fixture.detectChanges();
        tick(100);
        assertColorPanel(false);
    }));
});
