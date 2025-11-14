import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyButton } from 'ngx-tethys/button';
import { ThyStepper, ThyStepperNextDirective, ThyStepperPreviousDirective } from 'ngx-tethys/stepper';

@Component({
    template: `
        <button thyButton thyStepperNext>上一步</button>
        <button thyButton thyStepperPrevious>下一步</button>
    `,
    imports: [ThyStepperNextDirective, ThyStepperPreviousDirective, ThyButton]
})
class ThyStepperButtonDirectiveComponent {}

class MockThyStepperComponent {
    next() {}
    previous() {}
}

describe('ThyStepperNext', () => {
    let fixture: ComponentFixture<ThyStepperButtonDirectiveComponent>;
    let thyStepperComponent: MockThyStepperComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ThyStepper,
                    useClass: MockThyStepperComponent
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ThyStepperButtonDirectiveComponent);
        thyStepperComponent = TestBed.inject(ThyStepper) as any;
    });

    describe('nextDirective', () => {
        it('next function should be called', () => {
            const nextButton = fixture.debugElement.query(By.directive(ThyStepperNextDirective));
            spyOn(thyStepperComponent, 'next');
            nextButton.nativeElement.click();
            expect(thyStepperComponent.next).toHaveBeenCalled();
        });
    });

    describe('previousDirective', () => {
        it('previous function should be called', () => {
            const previousButton = fixture.debugElement.query(By.directive(ThyStepperPreviousDirective));
            spyOn(thyStepperComponent, 'previous');
            previousButton.nativeElement.click();
            expect(thyStepperComponent.previous).toHaveBeenCalled();
        });
    });
});
