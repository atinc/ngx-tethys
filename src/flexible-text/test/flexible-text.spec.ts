import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexibleTextComponent } from '../flexible-text.component';
import { DebugElement } from '@angular/core';
import { ThyTooltipModule } from '../../tooltip';

describe('FlexibleTextComponent', () => {
    let component: FlexibleTextComponent;
    let fixture: ComponentFixture<FlexibleTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlexibleTextComponent],
            imports: [ThyTooltipModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlexibleTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should show the tooltip', () => {
        const compDe: DebugElement = fixture.debugElement;
        const compEl: HTMLElement = compDe.nativeElement;
        expect(compEl.clientWidth < compEl.scrollWidth).toEqual(component.isOverflow);
    });
});
