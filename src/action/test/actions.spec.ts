import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyActionModule } from '../action.module';
import { injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { By } from '@angular/platform-browser';
import { ThyActions } from '../actions.component';

@Component({
    selector: 'thy-test-actions-basic',
    template: `
        <thy-actions [thySize]="size">
            <a thyAction thyIcon="inbox"></a>
            <a thyAction thyIcon="search"></a>
            <a thyAction *ngIf="dynamicAdded" thyIcon="inbox"></a>
        </thy-actions>
    `
})
class ThyActionsTestBasicComponent {
    size = 'md';
    dynamicAdded = false;
}

describe('thy-actions', () => {
    let fixture: ComponentFixture<ThyActionsTestBasicComponent>;
    let actionsDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyActionModule],
            declarations: [ThyActionsTestBasicComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(ThyActionsTestBasicComponent);
        fixture.detectChanges();
        actionsDebugElement = fixture.debugElement.query(By.directive(ThyActions));
    });

    function assertActionsExpected(actions: NodeListOf<HTMLElement>, marginRight: string, message: string) {
        actions.forEach((action, index) => {
            expect(action.classList.contains('thy-action'));
            if (index === actions.length - 1) {
                expect(action.style.marginRight).toEqual('');
            } else {
                expect(action.style.marginRight).toEqual(marginRight, message);
            }
        });
    }

    it('should create actions', fakeAsync(() => {
        expect(actionsDebugElement).toBeTruthy();
        const element: HTMLElement = actionsDebugElement.nativeElement;
        expect(element.classList.contains('thy-actions'));
        const actions: NodeListOf<HTMLElement> = element.querySelectorAll('.thy-action');
        expect(actions.length).toEqual(2);
        actionsDebugElement.componentInstance.ngAfterContentInit();
        tick();
        assertActionsExpected(actions, '16px', 'expect default margin-right is 16px');
    }));

    it('should set actions size', () => {
        const element: HTMLElement = actionsDebugElement.nativeElement;
        actionsDebugElement.componentInstance.ngAfterContentInit();
        const sizes = [
            {
                value: 'zero',
                space: 0
            },
            {
                value: 'xxs',
                space: 4
            },
            {
                value: 'xs',
                space: 8
            },
            {
                value: 'sm',
                space: 12
            },
            {
                value: 'md',
                space: 16
            },
            {
                value: 'lg',
                space: 20
            },
            {
                value: 'xlg',
                space: 24
            }
        ];
        sizes.forEach(size => {
            fixture.componentInstance.size = size.value;
            fixture.detectChanges();
            const actions: NodeListOf<HTMLElement> = element.querySelectorAll('.thy-action');
            assertActionsExpected(actions, `${size.space}px`, `size: ${size.value} expected space is ${size.space}`);
        });
    });

    it('should dynamic add action', () => {
        const element: HTMLElement = actionsDebugElement.nativeElement;
        expect(element.querySelectorAll('.thy-action').length).toEqual(2);
        actionsDebugElement.componentInstance.ngAfterContentInit();
        fixture.componentInstance.dynamicAdded = true;
        fixture.detectChanges();
        const actions: NodeListOf<HTMLElement> = element.querySelectorAll('.thy-action');
        expect(actions.length).toEqual(3);
        assertActionsExpected(actions, '16px', 'expect default margin-right is 16px');
    });
});
