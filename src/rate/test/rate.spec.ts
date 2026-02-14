import { OverlayContainer } from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { Component, DebugElement, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyRate, ThyRateModule } from 'ngx-tethys/rate';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyRateTemplateExampleComponent } from '../examples/template/template.component';

@Component({
    selector: 'thy-rate-basic-test',
    template: `
        <thy-rate [(ngModel)]="value" (ngModelChange)="modelChange($event)" (thyItemHoverChange)="hoverChange($event)"></thy-rate>
    `,
    imports: [ThyRateModule, FormsModule]
})
class RateBasicTestComponent {
    value = 0;
    modelChange = jasmine.createSpy('model change callback');
    hoverChange = jasmine.createSpy('item hover change callback');
}

describe('Rate basic component', () => {
    let fixture!: ComponentFixture<RateBasicTestComponent>;
    let testRateBasicComponent!: RateBasicTestComponent;
    let rateBasicDebugComponent!: DebugElement;
    let rateBasicElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateBasicTestComponent);
        testRateBasicComponent = fixture.debugElement.componentInstance;
        rateBasicDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateBasicElement = rateBasicDebugComponent.nativeElement;
    });

    it('should create rate basic component', () => {
        expect(testRateBasicComponent).toBeTruthy();
        expect(rateBasicElement).toBeTruthy();
    });

    it('should get correct class when ngModel value change', fakeAsync(() => {
        testRateBasicComponent.value = 2;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        rateItems.forEach((rate, ind) => {
            if (ind < 2) {
                expect(rate.classList.contains(`thy-rate-star--full`)).toBeTruthy();
            } else {
                expect(rate.classList.contains(`thy-rate-star--zero`)).toBeTruthy();
            }
        });
    }));

    it('should get correct class when click sub items', fakeAsync(() => {
        testRateBasicComponent.value = 0;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        fixture.nativeElement.firstElementChild.firstElementChild.children[3].querySelector('.thy-rate-item-all').click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(testRateBasicComponent.value).toBe(4);
        expect(testRateBasicComponent.modelChange).toHaveBeenCalledTimes(1);
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        rateItems.forEach((rate, ind) => {
            if (ind < 4) {
                expect(rate.classList.contains(`thy-rate-star--full`)).toBeTruthy();
            } else {
                expect(rate.classList.contains(`thy-rate-star--zero`)).toBeTruthy();
            }
        });
    }));

    it('should get correct class when hover sub items', fakeAsync(() => {
        testRateBasicComponent.value = 0;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(
            fixture.nativeElement.firstElementChild.firstElementChild.children[0].classList.contains(`thy-rate-star--zero`)
        ).toBeTruthy();

        dispatchFakeEvent(fixture.nativeElement.firstElementChild.firstElementChild.children[3].children[1], 'mouseover', true);
        fixture.detectChanges();
        expect(testRateBasicComponent.hoverChange).toHaveBeenCalledWith(4);
        expect(testRateBasicComponent.hoverChange).toHaveBeenCalledTimes(1);
        expect(
            fixture.nativeElement.firstElementChild.firstElementChild.children[3].classList.contains(`thy-rate-star--full`)
        ).toBeTruthy();

        dispatchFakeEvent(fixture.nativeElement.firstElementChild.firstElementChild.children[1].children[1], 'mouseleave', true);
        fixture.detectChanges();
        expect(
            fixture.nativeElement.firstElementChild.firstElementChild.children[1].classList.contains(`thy-rate-star--zero`)
        ).toBeTruthy();
    }));
});

// 数量
@Component({
    selector: 'thy-rate-count-test',
    template: ` <thy-rate [(ngModel)]="value" [thyCount]="count"></thy-rate> `,
    imports: [ThyRateModule, FormsModule]
})
class RateCountTestComponent {
    value = 1;
    count = 1;
}

describe('Rate count component', () => {
    let fixture!: ComponentFixture<RateCountTestComponent>;
    let testRateCountComponent!: RateCountTestComponent;
    let rateCountDebugComponent!: DebugElement;
    let rateCountElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateCountTestComponent);
        testRateCountComponent = fixture.debugElement.componentInstance;
        rateCountDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateCountElement = rateCountDebugComponent.nativeElement;
    });

    it('should create rate count component', () => {
        expect(testRateCountComponent).toBeTruthy();
        expect(rateCountElement).toBeTruthy();
    });

    it('should create rate sub items', fakeAsync(() => {
        testRateCountComponent.count = 3;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        expect(rateItems.length).toEqual(3);
    }));
});

// 半选
@Component({
    selector: 'thy-rate-half-test',
    template: ` <thy-rate [(ngModel)]="value" [thyAllowHalf]="allowHalf" (thyItemHoverChange)="hoverChange($event)"></thy-rate> `,
    imports: [ThyRateModule, FormsModule]
})
class RateHalfTestComponent {
    value = 1;
    allowHalf = false;
    hoverChange = jasmine.createSpy('item hover change callback');
}

describe('Rate half component', () => {
    let fixture!: ComponentFixture<RateHalfTestComponent>;
    let testRateHalfComponent!: RateHalfTestComponent;
    let rateHalfDebugComponent!: DebugElement;
    let rateHalfElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateHalfTestComponent);
        testRateHalfComponent = fixture.debugElement.componentInstance;
        rateHalfDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateHalfElement = rateHalfDebugComponent.nativeElement;
    });

    it('should create rate half select component', () => {
        expect(testRateHalfComponent).toBeTruthy();
        expect(rateHalfElement).toBeTruthy();
    });

    it('should rate half select work', fakeAsync(() => {
        testRateHalfComponent.value = 3.5;
        testRateHalfComponent.allowHalf = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        const currentIndex = Math.ceil(testRateHalfComponent.value - 1);
        rateItems.forEach((rate, ind) => {
            if (ind < currentIndex) {
                expect(rate.classList.contains(`thy-rate-star--full`)).toBeTruthy();
            } else if (ind === currentIndex) {
                expect(rate.classList.contains(`thy-rate-star--half`)).toBeTruthy();
            } else {
                expect(rate.classList.contains(`thy-rate-star--zero`)).toBeTruthy();
            }
        });
    }));

    it('should half to hover current left item not work', fakeAsync(() => {
        fixture.detectChanges();
        testRateHalfComponent.value = 1.5;
        testRateHalfComponent.allowHalf = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const content = fixture.nativeElement.firstElementChild.firstElementChild.children[1];
        dispatchFakeEvent(content, 'mouseover', true);
        fixture.detectChanges();
        expect(testRateHalfComponent.hoverChange).toHaveBeenCalledTimes(0);
        expect(content.classList.contains(`thy-rate-star--half`)).toBeTruthy();
    }));
});

// 清除
@Component({
    selector: 'thy-rate-clear-test',
    template: ` <thy-rate [(ngModel)]="value" [thyAllowClear]="allowClear" (ngModelChange)="modelChange($event)"></thy-rate> `,
    imports: [ThyRateModule, FormsModule]
})
class RateClearTestComponent {
    value = 2;
    allowClear = false;
    modelChange = jasmine.createSpy('model change callback');
}

describe('Rate clear component', () => {
    let fixture!: ComponentFixture<RateClearTestComponent>;
    let testRateClearComponent!: RateClearTestComponent;
    let rateClearDebugComponent!: DebugElement;
    let rateClearElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateClearTestComponent);
        testRateClearComponent = fixture.debugElement.componentInstance;
        rateClearDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateClearElement = rateClearDebugComponent.nativeElement;
    });

    it('should create rate clear component', () => {
        expect(testRateClearComponent).toBeTruthy();
        expect(rateClearElement).toBeTruthy();
    });

    it('should allow clear work', fakeAsync(() => {
        testRateClearComponent.value = 0;
        testRateClearComponent.allowClear = false;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(testRateClearComponent.value).toBe(0);

        fixture.nativeElement.firstElementChild.firstElementChild.children[3].querySelector('.thy-rate-item-all').click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(testRateClearComponent.value).toBe(4);
        expect(testRateClearComponent.modelChange).toHaveBeenCalledTimes(1);

        testRateClearComponent.allowClear = true;
        fixture.detectChanges();
        fixture.nativeElement.firstElementChild.firstElementChild.children[3].querySelector('.thy-rate-item-all').click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(testRateClearComponent.value).toBe(0);
        expect(testRateClearComponent.modelChange).toHaveBeenCalledTimes(2);
    }));
});

@Component({
    selector: 'thy-rate-disabled-test',
    template: `
        <thy-rate
            [(ngModel)]="value"
            [thyDisabled]="disabled"
            (ngModelChange)="modelChange($event)"
            (thyItemHoverChange)="hoverChange($event)"></thy-rate>
    `,
    imports: [ThyRateModule, FormsModule]
})
class RateDisabledTestComponent {
    value = 1;
    disabled = false;
    modelChange = jasmine.createSpy('model change callback');
    hoverChange = jasmine.createSpy('item hover change callback');
}

describe('Rate disabled component', () => {
    let fixture!: ComponentFixture<RateDisabledTestComponent>;
    let testRateDisabledComponent!: RateDisabledTestComponent;
    let rateDisabledDebugComponent!: DebugElement;
    let rateDisabledElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateDisabledTestComponent);
        testRateDisabledComponent = fixture.debugElement.componentInstance;
        rateDisabledDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateDisabledElement = rateDisabledDebugComponent.nativeElement;
    });

    it('should create rate disabled component', () => {
        expect(testRateDisabledComponent).toBeTruthy();
        expect(rateDisabledElement).toBeTruthy();
    });

    it('should disable work', fakeAsync(() => {
        testRateDisabledComponent.disabled = true;
        fixture.detectChanges();
        expect(testRateDisabledComponent.value).toBe(1);
        fixture.nativeElement.firstElementChild.firstElementChild.children[4].querySelector('.thy-rate-item-all').click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(testRateDisabledComponent.value).toBe(1);
        expect(testRateDisabledComponent.modelChange).toHaveBeenCalledTimes(0);

        expect(rateDisabledElement.getAttribute('tabindex')).toBe('-1');
        testRateDisabledComponent.disabled = false;
        fixture.detectChanges();
        expect(rateDisabledElement.getAttribute('tabindex')).toBe('0');
    }));

    it('should disable to hover item not work', fakeAsync(() => {
        testRateDisabledComponent.disabled = true;
        fixture.detectChanges();
        expect(testRateDisabledComponent.value).toBe(1);
        const content = fixture.nativeElement.firstElementChild.firstElementChild.children[4];
        dispatchFakeEvent(content, 'mouseover', true);
        fixture.detectChanges();
        expect(testRateDisabledComponent.hoverChange).toHaveBeenCalledTimes(0);
        expect(content.classList.contains(`thy-rate-star--zero`)).toBeTruthy();
    }));
});

// 自定义提示信息
@Component({
    selector: 'thy-rate-tooltip-test',
    template: ` <thy-rate [(ngModel)]="value" [thyTooltips]="tooltips" (ngModelChange)="modelChange($event)"></thy-rate> `,
    imports: [ThyRateModule, FormsModule]
})
class RateTooltipTestComponent {
    readonly tooltip = viewChild(ThyTooltipDirective);
    value = 1;
    tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    modelChange = jasmine.createSpy('model change callback');
}

describe('Rate tooltip component', () => {
    let fixture!: ComponentFixture<RateTooltipTestComponent>;
    let testRateTooltipComponent!: RateTooltipTestComponent;
    let rateTooltipDebugComponent!: DebugElement;
    let rateTooltipElement!: HTMLElement;
    let overlayContainer!: OverlayContainer;
    let overlayContainerElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();

        overlayContainer = TestBed.inject(OverlayContainer);
        overlayContainerElement = overlayContainer.getContainerElement();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateTooltipTestComponent);
        testRateTooltipComponent = fixture.debugElement.componentInstance;
        rateTooltipDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateTooltipElement = rateTooltipDebugComponent.nativeElement;
    });

    afterEach(() => {
        if (overlayContainer) {
            overlayContainer.ngOnDestroy();
        }
    });

    it('should create rate tooltip component', () => {
        expect(testRateTooltipComponent).toBeTruthy();
        expect(rateTooltipElement).toBeTruthy();
    });

    it('should get correct text when tooltip work', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        expect(rateItems.length).toBe(5);

        rateItems.forEach((star, index) => {
            const starElement = star as HTMLElement;
            const expectedTooltip = testRateTooltipComponent.tooltips[index];

            dispatchMouseEvent(starElement, 'mouseenter');
            fixture.detectChanges();
            tick(200);
            expect(overlayContainerElement.textContent).toContain(expectedTooltip);

            dispatchMouseEvent(starElement, 'mouseleave');
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
        });
    }));
});

// 自定义模板
@Component({
    selector: 'thy-rate-template-test',
    template: `
        <thy-rate [(ngModel)]="value" [thyIconTemplate]="iconsTemplate" (thyItemHoverChange)="hoverChange($event)"></thy-rate>
        <ng-template #icon1>随</ng-template>
        <ng-template #icon2>心</ng-template>
        <ng-template #icon3>所</ng-template>
        <ng-template #icon4>欲</ng-template>
        <ng-template #icon5>赞</ng-template>
    `,
    imports: [ThyRateModule, FormsModule]
})
class RateTemplateTestComponent {
    value = 1;

    iconsTemplate!: string | TemplateRef<any> | string[] | TemplateRef<any>[];

    hoverChange = jasmine.createSpy('item hover change callback');

    readonly icon1 = viewChild<TemplateRef<any>>('icon1');

    readonly icon2 = viewChild<TemplateRef<any>>('icon2');

    readonly icon3 = viewChild<TemplateRef<any>>('icon3');

    readonly icon4 = viewChild<TemplateRef<any>>('icon4');

    readonly icon5 = viewChild<TemplateRef<any>>('icon5');
}

describe('Rate template component', () => {
    let fixture!: ComponentFixture<RateTemplateTestComponent>;
    let testRateTemplateComponent!: RateTemplateTestComponent;
    let rateTemplateDebugComponent!: DebugElement;
    let rateTemplateElement!: HTMLElement;
    let templatesComponent!: ThyRateTemplateExampleComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRateModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RateTemplateTestComponent);
        testRateTemplateComponent = fixture.debugElement.componentInstance;
        rateTemplateDebugComponent = fixture.debugElement.query(By.directive(ThyRate));
        rateTemplateElement = rateTemplateDebugComponent.nativeElement;
        templatesComponent = TestBed.createComponent(ThyRateTemplateExampleComponent).componentInstance;
    });

    it('should create rate template component', () => {
        expect(testRateTemplateComponent).toBeTruthy();
        expect(rateTemplateElement).toBeTruthy();
    });

    it('should set thy-icon mode to template component', fakeAsync(() => {
        testRateTemplateComponent.value = 3;
        testRateTemplateComponent.iconsTemplate = templatesComponent.icon;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-icon');
        rateItems.forEach(rate => {
            expect(rate.classList.contains(`thy-icon-smile`)).toBeTruthy();
        });
    }));

    it('should set thy-icon array mode to template component', fakeAsync(() => {
        testRateTemplateComponent.value = 0;
        testRateTemplateComponent.iconsTemplate = templatesComponent.icons;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        dispatchFakeEvent(fixture.nativeElement.firstElementChild.firstElementChild.children[2].children[1], 'mouseover', true);
        fixture.detectChanges();
        expect(testRateTemplateComponent.hoverChange).toHaveBeenCalledWith(3);
        expect(testRateTemplateComponent.hoverChange).toHaveBeenCalledTimes(1);
        expect(
            fixture.nativeElement.firstElementChild.firstElementChild.children[2].children[0].children[0].classList.contains(
                `thy-icon-expressionless`
            )
        ).toBeTruthy();

        dispatchFakeEvent(fixture.nativeElement.firstElementChild.firstElementChild.children[1].children[1], 'mouseleave', true);
        fixture.detectChanges();
        expect(
            fixture.nativeElement.firstElementChild.firstElementChild.children[1].children[0].children[0].classList.contains(
                `thy-icon-angry`
            )
        ).toBeTruthy();
    }));

    it('should set single template mode to component', fakeAsync(() => {
        fixture.detectChanges();
        testRateTemplateComponent.iconsTemplate = testRateTemplateComponent.icon5();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const content = fixture.nativeElement.firstElementChild.firstElementChild.children[3];
        expect(content.querySelector('.thy-rate-item-all').outerText).toContain('赞');
    }));

    it('should set template array mode to component', fakeAsync(() => {
        fixture.detectChanges();
        testRateTemplateComponent.value = 0;
        testRateTemplateComponent.iconsTemplate = [
            testRateTemplateComponent.icon1(),
            testRateTemplateComponent.icon2(),
            testRateTemplateComponent.icon3(),
            testRateTemplateComponent.icon4(),
            testRateTemplateComponent.icon5()
        ];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const rateItems = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-rate-star');
        const texts = ['随', '心', '所', '欲', '赞'];
        rateItems.forEach((rate, ind) => {
            fixture.detectChanges();
            dispatchFakeEvent(rate.children[0], 'mouseover', true);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(rate.children[0].innerHTML).toContain(texts[ind]);
        });
    }));
});
