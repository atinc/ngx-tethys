import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { FocusMonitor } from '@angular/cdk/a11y';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, TemplateRef } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { hexToRgb } from 'ngx-tethys/util';
import {
    ThyProgressStackedValue,
    ThyProgressType,
    ThyProgressCircle,
    ThyProgressStrip,
    ThyProgress,
    ThyProgressModule
} from 'ngx-tethys/progress';

const PROGRESS_CLASS_NAME = 'progress';
const PROGRESS_BAR_CLASS_NAME = 'progress-bar';
const TOOLTIP_CLASS = `thy-tooltip`;
const TOOLTIP_MESSAGE = 'this is a string tooltip';
const TOOLTIP_TEMPLATE_MESSAGE = 'this is a template message';

@Component({
    selector: 'thy-demo-progress-basic',
    template: `
        <button (click)="changeTemplate(demo)">Basic Usage</button>
        <thy-progress [thyValue]="value" [thyTips]="tips" [thyType]="type" [thySize]="size"> 20% </thy-progress>
        <ng-template #demo>{{ message }}</ng-template>
    `,
    imports: [ThyProgress]
})
class ThyDemoProgressBasicComponent {
    value = 20;
    type: ThyProgressType;
    size: string;
    tips: string | TemplateRef<HTMLElement> = TOOLTIP_MESSAGE;
    message = TOOLTIP_TEMPLATE_MESSAGE;
    changeTemplate(templateRef: TemplateRef<HTMLElement>) {
        this.tips = templateRef;
    }
}

@Component({
    selector: 'thy-demo-progress-circle',
    template: `
        <thy-progress
            [thyShape]="'circle'"
            [thyTips]="tips"
            [thyValue]="value"
            [thyType]="type"
            [thySize]="size"
            [thyGapDegree]="gapDegree"
            [thyGapPosition]="gapPosition"
            [thyStrokeWidth]="strokeWidth">
            20%
        </thy-progress>
    `,
    imports: [ThyProgress]
})
class ThyDemoProgressCircleComponent {
    value = 20;
    type: ThyProgressType;
    size: string = 'md';
    tips: string | TemplateRef<HTMLElement> = TOOLTIP_MESSAGE;
    gapDegree = 0;
    gapPosition = 'top';
    strokeWidth = 6;
    stackedValue = [
        {
            type: 'success',
            value: 40
        },
        {
            type: 'danger',
            value: 60,
            tips: 'hello world'
        },
        {
            type: 'warning',
            value: 100
        }
    ];
}
@Component({
    selector: 'thy-demo-progress-stacked',
    template: ` <thy-progress [thyValue]="value" [thySize]="size"> </thy-progress> `,
    imports: [ThyProgress]
})
class ThyDemoProgressStackedComponent {
    value: ThyProgressStackedValue[] = [
        {
            type: 'success',
            value: 40
        },
        {
            type: 'danger',
            value: 60,
            tips: 'hello world'
        },
        {
            type: 'warning',
            value: 100
        }
    ];
    size: string;
}

@Component({
    selector: 'thy-demo-progress-stacked-max',
    template: ` <thy-progress [thyMax]="max" [thyValue]="value" [thySize]="size"> </thy-progress> `,
    imports: [ThyProgress]
})
class ThyDemoProgressStackedMaxComponent {
    value: ThyProgressStackedValue[] = [
        {
            type: 'success',
            value: 40
        },
        {
            type: 'danger',
            value: 60,
            tips: 'hello world'
        },
        {
            type: 'warning',
            value: 100
        }
    ];
    size: string;
    max = 100;
}

@Component({
    selector: 'thy-demo-progress-tooltip',
    template: `
        <thy-progress [thyValue]="value" [thyTips]="customProgressTooTip"></thy-progress>
        <ng-template #customProgressTooTip let-item>type: {{ item.type }}-value: {{ item.value }}</ng-template>
    `,
    imports: [ThyProgress]
})
class ThyDemoProgressTooltipTemplateComponent {
    value: ThyProgressStackedValue[] = [
        {
            type: 'success',
            value: 40
        },
        {
            type: 'danger',
            value: 60
        },
        {
            type: 'warning',
            value: 100
        }
    ];
    size: string;
}

function assertTooltipInstance(tooltip: ThyTooltipDirective, shouldExist: boolean): void {
    const tooltipInstance = tooltip['tooltipRef'] ? tooltip['tooltipRef']['tooltipInstance'] : null;
    expect(!!tooltipInstance).toBe(shouldExist);
}

describe(`ThyProgressComponent`, () => {
    describe(`basic`, () => {
        let fixture: ComponentFixture<ThyDemoProgressBasicComponent>;
        let basicTestComponent: ThyDemoProgressBasicComponent;
        let progressComponent: DebugElement;
        let progressBarComponent: DebugElement;
        let progressElement: HTMLElement;
        let progressBarElement: HTMLElement;
        let progressBarInnerElement: HTMLElement;
        let tooltipDirective: ThyTooltipDirective;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyProgressModule],
                providers: [provideNoopAnimations()]
            });

            TestBed.compileComponents();

            inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
            })();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoProgressBasicComponent);
            basicTestComponent = fixture.debugElement.componentInstance;
            progressComponent = fixture.debugElement.query(By.directive(ThyProgress));
            progressElement = progressComponent.nativeElement;
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
        });

        function assertProgressAndBarComponentClass(styleWidth: string = '20%') {
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);
            const barElement = progressBarComponent.nativeElement;
            expect(barElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            expect(barElement.style.width).toEqual(styleWidth);
        }

        it('should be created progress component', () => {
            expect(progressComponent).toBeTruthy();
        });

        it('should be correct class by default type', () => {
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            assertProgressAndBarComponentClass();
        });

        it('should be correct class when input type is success or warning', () => {
            basicTestComponent.type = 'success';
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            progressBarElement = progressBarComponent.nativeElement;
            progressBarInnerElement = fixture.debugElement.query(By.css('.progress-bar-inner')).nativeElement;
            assertProgressAndBarComponentClass();
            expect(progressBarElement.classList.contains(`progress-bar-${basicTestComponent.type}`)).toBe(true);

            basicTestComponent.type = 'warning';
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            progressBarElement = progressBarComponent.nativeElement;
            progressBarInnerElement = fixture.debugElement.query(By.css('.progress-bar-inner')).nativeElement;
            assertProgressAndBarComponentClass();
            expect(progressBarElement.classList.contains(`progress-bar-${basicTestComponent.type}`)).toBe(true);
        });

        it('should be correct class when input size is sm', () => {
            basicTestComponent.size = 'sm';
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            assertProgressAndBarComponentClass();
            expect(progressElement.classList.contains('progress-sm')).toBe(true);
        });

        it('should be correct percent with dynamically changed values', () => {
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            progressBarElement = progressBarComponent.nativeElement;
            assertProgressAndBarComponentClass();

            basicTestComponent.value = 30;
            fixture.detectChanges();
            expect(progressBarElement.style.width).toEqual('30%');
        });

        it('should be have a tooltip use string', fakeAsync(() => {
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            progressBarElement = progressBarComponent.nativeElement;

            tooltipDirective = progressBarComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
            assertTooltipInstance(tooltipDirective, false);
            // fake mouseenter event
            dispatchMouseEvent(progressBarElement, 'mouseenter');
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            fixture.detectChanges();
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.textContent.trim()).toEqual(TOOLTIP_MESSAGE);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(progressBarElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should be have a tooltip use string', fakeAsync(() => {
            const buttonDebugElement = fixture.debugElement.query(By.css('button'));
            const buttonElement = buttonDebugElement.nativeElement;
            buttonElement.click();
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.query(By.directive(ThyProgressStrip));
            progressBarElement = progressBarComponent.nativeElement;

            tooltipDirective = progressBarComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
            assertTooltipInstance(tooltipDirective, false);
            // fake mouseenter event
            dispatchMouseEvent(progressBarElement, 'mouseenter');
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            fixture.detectChanges();
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.textContent.trim()).toEqual(TOOLTIP_TEMPLATE_MESSAGE);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(progressBarElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));
    });

    describe(`circle`, () => {
        let fixture: ComponentFixture<ThyDemoProgressCircleComponent>;
        let circleTestComponent: ThyDemoProgressCircleComponent;
        let progressComponent: DebugElement;
        let progressCircleComponent: DebugElement;
        let progressElement: HTMLElement;
        let progressCircleElement: HTMLElement;
        let progressCircleInnerElement: HTMLElement;
        let tooltipDirective: ThyTooltipDirective;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        function computedCirclePath(strokeValue: string, value = 20, gapDegree = 0, strokeWidth = 6, size: string = 'md') {
            const circle = Math.PI * 2 * (50 - strokeWidth / 2);
            const len = `${(value / 100) * (circle - gapDegree)}px ${circle}px`;
            strokeValue = progressCircleComponent.componentInstance.circle().progressCirclePath[0].strokePathStyle.strokeDasharray;
            expect(strokeValue).toBe(len);
        }

        function computedPathString(position: string = 'top', strokeWidth = 6) {
            const circlePath = progressCircleElement.querySelector('.progress-circle-path');
            const radius = 50 - strokeWidth / 2;
            let beginPositionX = 0;
            let beginPositionY = -radius;
            let endPositionX = 0;
            let endPositionY = radius * -2;
            switch (position) {
                case 'left':
                    beginPositionX = -radius;
                    beginPositionY = 0;
                    endPositionX = radius * 2;
                    endPositionY = 0;
                    break;
                case 'right':
                    beginPositionX = radius;
                    beginPositionY = 0;
                    endPositionX = radius * -2;
                    endPositionY = 0;
                    break;
                case 'bottom':
                    beginPositionY = radius;
                    endPositionY = radius * 2;
                    break;
                default:
            }

            const pathString = `M 50,50 m ${beginPositionX},${beginPositionY} a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
            expect(pathString).toBe(circlePath.getAttribute('d'));
        }

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyProgressModule],
                providers: [provideNoopAnimations()]
            });

            TestBed.compileComponents();

            inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
            })();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoProgressCircleComponent);
            circleTestComponent = fixture.debugElement.componentInstance;
            progressComponent = fixture.debugElement.query(By.directive(ThyProgress));
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressElement = progressComponent.nativeElement;
            fixture.detectChanges();
        });

        it('should be created progress component', () => {
            expect(progressComponent).toBeTruthy();
            expect(progressElement.classList.contains('thy-progress-circle')).toBe(true);
        });

        it('should show correct color when input type is success or warning', () => {
            circleTestComponent.type = 'success';
            fixture.detectChanges();
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            progressCircleInnerElement = fixture.debugElement.query(By.css('.progress-circle-inner')).nativeElement;
            expect(progressCircleElement.classList.contains(`progress-circle-${circleTestComponent.type}`)).toBe(true);

            circleTestComponent.type = 'warning';
            fixture.detectChanges();
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            progressCircleInnerElement = fixture.debugElement.query(By.css('.progress-circle-inner')).nativeElement;
            expect(progressCircleElement.classList.contains(`progress-circle-${circleTestComponent.type}`)).toBe(true);
        });

        it('should show correct size when input size is sm', fakeAsync(() => {
            circleTestComponent.size = 'sm';
            fixture.detectChanges();
            tick(100);
            progressElement = progressComponent.nativeElement;
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            expect(progressElement.classList.contains('progress-sm')).toBe(true);
            flush();
        }));

        it('should show correct size when input size is 16', fakeAsync(() => {
            circleTestComponent.size = 16 as any;
            fixture.detectChanges();
            tick(100);
            progressElement = progressComponent.nativeElement;
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            const circleInner = progressCircleComponent.nativeElement.querySelector('.progress-circle-inner');
            expect(circleInner.style.width).toBe('16px');
            expect(circleInner.style.height).toBe('16px');
            flush();
        }));

        it('should be correct percent with dynamically changed values', () => {
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            circleTestComponent.size = 'md';
            fixture.detectChanges();

            const strokeValue: any = null;
            computedCirclePath(strokeValue);

            circleTestComponent.value = 30;
            fixture.detectChanges();
            const newStrokeValue: any = null;
            computedCirclePath(newStrokeValue, circleTestComponent.value);
        });

        it('should be have a tooltip use string', fakeAsync(() => {
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;

            tooltipDirective = progressCircleComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
            assertTooltipInstance(tooltipDirective, false);
            // fake mouseenter event
            dispatchMouseEvent(progressCircleElement, 'mouseenter');
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            fixture.detectChanges();
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.textContent.trim()).toEqual(TOOLTIP_MESSAGE);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(progressCircleElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);
        }));

        it('should show correct gapDegree when input thyGapDegree', fakeAsync(() => {
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            circleTestComponent.gapDegree = 100;
            fixture.detectChanges();

            const strokeValue: any = null;
            computedCirclePath(strokeValue, 20, circleTestComponent.gapDegree);

            circleTestComponent.gapDegree = 70;
            fixture.detectChanges();
            const newStrokeValue: any = null;
            computedCirclePath(newStrokeValue, 20, circleTestComponent.gapDegree);
        }));

        it('should show correct strokeWidth when input thyStrokeWidth', fakeAsync(() => {
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            const strokeWidthElement = progressCircleElement.querySelector('path');
            circleTestComponent.strokeWidth = 10;
            fixture.detectChanges();
            const strokeWidth = Number(strokeWidthElement.getAttribute('stroke-width'));
            expect(strokeWidth).toBe(circleTestComponent.strokeWidth);

            circleTestComponent.strokeWidth = 20;
            fixture.detectChanges();
            const newStrokeWidth = Number(strokeWidthElement.getAttribute('stroke-width'));
            expect(newStrokeWidth).toBe(circleTestComponent.strokeWidth);
        }));

        it('should show correct gapPosition when input thyGapPosition', fakeAsync(() => {
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            progressCircleElement = progressCircleComponent.nativeElement;
            computedPathString();

            circleTestComponent.gapPosition = 'bottom';
            fixture.detectChanges();
            computedPathString('bottom');

            circleTestComponent.gapPosition = 'left';
            fixture.detectChanges();
            computedPathString('left');

            circleTestComponent.gapPosition = 'right';
            fixture.detectChanges();
            computedPathString('right');
        }));

        it('should show correct stakeValue when input value is array', fakeAsync(() => {
            (circleTestComponent.value as any) = circleTestComponent.stackedValue;
            fixture.detectChanges();
            progressCircleComponent = fixture.debugElement.query(By.directive(ThyProgressCircle));
            const path = progressCircleComponent.nativeElement.querySelectorAll('.progress-circle-path');
            expect(path.length).toBe(circleTestComponent.stackedValue.length);
        }));
    });

    describe(`stacked`, () => {
        let fixture: ComponentFixture<ThyDemoProgressStackedComponent>;
        let stackedTestComponent: ThyDemoProgressStackedComponent;
        let progressComponent: DebugElement;
        let progressBarComponents: DebugElement[];
        let progressElement: HTMLElement;
        let progressBarElements: HTMLElement[];
        let progressBarElement: HTMLElement;
        let progressTooltipBarElement: HTMLElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;
        let tooltipDirective: ThyTooltipDirective;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef']['isTooltipVisible']();
        }

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyProgressModule],
                providers: [provideNoopAnimations()]
            });

            TestBed.compileComponents();

            inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
            })();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoProgressStackedComponent);
            stackedTestComponent = fixture.debugElement.componentInstance;
            progressComponent = fixture.debugElement.query(By.directive(ThyProgress));
            progressElement = progressComponent.nativeElement;
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
        });

        it('should be created progress component', () => {
            expect(progressComponent).toBeTruthy();
        });

        it('should be correct class by stacked value', () => {
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(3);
            progressBarElements.forEach(progressBarElement => {
                expect(progressBarElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            });
            expect(progressBarElements[0].style.width).toEqual('20%');
            expect(progressBarElements[1].style.width).toEqual('30%');
            expect(progressBarElements[2].style.width).toEqual('50%');
        });

        it('should be have a tooltip in second progress bar', fakeAsync(() => {
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressBarElements.length).toBe(3);

            progressBarElement = progressBarComponents[0].nativeElement;
            progressTooltipBarElement = progressBarComponents[1].nativeElement;

            const progressTooltipBarComponent = progressBarComponents[1];
            const progressBarComponent = progressBarComponents[0];
            tooltipDirective = progressBarComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);

            // fake mouseenter event
            dispatchMouseEvent(progressBarElement, 'mouseenter');
            tick(200);
            expect(overlayContainerElement.textContent).toEqual('');
            assertTooltipInstance(tooltipDirective, false);
            dispatchMouseEvent(progressBarElement, 'mouseleave');
            tick(100);
            fixture.detectChanges();

            tooltipDirective = progressTooltipBarComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
            dispatchMouseEvent(progressTooltipBarElement, 'mouseenter');
            expect(getTooltipVisible()).toBe(false);
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            fixture.detectChanges();
            const tooltip = stackedTestComponent.value[1].tips;
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.textContent).toEqual(` ${tooltip} `);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(progressTooltipBarElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should be correct color by custom stacked value with color', () => {
            stackedTestComponent.value = [
                {
                    value: 20,
                    color: '#4e8af9'
                },
                {
                    value: 40,
                    color: '#66c060'
                },
                {
                    value: 80,
                    color: '#ffd234'
                }
            ];
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(3);
            progressBarElements.forEach(progressBarElement => {
                expect(progressBarElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            });

            expect(progressBarElements[0].style.width).toEqual('14.29%');
            expect(progressBarElements[1].style.width).toEqual('28.57%');
            expect(progressBarElements[2].style.width).toEqual('57.14%');

            expect((progressBarElements[0].querySelector('.progress-bar-inner') as HTMLElement).style['background-color']).toEqual(
                hexToRgb('#4e8af9')
            );
            expect((progressBarElements[1].querySelector('.progress-bar-inner') as HTMLElement).style['background-color']).toEqual(
                hexToRgb('#66c060')
            );
            expect((progressBarElements[2].querySelector('.progress-bar-inner') as HTMLElement).style['background-color']).toEqual(
                hexToRgb('#ffd234')
            );
        });
    });

    describe(`stacked has max`, () => {
        let fixture: ComponentFixture<ThyDemoProgressStackedMaxComponent>;
        let stackedTestComponent: ThyDemoProgressStackedMaxComponent;
        let progressComponent: DebugElement;
        let progressBarComponents: DebugElement[];
        let progressElement: HTMLElement;
        let progressBarElements: HTMLElement[];
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyProgressModule],
                providers: [provideNoopAnimations()]
            });

            TestBed.compileComponents();

            inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
            })();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoProgressStackedMaxComponent);
            stackedTestComponent = fixture.debugElement.componentInstance;
            progressComponent = fixture.debugElement.query(By.directive(ThyProgress));
            progressElement = progressComponent.nativeElement;
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
        });

        it('should be correct value by custom stacked value has max ', () => {
            stackedTestComponent.value = [
                {
                    type: 'success',
                    value: 20
                },
                {
                    type: 'warning',
                    value: 20
                },
                {
                    type: 'danger',
                    value: 20
                },
                {
                    type: 'info',
                    value: 30,
                    color: '#7076fa',
                    label: 'custom color'
                }
            ];
            stackedTestComponent.max = 180;
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(4);
            progressBarElements.forEach(progressBarElement => {
                expect(progressBarElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            });

            expect(progressBarElements[0].style.width).toEqual('11.11%');
            expect(progressBarElements[1].style.width).toEqual('11.11%');
            expect(progressBarElements[2].style.width).toEqual('11.11%');
            expect(progressBarElements[3].style.width).toEqual('16.67%');
            expect((progressBarElements[3].querySelector('.progress-bar-inner') as HTMLElement).style['background-color']).toEqual(
                hexToRgb('#7076fa')
            );
        });

        it('should be correct values item value has 0 by custom stacked value has max ', () => {
            stackedTestComponent.value = [
                {
                    type: 'success',
                    value: 0
                },
                {
                    type: 'warning',
                    value: 20
                },
                {
                    type: 'danger',
                    value: 20
                }
            ];
            stackedTestComponent.max = 40;
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(2);
            progressBarElements.forEach(progressBarElement => {
                expect(progressBarElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            });

            expect(progressBarElements[0].style.width).toEqual('50%');
            expect(progressBarElements[1].style.width).toEqual('50%');
        });

        it('should be correct values item value has 0 and total greater than max by custom stacked value', () => {
            stackedTestComponent.value = [
                {
                    type: 'success',
                    value: 0
                },
                {
                    type: 'warning',
                    value: 20
                },
                {
                    type: 'danger',
                    value: 20
                }
            ];
            stackedTestComponent.max = 30;
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(2);
            progressBarElements.forEach(progressBarElement => {
                expect(progressBarElement.classList.contains(PROGRESS_BAR_CLASS_NAME)).toBe(true);
            });

            expect(progressBarElements[0].style.width).toEqual('50%');
            expect(progressBarElements[1].style.width).toEqual('50%');
        });

        it('should be correct when value or max is change', () => {
            stackedTestComponent.value = [
                {
                    type: 'warning',
                    value: 30
                }
            ];
            stackedTestComponent.max = 90;
            fixture.detectChanges();
            let progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('33.33%');

            fixture.detectChanges();
            stackedTestComponent.value = [
                {
                    type: 'warning',
                    value: 100
                }
            ];
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('100%');

            fixture.detectChanges();
            stackedTestComponent.value = [
                {
                    type: 'warning',
                    value: 45
                }
            ];
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('50%');

            fixture.detectChanges();
            stackedTestComponent.max = 180;
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('25%');

            fixture.detectChanges();
            stackedTestComponent.max = 90;
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('50%');

            fixture.detectChanges();
            stackedTestComponent.value = [
                {
                    type: 'warning',
                    value: 90
                }
            ];
            fixture.detectChanges();
            progressBarComponent = fixture.debugElement.queryAll(By.directive(ThyProgressStrip))[0].nativeElement;
            expect(progressBarComponent.style.width).toEqual('100%');
        });

        it('should be correct value with 0 by custom stacked value has max with 0 ', () => {
            stackedTestComponent.value = [];
            stackedTestComponent.max = 0;
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressElement.classList.contains(PROGRESS_CLASS_NAME)).toBe(true);

            expect(progressBarElements.length).toBe(0);
            progressBarElements.forEach(progressBarElement => {
                expect(
                    (progressBarElement.querySelector('.progress-bar-inner') as HTMLElement).classList.contains(PROGRESS_BAR_CLASS_NAME)
                ).toBe(true);
            });
        });
    });

    describe(`tooltipTemplate`, () => {
        let fixture: ComponentFixture<ThyDemoProgressTooltipTemplateComponent>;
        let toolTipTemplateTestComponent: ThyDemoProgressTooltipTemplateComponent;
        let progressComponent: DebugElement;
        let progressBarComponents: DebugElement[];
        let progressElement: HTMLElement;
        let tooltipDirective: ThyTooltipDirective;
        let progressBarElements: HTMLElement[];
        let progressBarElement: HTMLElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyProgressModule],
                providers: [provideNoopAnimations()]
            });

            TestBed.compileComponents();

            inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
            })();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoProgressTooltipTemplateComponent);
            toolTipTemplateTestComponent = fixture.debugElement.componentInstance;
            progressComponent = fixture.debugElement.query(By.directive(ThyProgress));
            progressElement = progressComponent.nativeElement;
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
        });

        it('should be created progress component', () => {
            expect(progressComponent).toBeTruthy();
        });

        it('should be created progress tooltip component width component', fakeAsync(() => {
            fixture.detectChanges();
            progressBarComponents = fixture.debugElement.queryAll(By.directive(ThyProgressStrip));
            progressBarElements = progressBarComponents.map(item => item.nativeElement);
            expect(progressBarElements.length).toBe(3);
            progressBarElement = progressBarComponents[0].nativeElement;
            const progressBarComponent = progressBarComponents[0];
            tooltipDirective = progressBarComponent.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
            assertTooltipInstance(tooltipDirective, false);

            // fake mouseenter event
            dispatchMouseEvent(progressBarElement, 'mouseenter');
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            fixture.detectChanges();
            const data = toolTipTemplateTestComponent.value[0];
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            const text = `type: ${data.type}-value: ${data.value}`;

            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.textContent).toEqual(text);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(progressBarElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));
    });
});
