import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyArrowSwitcherModule } from '../module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyArrowSwitcherComponent } from '../arrow-switcher.component';

describe('ThyArrowSwitcher', () => {
    let fixture: ComponentFixture<ThyDemoArrowSwitcherComponent>;
    let testComponent: ThyDemoArrowSwitcherComponent;
    let arrowSwitcherComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyArrowSwitcherModule, ArrowSwitcherTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoArrowSwitcherComponent);
        testComponent = fixture.debugElement.componentInstance;
        arrowSwitcherComponent = fixture.debugElement.query(By.directive(ThyArrowSwitcherComponent));
    });

    it('should create', () => {
        expect(arrowSwitcherComponent).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(arrowSwitcherComponent.classList.contains('thy-arrow-switcher')).toBe(true);
    });

    it('should have correct class when size is sm', () => {
        arrowSwitcherComponent.size = `sm`;
        fixture.detectChanges();
        expect(arrowSwitcherComponent.classList.contains('thy-arrow-switcher-small')).toBe(true);
    });

    // it('should be disabled when disabled is true', () => {
    //     arrowSwitcherComponent.disabled = true;
    //     const labelIcon = arrowSwitcherComponent.nativeElement.querySelector(`button`);
    //     fixture.detectChanges();
    //     expect(labelIcon.disabled.toBe(true));
    // });

    // it(`should call previousClick event`, () => {
    //     const previousButton = arrowSwitcherComponent.nativeElement.children[0];
    //     const previousClickSpy = (arrowSwitcherComponent.previousClick = jasmine.createSpy(`previous`));
    //     let event: {index: number};
    //     previousClickSpy.and.callFake(($event: {index: number}) => {
    //         event = $event;
    //     });

    //     expect(previousClickSpy).not.toHaveBeenCalled();
    //     expect(event).toBeFalsy();

    //     previousButton.click();
    //     fixture.detectChanges();

    //     expect(previousClickSpy).toHaveBeenCalled();
    //     expect(event).toBeTruthy();
    // });
    // it(`should call nextClick event`, () => {
    //     const nextButton = arrowSwitcherComponent.nativeElement.children[2];
    //     const nextClickSpy = (arrowSwitcherComponent.nextClick = jasmine.createSpy(`next`));
    //     let event: {index: number};
    //     nextClickSpy.and.callFake(($event: {index: number}) => {
    //         event = $event;
    //     });

    //     expect(nextClickSpy).not.toHaveBeenCalled();
    //     expect(event).toBeFalsy();

    //     nextButton.click();
    //     fixture.detectChanges();

    //     expect(nextClickSpy).toHaveBeenCalled();
    //     expect(event).toBeTruthy();
    // });
});

@Component({
    selector: 'thy-demo-arrow-switcher',
    template: `
        <thy-arrow-switcher
            [thyIndex]="index"
            [thyTotal]="totalCount"
            [thySize]="size"
            [thyDisabled]="disabled"
            (thyPreviousClick)="onPreviousClick($event)"
            (thyNextClick)="onNextClick($event)"
        ></thy-arrow-switcher>
    `
})
class ThyDemoArrowSwitcherComponent {
    index = 1;
    totalCount = 10;
    disabled = false;
    size = ``;
    previousClick($event: { index: number }) {}
    nextClick($event: { index: number }) {}
}

@NgModule({
    imports: [ThyArrowSwitcherModule],
    declarations: [ThyDemoArrowSwitcherComponent],
    exports: [ThyDemoArrowSwitcherComponent]
})
export class ArrowSwitcherTestModule {}
