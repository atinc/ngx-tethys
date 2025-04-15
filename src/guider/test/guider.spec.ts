import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit, TemplateRef, ViewChild, inject as coreInject } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import {
    ThyGuiderManager,
    ThyGuiderRef,
    ThyGuiderConfig,
    ThyGuiderStep,
    ThyGuiderModule,
    ThyGuider,
    defaultGuiderPositionConfig,
    ThyGuiderTargetDirective
} from 'ngx-tethys/guider';

const guiderSteps: ThyGuiderStep[] = [
    {
        key: 'multi-steps-tip-start',
        target: '',
        data: {
            image: '',
            title: 'step 1/3',
            description: '本次新手引导总共五步，第一步：无目标'
        }
    },
    {
        key: 'multi-steps-tip-1',
        target: '.basic-hint-target',
        data: {
            image: '',
            title: 'step 2/3',
            description: '新手引导五步中的第二步'
        },
        hintPlacement: 'right'
    },
    {
        key: 'multi-steps-tip-end',
        target: { x: 500, y: 500 },
        data: {
            image: '',
            title: 'step 3/3',
            description: '新手引导的最后一步'
        }
    }
];

const basicGuiderSteps: ThyGuiderStep[] = [
    {
        key: 'basic-hint-target',
        target: '.basic-hint-target',
        data: {
            image: '',
            title: '基础新手引导的使用',
            description: '设置相关的信息即可使用'
        }
    }
];

const templateRefInnerText = 'template content';

const directiveGuiderSteps: ThyGuiderStep[] = [
    {
        key: 'directive-tip-target',
        data: {
            image: '',
            title: '指令型新手引导',
            description: 'DOM已经显示的指令型新手引导'
        }
    },
    {
        key: 'directive-tip-target-second',
        data: {
            image: '',
            title: '同页面的第二个指令型新手引导',
            description: '同页面中的第二个通过指令设置的新手引导，'
        }
    },
    {
        key: 'directive-tip-target-last',
        route: '/components/guider/examples',
        data: {
            image: '',
            title: '其他页面的指令型新手引导',
            description: '其他页面的通过指令设置的新手引导，'
        }
    }
];

@Component({
    selector: 'thy-guider-basic',
    template: `
        <ng-template #descTemp>
            <span>{{ innerText }}</span>
        </ng-template>
        <span class="basic-hint-target">target element</span>
        <button class="trigger-guider-element" (click)="startGuider()">Open</button>
        <button class="close-basic-hint-target" (click)="closeGuider()">Close by Service</button>
    `
})
class GuiderBasicComponent implements OnInit {
    private thyGuider = coreInject(ThyGuider);

    public guiderRef: ThyGuiderRef;

    @ViewChild('descTemp', { static: true }) descTemp: TemplateRef<HTMLElement>;

    public option = {
        steps: basicGuiderSteps
    };

    public multiStepsOption: ThyGuiderConfig = {
        steps: guiderSteps,
        defaultPosition: { x: 100, y: 50 }
    };

    public innerText = templateRefInnerText;

    ngOnInit() {
        this.guiderRef = this.thyGuider.create(this.option);
    }

    startGuider() {
        this.guiderRef.start();
    }

    closeGuider() {
        this.thyGuider.close();
    }

    setMultiStepsGuider() {
        this.guiderRef = null;
        this.guiderRef = this.thyGuider.create(this.multiStepsOption);
    }

    setTemplateStepGuider() {
        const templateOption = {
            steps: [
                {
                    key: 'basic-hint-target',
                    target: '.basic-hint-target',
                    data: {
                        image: '',
                        title: '基础新手引导的使用',
                        description: this.descTemp
                    }
                }
            ]
        };
        this.guiderRef = null;
        this.guiderRef = this.thyGuider.create(templateOption);
    }
}

@Component({
    selector: 'test-guider-directive',
    template: `
        @if (show) {
            <span thyGuiderTarget="directive-tip-target" class="test-directive-span">back directive</span>
        }
        @if (delayShow) {
            <span thyGuiderTarget="directive-tip-target-second" class="test-directive-span-second"> directive 2</span>
        }
    `,
    imports: [ThyGuiderTargetDirective]
})
class TestGuiderDirectiveComponent implements OnInit {
    private thyGuider = coreInject(ThyGuider);

    public guiderRef: ThyGuiderRef;

    public show = true;

    public delayShow = false;

    ngOnInit() {
        this.guiderRef = this.thyGuider.create({
            steps: directiveGuiderSteps
        });
    }

    toggleDelayShow() {
        this.delayShow = true;
    }
}

@Component({
    selector: 'test-guider-multi-targets',
    template: `
        @if (show) {
            <span class="target-0">Target-0</span>
        }
        <ng-container>
            <span class="target-1"> Target-1</span>
        </ng-container>
        <button class="trigger-guider-element" (click)="startGuider()">Open</button>
    `
})
class TestGuiderMultiTargetsComponent implements OnInit {
    private thyGuider = coreInject(ThyGuider);

    public guiderRef: ThyGuiderRef;

    public show = true;

    ngOnInit() {
        this.guiderRef = this.thyGuider.create({
            steps: [
                {
                    key: 'target-0',
                    target: ['.target-0', '.target-1'],
                    data: {
                        image: '',
                        title: '多Target情况下的展示',
                        description: '设置相关的信息即可使用'
                    }
                }
            ]
        });
    }

    startGuider() {
        this.guiderRef.start();
    }

    toggleShow() {
        this.show = false;
    }
}

const TEST_COMPONENTS = [GuiderBasicComponent, TestGuiderDirectiveComponent, TestGuiderMultiTargetsComponent];

describe(`thyGuider`, () => {
    let guider: ThyGuider;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: Element;
    let fixture: ComponentFixture<GuiderBasicComponent>;
    let fixtureInstance: GuiderBasicComponent;
    let debugElement: DebugElement;
    let managerService: ThyGuiderManager;
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyGuiderModule],
            providers: [{ provide: Router, useValue: routerSpy }, provideNoopAnimations()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(inject(
        [ThyGuider, ThyGuiderManager, OverlayContainer],
        (_guider: ThyGuider, _manager: ThyGuiderManager, _overlayContainer: OverlayContainer) => {
            guider = _guider;
            managerService = _manager;
            overlayContainer = _overlayContainer;
            overlayContainerElement = _overlayContainer.getContainerElement();
        }
    ));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('basic', () => {
        let basicConfig: ThyGuiderConfig;
        let guiderRef: ThyGuiderRef;
        beforeEach(() => {
            basicConfig = {
                steps: [
                    {
                        key: 'basic-hint-target',
                        target: '.basic-hint-target',
                        data: {
                            image: '',
                            title: '基础新手引导的使用',
                            description: '设置相关的信息即可使用'
                        }
                    },
                    {
                        key: 'basic-hint-target-error',
                        target: '.basic-hint-target-error',
                        data: {
                            image: '',
                            title: '错误的target',
                            description: '错误'
                        }
                    }
                ]
            };
            guiderRef = guider.create(basicConfig);
        });
        it('should create guiderRef when invoke create function', () => {
            expect(guiderRef instanceof ThyGuiderRef).toBe(true);
        });

        it('default value should work when the value of config is not set', () => {
            const { hintOffset, hintPlacement, pointOffset, defaultPosition, hintComponent } = defaultGuiderPositionConfig;
            const refConfig = guiderRef.config;
            const step = guiderRef.steps[0];
            expect(step.hintOffset).toBe(hintOffset);
            expect(step.hintPlacement).toBe(hintPlacement);
            expect(step.pointOffset).toBe(pointOffset);
            expect(refConfig.defaultPosition).toBe(defaultPosition);
            expect(refConfig.hintComponent).toBe(hintComponent);
        });

        it('should throw error when config is not type of ThyGuiderConfig', () => {
            const errorMessage = `'config.steps' must be an array of length greater than 0`;

            expect(() => {
                guider.create(null);
            }).toThrowError(errorMessage);

            expect(() => {
                guider.create({ steps: '' as unknown } as ThyGuiderConfig);
            }).toThrowError(errorMessage);
        });

        // it('should throw error when target is not exist', () => {
        //     expect(() => {
        //         guiderRef.active(1);
        //     }).toThrow();
        // });
    });

    describe('guiderRef', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(GuiderBasicComponent);
            fixtureInstance = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });

        it('should show hint component when start guider,or hidden when close guider', fakeAsync(() => {
            openHintComponent();
            fixture.detectChanges();
            expect(getHintContainer()).not.toBeNull();

            fixture.detectChanges();
            dispatchMouseEvent(debugElement.query(By.css('.close-basic-hint-target')).nativeElement, 'click');
            fixture.detectChanges();
            tick(500);
            expect(getHintContainer()).toBeNull();
        }));

        it('should be informed when the target is clicked', fakeAsync(() => {
            openHintComponent();
            fixture.detectChanges();
            const target = debugElement.query(By.css('.basic-hint-target')).nativeElement as HTMLInputElement;
            fixture.detectChanges();
            const spy = jasmine.createSpy('target click');
            fixtureInstance.guiderRef.targetClicked().subscribe(spy);
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();

            dispatchMouseEvent(target, 'click');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        }));

        it('should be informed when the guider is ended', fakeAsync(() => {
            openHintComponent();
            fixture.detectChanges();
            const target = queryHintComponentBtnArea().firstElementChild;
            fixture.detectChanges();
            const spyEnded = jasmine.createSpy('guider ended');
            fixtureInstance.guiderRef.ended().subscribe(spyEnded);
            fixture.detectChanges();
            expect(spyEnded).not.toHaveBeenCalled();

            dispatchMouseEvent(target, 'click');
            fixture.detectChanges();
            expect(spyEnded).toHaveBeenCalled();
        }));

        // it('should do nothing when index is out of range', fakeAsync(() => {
        //     openHintComponent();
        //     fixture.detectChanges();
        //     spyOn(fixtureInstance.guiderRef, 'next');
        //     expect(fixtureInstance.guiderRef.next).toHaveBeenCalledTimes(0);

        //     fixtureInstance.guiderRef.next();
        //     tick(500);
        //     fixture.detectChanges();

        //     // const spy = spyOn(fixtureInstance.guiderRef, 'to');
        //     // expect(spy).toHaveBeenCalledTimes(1);
        //     // expect(nextValue).toBeUndefined();
        //     // expect(fixtureInstance.guiderRef.next.calls.count()).toBe(1);
        //     expect(fixtureInstance.guiderRef.next).toHaveBeenCalled();
        // }));

        it('should show the right content when it does not start from the first one', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            fixture.detectChanges();
            fixtureInstance.guiderRef.active(2);
            tick(500);
            fixture.detectChanges();

            const content = queryHintComponentDescription();
            expect(content.innerText).toBe(guiderSteps[2].data.description);

            fixtureInstance.closeGuider();
            fixture.detectChanges();
            fixtureInstance.guiderRef.active('multi-steps-tip-1');
            tick(500);
            fixture.detectChanges();
            const secondContent = queryHintComponentDescription();
            expect(secondContent.innerText).toBe(guiderSteps[1].data.description);
        }));

        it('should show first step when index exceeds the length of the array', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            fixture.detectChanges();
            fixtureInstance.guiderRef.active(guiderSteps.length);
            tick(500);
            fixture.detectChanges();
            const content = queryHintComponentDescription();
            expect(content.innerText).toBe(guiderSteps[0].data.description);
        }));
    });

    describe('guider-hint', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(GuiderBasicComponent);
            fixtureInstance = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
        it('should not show previous btn when step is first in steps', fakeAsync(() => {
            openHintComponent();
            fixture.detectChanges();
            const btnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            expect(btnArea.children.length).toBe(1);
        }));

        it('should hidden hint component when click close or jump btn', fakeAsync(() => {
            openHintComponent();
            fixture.detectChanges();
            const btnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            const firstBtn = btnArea.firstElementChild as HTMLElement;
            dispatchMouseEvent(firstBtn, 'click');
            fixture.detectChanges();
            tick(500);
            expect(getHintContainer()).toBeNull();

            openHintComponent();
            fixture.detectChanges();
            dispatchMouseEvent(queryHintComponentJumpBtn(), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getHintContainer()).toBeNull();
        }));

        it('should show correct text based on the length of steps', fakeAsync(() => {
            const getBtnText = (steps: ThyGuiderStep[]) => (steps.length > 1 ? '下一步' : '完成');
            openHintComponent();
            fixture.detectChanges();
            const btnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            const firstBtn = btnArea.firstElementChild as HTMLElement;
            expect(firstBtn.innerText).toBe(getBtnText(fixtureInstance.option.steps));

            dispatchMouseEvent(firstBtn, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            openHintComponent();
            fixture.detectChanges();
            const multiStepsBtnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            const multiStepsFirstBtn = multiStepsBtnArea.firstElementChild as HTMLElement;
            expect(multiStepsFirstBtn.innerText).toBe(getBtnText(guiderSteps));
        }));

        it('should update step info when click next or previous btn', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            openHintComponent();
            expect(getHintContainer()).not.toBeNull();

            const btnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            const nextBtn = btnArea.firstElementChild as HTMLElement;
            dispatchMouseEvent(nextBtn, 'click');
            fixture.detectChanges();
            tick(500);
            expect(getHintContainer()).not.toBeNull();
            const secondStepDescription = queryHintComponentDescription();
            expect(secondStepDescription.innerText).toBe(guiderSteps[1].data.description);

            const secondStepBtnArea = queryHintComponentBtnArea();
            fixture.detectChanges();
            const prevBtn = secondStepBtnArea.firstElementChild as HTMLElement;
            dispatchMouseEvent(prevBtn, 'click');
            fixture.detectChanges();
            tick(500);
            expect(getHintContainer()).not.toBeNull();
            const firstStepDescription = queryHintComponentDescription();
            expect(firstStepDescription.innerText).toBe(guiderSteps[0].data.description);
        }));

        it('should show template when type of description is templateRef', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.setTemplateStepGuider();
            fixture.detectChanges();
            openHintComponent();
            fixture.detectChanges();
            const content = queryHintComponentDescription().firstElementChild as HTMLElement;
            expect(content.nodeName).toBe('span'.toUpperCase());
            expect(content.innerText).toBe(templateRefInnerText);
        }));

        it('should add custom class when config pointClass', fakeAsync(() => {
            fixtureInstance.multiStepsOption.pointClass = 'custom-point-class';
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            fixture.detectChanges();
            fixtureInstance.guiderRef.active(1);
            tick(500);
            fixture.detectChanges();

            const point = debugElement.query(By.css('.thy-guider-highlight-container')).nativeElement as HTMLElement;
            const hasCustomClass = point.classList.contains('custom-point-class');
            expect(hasCustomClass).toBeTruthy();

            fixtureInstance.guiderRef.close();
            fixture.detectChanges();
            fixtureInstance.multiStepsOption.pointClass = ['custom-point-class-2', 'custom-point-class-3'];
            fixture.detectChanges();
            fixtureInstance.setMultiStepsGuider();
            fixture.detectChanges();
            fixtureInstance.guiderRef.active(1);
            tick(500);
            fixture.detectChanges();

            const secondPoint = debugElement.query(By.css('.thy-guider-highlight-container')).nativeElement as HTMLElement;
            const hasSecondCustomClass = secondPoint.classList.contains('custom-point-class-2');
            expect(hasSecondCustomClass).toBeTruthy();
            const hasThirdCustomClass = secondPoint.classList.contains('custom-point-class-3');
            expect(hasThirdCustomClass).toBeTruthy();
        }));
    });

    describe('guider directive and guider manager service', () => {
        let fixtureOfDirective: ComponentFixture<TestGuiderDirectiveComponent>;
        let fixtureInstanceOfDirective: TestGuiderDirectiveComponent;
        let debugElement: DebugElement;
        beforeEach(() => {
            fixtureOfDirective = TestBed.createComponent(TestGuiderDirectiveComponent);
            fixtureInstanceOfDirective = fixtureOfDirective.componentInstance;
            debugElement = fixtureOfDirective.debugElement;
            fixtureOfDirective.detectChanges();
        });
        it('should active first step when component is afterViewInit', fakeAsync(() => {
            const guiderRef = fixtureInstanceOfDirective.guiderRef;
            const target = debugElement.query(By.css('.test-directive-span')).nativeElement as HTMLInputElement;
            fixtureOfDirective.detectChanges();
            expect(managerService.getActiveTarget('directive-tip-target')).toBe(target);

            fixtureOfDirective.detectChanges();
            guiderRef.start();
            flush();
            fixtureOfDirective.detectChanges();
            const spy = spyOn(managerService, 'removeStepTarget');
            expect(spy).not.toHaveBeenCalled();
            fixtureInstanceOfDirective.show = false;
            fixtureOfDirective.detectChanges();

            expect(spy).toHaveBeenCalled();
        }));

        it('should directive show when step key equal targetDirective', fakeAsync(() => {
            const guiderRef = fixtureInstanceOfDirective.guiderRef;
            expect(getHintContainer()).toBeNull();

            managerService.updateActive('directive-tip-target-second', guiderRef);
            fixtureOfDirective.detectChanges();
            tick(500);
            fixtureInstanceOfDirective.toggleDelayShow();
            fixtureOfDirective.detectChanges();
            flush();
            fixtureOfDirective.detectChanges();
            expect(getHintContainer()).not.toBeNull();
        }));

        it('should not exist in the targetListMap when the removeStepTarget is executed', fakeAsync(() => {
            expect(managerService.getActiveTarget('directive-tip-target')).toBeTruthy();
            managerService.removeStepTarget('directive-tip-target');
            fixtureOfDirective.detectChanges();
            expect(managerService.getActiveTarget('directive-tip-target')).toBeUndefined();
        }));

        it('should direction', fakeAsync(() => {
            const guiderRef = fixtureInstanceOfDirective.guiderRef;
            fixtureOfDirective.detectChanges();
            guiderRef.active(2);
            flush();
            const spy = routerSpy.navigateByUrl as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];
            const route = directiveGuiderSteps[2].route;
            expect(navArgs).toBe(route);
        }));
    });

    describe('multi target', () => {
        let fixtureOfMulti: ComponentFixture<TestGuiderMultiTargetsComponent>;
        let fixtureInstanceOfMulti: TestGuiderMultiTargetsComponent;
        let debugElement: DebugElement;
        beforeEach(() => {
            fixtureOfMulti = TestBed.createComponent(TestGuiderMultiTargetsComponent);
            fixtureInstanceOfMulti = fixtureOfMulti.componentInstance;
            debugElement = fixtureOfMulti.debugElement;
            fixtureOfMulti.detectChanges();
        });
        it('should active first step target item when target is exist', fakeAsync(() => {
            const btn = debugElement.query(By.css('.trigger-guider-element')).nativeElement as HTMLInputElement;
            dispatchMouseEvent(btn, 'click');
            fixtureOfMulti.detectChanges();
            tick(500);
            const guiderRef = fixtureInstanceOfMulti.guiderRef;
            const targetData = guiderRef.steps[0].target;
            const targetEle0 = debugElement.query(By.css(`${targetData[0]}`)).nativeElement as HTMLInputElement;
            const targetEle1 = debugElement.query(By.css(`${targetData[1]}`)).nativeElement as HTMLInputElement;

            expect(targetEle0.querySelector('.thy-guider-highlight-container')).not.toBeNull();
            expect(targetEle1.querySelector('.thy-guider-highlight-container')).toBeNull();
        }));

        it('should active second step target item when first target is none', fakeAsync(() => {
            fixtureInstanceOfMulti.toggleShow();
            fixtureOfMulti.detectChanges();
            const btn = debugElement.query(By.css('.trigger-guider-element')).nativeElement as HTMLInputElement;
            dispatchMouseEvent(btn, 'click');
            fixtureOfMulti.detectChanges();
            tick(500);
            const guiderRef = fixtureInstanceOfMulti.guiderRef;
            const targetData = guiderRef.steps[0].target;
            const targetEle0 = debugElement.query(By.css(`${targetData[0]}`))?.nativeElement as HTMLInputElement;
            const targetEle1 = debugElement.query(By.css(`${targetData[1]}`)).nativeElement as HTMLInputElement;

            expect(targetEle0?.querySelector('.thy-guider-highlight-container')).toBeFalsy();
            expect(targetEle1.querySelector('.thy-guider-highlight-container')).not.toBeNull();
        }));
    });

    function getGuiderTriggerElement(): HTMLInputElement {
        return debugElement.query(By.css('.trigger-guider-element')).nativeElement as HTMLInputElement;
    }
    function queryHintComponentBtnArea() {
        return queryFromOverlay('.thy-guider-tip-step-btn') as HTMLElement;
    }
    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }
    function getHintContainer(): HTMLElement {
        return queryFromOverlay('.cdk-overlay-pane') as HTMLElement;
    }

    function queryHintComponentDescription() {
        return queryFromOverlay('.thy-guider-tip-content-description') as HTMLElement;
    }

    function queryHintComponentJumpBtn() {
        return queryFromOverlay('.thy-guider-tip-top-btn') as HTMLElement;
    }
    function openHintComponent() {
        fixture.detectChanges();
        dispatchMouseEvent(getGuiderTriggerElement(), 'click');
        fixture.detectChanges();
        tick(500);
    }
});
