import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject, tick, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyPopover, ThyPopoverModule } from 'ngx-tethys/popover';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyColorPickerDirective } from '../color-picker.component';
import { ThyCoordinatesDirective } from '../coordinates.directive';
import { ThyColorDefaultPanelComponent } from '../default-panel.component';
import ThyColor from '../helpers/color.class';
import { ThyColorPickerModule } from '../module';
import { ThyPickerPanelComponent } from '../picker-panel.component';

@Component({
    selector: 'thy-demo-color-picker-basic',
    template: `
        <span>已选择颜色：</span>
        <div class="box" [ngStyle]="{ background: color }" thyColorPicker [(ngModel)]="color" (ngModelChange)="change($event)"></div>
        <thy-color-default-panel [colorChange]="defaultPanelColorChange" [color]="defaultPanelColor"></thy-color-default-panel>
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
    @ViewChild(ThyColorDefaultPanelComponent) defaultPanel: ThyColorDefaultPanelComponent;
    color = '#ddd';

    defaultPanelColor = '#fafafa';
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    change(color: string) {}

    defaultPanelColorChange = (color: string) => {
        this.defaultPanelColor = color;
    };
}

@Component({
    selector: 'thy-demo-color-default-panel',
    template: `
        <thy-color-default-panel [colorChange]="defaultPanelColorChange" [color]="defaultPanelColor"></thy-color-default-panel>
    `
})
class ThyDemoColorDefaultPanelComponent {
    @ViewChild(ThyColorDefaultPanelComponent) defaultPanel: ThyColorDefaultPanelComponent;
    defaultPanelColor = '#fafafa';
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    defaultPanelColorChange = (color: string) => {
        this.defaultPanelColor = color;
    };
}
@Component({
    selector: 'thy-demo-picker-panel',
    template: `
        <thy-picker-panel [pickerColorChange]="pickerColorChange" [color]="color"></thy-picker-panel>
    `
})
class ThyDemoPickerPanelComponent {
    @ViewChild(ThyPickerPanelComponent) pickerPanel: ThyPickerPanelComponent;

    color = '#fafafa';
    constructor(public elementRef: ElementRef<HTMLElement>) {}

    pickerColorChange = (color: string) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-coordinates-directive',
    template: `
        <div class="box" thyColorCoordinates (coordinatesChange)="handleChange($event)"></div>
    `,
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
    let defaultPanel: ComponentFixture<ThyColorDefaultPanelComponent>;
    let defaultPanelInstance: ThyColorDefaultPanelComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThyPopoverModule, BrowserAnimationsModule],
            providers: [ThyPopover],
            declarations: [ThyDemoColorPickerComponent, ThyColorDefaultPanelComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
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
            dispatchMouseEvent(boxElement, 'click');
            fixture.detectChanges();
            flush();
        }
        it('should create', () => {
            expect(fixtureInstance).toBeDefined();
        });

        it('should open color-picke default panel', fakeAsync(() => {
            openDefaultPanel();
            expect(overlayContainerElement).toBeTruthy();
            fixture.detectChanges();

            const overlayPaneElement: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
            expect(overlayPaneElement).toBeTruthy();
            fixture.detectChanges();
            expect(overlayPaneElement.style.width).toEqual('286px');
            const colorDefaultPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-default-panel');
            expect(colorDefaultPanelElement).toBeTruthy();
        }));

        it('should  open picker panel', fakeAsync(() => {
            openDefaultPanel();
            const moreButton: HTMLElement = overlayContainerElement.querySelector('.more-color');
            expect(moreButton).toBeTruthy();
            dispatchMouseEvent(moreButton, 'click');
            fixture.detectChanges();
            flush();
            const pickerPanelElement: HTMLElement = overlayContainerElement.querySelector('.thy-picker-panel');
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

        it('should get recentColors from localStorage', fakeAsync(() => {
            localStorage.setItem('recentColors', '["#ff0000"]');
            openDefaultPanel();
            fixture.detectChanges();
            expect(fixtureInstance.defaultPanel.recentColors).toEqual(['#ff0000']);
            localStorage.setItem('recentColors', '');
        }));
    });
});

describe('color-default-panel', () => {
    let fixture: ComponentFixture<ThyDemoColorDefaultPanelComponent>;
    let fixtureInstance: ThyDemoColorDefaultPanelComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThyPopoverModule, BrowserAnimationsModule],
            providers: [ThyPopover],
            declarations: [ThyDemoColorDefaultPanelComponent, ThyColorDefaultPanelComponent]
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

            dispatchMouseEvent(document.querySelector('.cdk-overlay-backdrop'), 'click');
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

            dispatchMouseEvent(document.querySelector('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);

            expect(localStorage.getItem('recentColors')).toEqual('["#fafafa","#aaaaaa"]');
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
            imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThyPopoverModule, BrowserAnimationsModule],
            providers: [ThyPopover],
            declarations: [ThyDemoPickerPanelComponent, ThyPickerPanelComponent]
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
            imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThyPopoverModule, BrowserAnimationsModule],
            providers: [ThyPopover],
            declarations: [ThyDemoCoordinatesDirectiveComponent, ThyCoordinatesDirective]
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
