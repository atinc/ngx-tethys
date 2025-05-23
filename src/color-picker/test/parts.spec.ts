import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ThyAlpha, ThyColor, ThyColorInputs, ThyColorPickerModule, ThyHue, ThyIndicator, ThySaturation } from 'ngx-tethys/color-picker';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { dispatchEvent, dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-demo-alpha',
    template: ` <thy-alpha class="alpha" [color]="color" (colorChange)="colorChangeEvent($event)"></thy-alpha> `,
    styles: [
        `
            .alpha {
                width: 200px;
                height: 8px;
                border-radius: 2px;
                display: block;
            }
        `
    ],
    imports: [CommonModule, FormsModule, ThyColorPickerModule, ThyAlpha]
})
class ThyDemoAlphaComponent {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly alphaComponent = viewChild(ThyAlpha);

    color = new ThyColor('#fafafa');

    colorChangeEvent = (color: ThyColor) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-hue',
    template: ` <thy-hue [color]="color" (colorChange)="colorChangeEvent($event)"></thy-hue> `,
    imports: [CommonModule, FormsModule, ThyColorPickerModule, ThyHue]
})
class ThyDemoHueComponent {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly hueComponent = viewChild(ThyHue);

    color = new ThyColor('#fafafa');

    colorChangeEvent = (color: ThyColor) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-saturation',
    template: ` <thy-saturation [color]="color" (colorChange)="colorChangeEvent($event)"></thy-saturation> `,
    imports: [CommonModule, FormsModule, ThyColorPickerModule, ThySaturation]
})
class ThyDemoSaturationComponent {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly hueComponent = viewChild(ThySaturation);

    color = new ThyColor('#fafafa');

    colorChangeEvent = (color: ThyColor) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-inputs',
    template: ` <thy-color-inputs [color]="color" (colorChange)="colorChangeEvent($event)"></thy-color-inputs> `,
    imports: [CommonModule, FormsModule, ThyColorPickerModule, ThyColorInputs]
})
class ThyDemoColorInputsComponent {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly colorInputsComponent = viewChild(ThyColorInputs);
    readonly inputNumber = viewChild(ThyInputNumber);

    color = new ThyColor('#fafafa');

    colorChangeEvent = (color: ThyColor) => {
        this.color = color;
    };
}

@Component({
    selector: 'thy-demo-indicator',
    template: ` <thy-indicator [color]="color" (colorChange)="colorChangeEvent($event)"></thy-indicator> `,
    imports: [CommonModule, FormsModule, ThyColorPickerModule, ThyIndicator]
})
class ThyDemoIndicatorComponent {
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly colorIndicatorComponent = viewChild(ThyIndicator);

    color = new ThyColor('#ddd');

    colorChangeEvent = (color: ThyColor) => {
        this.color = color;
    };
}

describe('thy-alpha', () => {
    let fixture: ComponentFixture<ThyDemoAlphaComponent>;
    let fixtureInstance: ThyDemoAlphaComponent;
    let alphaElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoAlphaComponent);
        fixtureInstance = fixture.componentInstance;
        alphaElement = fixture.debugElement.nativeElement.querySelector('.alpha');
    });

    describe('thy-alpha', () => {
        it('should called colorChangeEvent', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const colorChange = spyOn(fixtureInstance, 'colorChangeEvent');
            const grident = element.querySelector('.gradient-container') as HTMLElement;
            grident.style.height = '100px';
            fixture.detectChanges();
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left + 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(colorChange).toHaveBeenCalled();
        }));

        it('should get correct alpha', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const grident = element.querySelector('.gradient-container') as HTMLElement;
            grident.style.height = '100px';
            fixture.detectChanges();
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left + 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const x = Math.round((100 * 100) / grident.clientWidth) / 100;
            expect(fixture.componentInstance.color.alpha).toEqual(x);
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left - 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.alpha).toEqual(0);
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left + 250, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.alpha).toEqual(1);
        }));
    });
});

describe('thy-hue', () => {
    let fixture: ComponentFixture<ThyDemoHueComponent>;
    let fixtureInstance: ThyDemoHueComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoHueComponent);
        fixtureInstance = fixture.componentInstance;
    });

    describe('thy-hue', () => {
        it('should called hue colorChangeEvent', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const colorChange = spyOn(fixtureInstance, 'colorChangeEvent');
            const grident = element.querySelector('.pointer-container') as HTMLElement;
            grident.style.height = '100px';
            fixture.detectChanges();
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left + 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(colorChange).toHaveBeenCalled();
        }));

        it('should get correct hue', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const grident = element.querySelector('.pointer-container') as HTMLElement;
            grident.style.height = '100px';
            grident.style.width = '400px';
            fixture.detectChanges();
            const rect = grident.getBoundingClientRect();
            dispatchMouseEvent(grident, 'mousedown', rect.left + 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const x = (Math.round((100 * 100) / grident.clientWidth) / 100) * 360;
            expect(fixture.componentInstance.color.hue).toEqual(x);
            dispatchMouseEvent(grident, 'mousedown', rect.left - 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.hue).toEqual(0);
            dispatchMouseEvent(grident, 'mousedown', rect.left + 500, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.hue).toEqual(360);
        }));
    });
});

describe('thy-saturation', () => {
    let fixture: ComponentFixture<ThyDemoSaturationComponent>;
    let fixtureInstance: ThyDemoSaturationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoSaturationComponent);
        fixtureInstance = fixture.componentInstance;
    });

    describe('thy-saturation', () => {
        it('should called saturation colorChangeEvent', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const colorChange = spyOn(fixtureInstance, 'colorChangeEvent');
            const grident = element.querySelector('.color-panel') as HTMLElement;
            grident.style.height = '100px';
            fixture.detectChanges();
            dispatchMouseEvent(grident, 'mousedown', grident.getBoundingClientRect().left + 100, 0);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(colorChange).toHaveBeenCalled();
        }));

        it('should get correct saturation and value', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            const grident = element.querySelector('.color-panel') as HTMLElement;
            grident.style.height = '100px';
            grident.style.width = '400px';
            fixture.detectChanges();
            const rect = grident.getBoundingClientRect();
            const mouseEvent = dispatchMouseEvent(grident, 'mousedown', rect.left + 100, rect.top + 40);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const x = (100 / grident.clientWidth) * 100;
            const top = mouseEvent.clientY - (rect.top + window.pageYOffset);
            const y = (1 - top / grident.clientHeight) * 100;
            expect(fixture.componentInstance.color.saturation).toEqual(x);
            expect(fixture.componentInstance.color.value).toEqual(y);
            dispatchMouseEvent(grident, 'mousedown', rect.left - 100, rect.top - 70);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.saturation).toEqual(0);
            expect(fixture.componentInstance.color.value).toEqual(100);
            dispatchMouseEvent(grident, 'mousedown', rect.left + 500, rect.top + 200);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.color.saturation).toEqual(100);
            expect(fixture.componentInstance.color.value).toEqual(0);
        }));
    });
});

describe('thy-color-inputs', () => {
    let fixture: ComponentFixture<ThyDemoColorInputsComponent>;
    let fixtureInstance: ThyDemoColorInputsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoColorInputsComponent);
        fixtureInstance = fixture.componentInstance;
    });

    describe('thy-color-inputs', () => {
        it('should get correct color', fakeAsync(() => {
            fixture.detectChanges();
            const element = fixtureInstance.elementRef.nativeElement;
            const colorChange = spyOn(fixtureInstance, 'colorChangeEvent');
            let rInput = element.querySelector('.input-number-input') as HTMLInputElement;
            dispatchFakeEvent(rInput, 'focus');
            rInput.value = '200';
            dispatchFakeEvent(rInput, 'blur');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(colorChange).toHaveBeenCalled();

            const hexInputs = element.querySelector('input');
            hexInputs.value = '#DDDDDD';
            dispatchFakeEvent(hexInputs, 'blur');
            fixture.detectChanges();
            expect(colorChange).toHaveBeenCalled();
        }));

        it('should get correct displayValue', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            fixture.detectChanges();
            const hexInputs = element.querySelector('input');
            tick(500);
            hexInputs.value = 'DDDDDD';
            dispatchEvent(hexInputs, new Event('input'));
            fixture.detectChanges();
            dispatchFakeEvent(hexInputs, 'blur');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.colorInputsComponent().color().displayValue).toEqual('#DDDDDD');
        }));
    });
});

describe('thy-indicator', () => {
    let fixture: ComponentFixture<ThyDemoIndicatorComponent>;
    let fixtureInstance: ThyDemoIndicatorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoIndicatorComponent);
        fixtureInstance = fixture.componentInstance;
    });

    describe('thy-indicator', () => {
        it('should get correct bgcolor', fakeAsync(() => {
            const element = fixtureInstance.elementRef.nativeElement;
            fixture.detectChanges();
            const indicator = element.querySelector('.thy-indicator');
            expect(indicator).toBeTruthy();
            expect(fixtureInstance.colorIndicatorComponent().backgroundColor()).toEqual('rgba(221, 221, 221, 1)');
        }));
    });
});
