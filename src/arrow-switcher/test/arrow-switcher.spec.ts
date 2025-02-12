import { fakeAsync, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { ThyArrowSwitcherModule } from '../module';
import { NgModule, Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyArrowSwitcher } from '../arrow-switcher.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { provideHttpClient } from '@angular/common/http';

describe('ThyArrowSwitcher', () => {
    let fixture: ComponentFixture<ThyDemoArrowSwitcherComponent>;
    let testComponent: ThyDemoArrowSwitcherComponent;
    let arrowSwitcherComponent: DebugElement;
    let btnElements: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyArrowSwitcherModule, ArrowSwitcherTestModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoArrowSwitcherComponent);
        testComponent = fixture.debugElement.componentInstance;
        arrowSwitcherComponent = fixture.debugElement.query(By.directive(ThyArrowSwitcher));
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

    it('should create correct when theme is lite', () => {
        testComponent.theme = `lite`;
        fixture.detectChanges();
        const actionElements = arrowSwitcherComponent.nativeElement.querySelectorAll('.thy-action');
        expect(actionElements.length).toBe(2);
        expect(actionElements[0]).toBeTruthy();
        expect(actionElements[0].classList.contains('thy-action')).toBe(true);
    });

    it('should show correct total', () => {
        testComponent.totalCount = 20;
        fixture.detectChanges();
        expect(arrowSwitcherComponent.componentInstance.total).toEqual(20);
    });

    it('should show correct index', fakeAsync(() => {
        testComponent.index = 5;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(arrowSwitcherComponent.componentInstance.index).toEqual(5);
    }));

    it('should support disabled', fakeAsync(() => {
        testComponent.index = 3;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(arrowSwitcherComponent.componentInstance.previousDisabled).toBeFalsy();
        expect(arrowSwitcherComponent.componentInstance.nextDisabled).toBeFalsy();

        testComponent.disabled = true;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        testComponent.switcherComponent.getDisabled();
        expect(arrowSwitcherComponent.componentInstance.previousDisabled).toBeTruthy();
        expect(arrowSwitcherComponent.componentInstance.nextDisabled).toBeTruthy();
    }));

    it('should support thyPrevious', fakeAsync(() => {
        testComponent.index = 3;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        btnElements = arrowSwitcherComponent.nativeElement.querySelectorAll('button');
        (btnElements[0] as HTMLElement).click();
        fixture.detectChanges();
        expect(arrowSwitcherComponent.componentInstance.index).toEqual(2);
    }));

    it('should support thyNext', fakeAsync(() => {
        testComponent.index = 3;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        btnElements = arrowSwitcherComponent.nativeElement.querySelectorAll('button');
        (btnElements[1] as HTMLElement).click();
        fixture.detectChanges();
        expect(arrowSwitcherComponent.componentInstance.index).toEqual(4);
    }));

    it('should tooltip works', fakeAsync(() => {
        fixture.detectChanges();
        const tooltipDebugElement = fixture.debugElement.query(By.directive(ThyTooltipDirective));
        expect(tooltipDebugElement).toBeTruthy();
    }));
});

@Component({
    selector: 'thy-demo-arrow-switcher',
    template: `
        <thy-arrow-switcher
            #switcher
            [(ngModel)]="index"
            [thyTotal]="totalCount"
            [thySize]="size"
            [thyTheme]="theme"
            [disabled]="disabled"
            (thyPrevious)="previousClick()"
            (thyNext)="nextClick()"
            [thyPreviousTooltip]="previousTooltip"
            [thyNextTooltip]="nextTooltip"></thy-arrow-switcher>
    `,
    standalone: false
})
class ThyDemoArrowSwitcherComponent {
    index = 0;
    totalCount = 10;
    theme = 'default';
    disabled = false;
    size = ``;
    previousTooltip: string;
    nextTooltip: string;

    @ViewChild('switcher', { static: true }) switcherComponent: ThyArrowSwitcher;

    previousClick() {}

    nextClick() {}
}

@NgModule({
    imports: [ThyArrowSwitcherModule, FormsModule, CommonModule],
    declarations: [ThyDemoArrowSwitcherComponent],
    exports: [ThyDemoArrowSwitcherComponent]
})
export class ArrowSwitcherTestModule {}
