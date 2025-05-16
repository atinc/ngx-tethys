import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyStep, ThyStepper } from 'ngx-tethys/stepper';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
    selector: 'thy-demo-stepper',
    template: `
        <thy-stepper [thySelectedIndex]="selectedIndex" [thySelected]="selected" [thyShowStepHeader]="showStepHeader">
            <thy-step label="第一步" [thyIcon]="icon">
                <div class="demo-stepper-body first-step">
                    <button thyButton="primary">下一步</button>
                    <p>This is first description.</p>
                </div>
            </thy-step>
            <thy-step label="第二步" #selectedStep>
                <div class="demo-stepper-body second-step">
                    <button thyButton="primary">下一步</button>
                    <a thyButton="link-secondary">上一步</a>
                    <p>This is second description.</p>
                </div>
            </thy-step>
            <thy-step label="第三步">
                <div class="demo-stepper-body third-step">
                    <a thyButton="link-secondary">上一步</a>
                    <p>This is third description.</p>
                </div>
            </thy-step>
        </thy-stepper>
    `,
    imports: [ThyStepper, ThyStep]
})
class ThyDemoStepperComponent {
    @ViewChild('selectedStep', { static: true }) selectedStepperComponent: ThyStep;
    showStepHeader = true;
    selectedIndex = 0;
    selected: ThyStep = null;
    icon: string;
    next() {}
    previous() {}
}

describe('ThyStepper', () => {
    let fixture: ComponentFixture<ThyDemoStepperComponent>;
    let testComponent: ThyDemoStepperComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideAnimations()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoStepperComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('stepper', () => {
        it('should create stepper component', () => {
            expect(testComponent).toBeTruthy();
        });

        it('should have class thy-stepper', () => {
            const stepper = fixture.debugElement.query(By.directive(ThyStepper));
            expect(stepper.nativeElement.classList.contains('thy-stepper')).toBeTruthy();
        });

        it('should show stepHeader', () => {
            const stepHeader = fixture.debugElement.query(By.css('.thy-stepper-header-container'));
            expect(stepHeader.componentInstance).toBeTruthy();
        });

        it('should hide stepHeader', () => {
            testComponent.showStepHeader = false;
            fixture.detectChanges();
            const stepHeader = fixture.debugElement.query(By.css('.thy-stepper-header-container'));
            expect(stepHeader).toBeFalsy();
        });

        it('toggle step', () => {
            const stepper = fixture.debugElement.query(By.directive(ThyStepper)).componentInstance;
            stepper.next();
            fixture.detectChanges();
            const secondStep = fixture.debugElement.query(By.css('.second-step'));
            expect(secondStep.componentInstance).toBeTruthy();
            stepper.previous();
            fixture.detectChanges();
            const firstStep = fixture.debugElement.query(By.css('.first-step'));
            expect(firstStep.componentInstance).toBeTruthy();

            stepper.to(2);
            fixture.detectChanges();
            expect(stepper.selectedIndex()).toEqual(2);
        });

        it('should success when select specify stepper', () => {
            testComponent.selectedStepperComponent.select();
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedStepperComponent).toEqual(testComponent.selectedStepperComponent);
        });

        it('should support thySelected', () => {
            const stepper = fixture.debugElement.query(By.directive(ThyStepper)).componentInstance;
            fixture.componentInstance.selected = testComponent.selectedStepperComponent;
            fixture.componentInstance.selectedIndex = undefined;
            fixture.detectChanges();
            expect(stepper.selected()).toEqual(testComponent.selectedStepperComponent);
        });

        it('should step-header support iconName', () => {
            const stepCompletedIcon = fixture.debugElement.query(By.css('.thy-stepper-header .thy-step-icon'));
            expect(stepCompletedIcon.nativeElement.classList.contains('thy-icon-check-circle')).toBeTruthy();

            fixture.componentInstance.icon = 'check-circle-fill';
            fixture.detectChanges();

            expect(stepCompletedIcon.nativeElement.classList.contains('thy-icon-check-circle-fill')).toBeTruthy();
        });
    });
});
