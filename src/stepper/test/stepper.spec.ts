import { ThyIconModule } from 'ngx-tethys/icon';

import { Component, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThyStep } from '../step.component';
import { ThyStepper } from '../stepper.component';
import { ThyStepperModule } from '../stepper.module';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-demo-stepper',
    template: `
        <thy-stepper [thySelectedIndex]="selectedIndex" [thyShowStepHeader]="showStepHeader">
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
    `
})
class ThyDemoStepperComponent {
    @ViewChild('selectedStep', { static: true }) selectedStepperComponent: ThyStep;
    showStepHeader = true;
    selectedIndex = 0;
    icon: string;
    next() {}
    previous() {}
}

@NgModule({
    imports: [ThyStepperModule, BrowserAnimationsModule, ThyIconModule],
    declarations: [ThyDemoStepperComponent],
    exports: [ThyDemoStepperComponent],
    providers: [provideHttpClient()]
})
export class ThyStepperTestModule {}

describe('ThyStepper', () => {
    let fixture: ComponentFixture<ThyDemoStepperComponent>;
    let testComponent: ThyDemoStepperComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyStepperTestModule]
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
            expect(stepper.selectedIndex).toEqual(2);
        });

        it('should success when select specify stepper', () => {
            testComponent.selectedStepperComponent.select();
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedStepperComponent).toEqual(testComponent.selectedStepperComponent);
        });

        it('should support thySelected', () => {
            const stepper = fixture.debugElement.query(By.directive(ThyStepper)).componentInstance;
            stepper.thySelected = testComponent.selectedStepperComponent;
            fixture.detectChanges();
            expect(stepper.selected).toEqual(testComponent.selectedStepperComponent);
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
