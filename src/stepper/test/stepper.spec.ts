import { fakeAsync, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ThyStepperModule } from '../stepper.module';
import { NgModule, Component, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyStepComponent } from '../step.component';
import { ThyStepperComponent } from '../stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyStepperNextDirective, ThyStepperPreviousDirective } from '../stepper-button.directive';

@Component({
    selector: 'thy-demo-stepper',
    template: `
        <thy-stepper [thySelectedIndex]="selectedIndex" [thyShowStepHeader]="showStepHeader">
            <thy-step label="第一步">
                <div class="demo-stepper-body first-step">
                    <button thyButton="primary">下一步</button>
                    <p>This is first description.</p>
                </div>
            </thy-step>
            <thy-step label="第二步">
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
    showStepHeader = true;
    selectedIndex = 0;
    next() {}
    previous() {}
}

@NgModule({
    imports: [ThyStepperModule, BrowserAnimationsModule],
    declarations: [ThyDemoStepperComponent],
    exports: [ThyDemoStepperComponent]
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
            const stepper = fixture.debugElement.query(By.directive(ThyStepperComponent));
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
            const stepper = fixture.debugElement.query(By.directive(ThyStepperComponent)).componentInstance;
            stepper.next();
            fixture.detectChanges();
            const secondStep = fixture.debugElement.query(By.css('.second-step'));
            expect(secondStep.componentInstance).toBeTruthy();
            stepper.previous();
            fixture.detectChanges();
            const firstStep = fixture.debugElement.query(By.css('.first-step'));
            expect(firstStep.componentInstance).toBeTruthy();
        });
    });
});
