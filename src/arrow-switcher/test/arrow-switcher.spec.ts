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
        expect(arrowSwitcherComponent.nativeElement.classList.contains('thy-arrow-switcher')).toBe(true);
    });

    it('should have correct class when size is sm', () => {
        testComponent.size = `sm`;
        fixture.detectChanges();
        expect(arrowSwitcherComponent.nativeElement.classList.contains('thy-arrow-switcher-small')).toBe(true);
    });

    it('should be disabled when disabled is true', () => {
        testComponent.disabled = true;
        const buttons = arrowSwitcherComponent.nativeElement.querySelector(`button`);
        fixture.detectChanges();
        expect(buttons.disabled).toBe(true);
    });
});

@Component({
    selector: 'thy-demo-arrow-switcher',
    template: `
        <thy-arrow-switcher
            [thyIndex]="index"
            [thyTotal]="totalCount"
            [thySize]="size"
            [thyDisabled]="disabled"
            (thyPreviousClick)="previousClick()"
            (thyNextClick)="nextClick()"
        ></thy-arrow-switcher>
    `
})
class ThyDemoArrowSwitcherComponent {
    index = 0;
    totalCount = 10;
    disabled = false;
    size = ``;
}

@NgModule({
    imports: [ThyArrowSwitcherModule],
    declarations: [ThyDemoArrowSwitcherComponent],
    exports: [ThyDemoArrowSwitcherComponent]
})
export class ArrowSwitcherTestModule {}
