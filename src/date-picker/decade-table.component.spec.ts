import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DecadeTableComponent } from './lib/decade/decade-table.component';
import { LibPackerModule } from './lib/lib-packer.module';

describe('DecadeTableComponent', () => {
    let fixture: ComponentFixture<ThyTestDecadeTableComponent>;
    let fixtureInstance: ThyTestDecadeTableComponent;
    let decadeComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, LibPackerModule],
            declarations: [ThyTestDecadeTableComponent]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDecadeTableComponent);
        fixtureInstance = fixture.componentInstance;
        decadeComponent = fixture.debugElement.query(By.directive(DecadeTableComponent));
    });

    it('should be created table component', () => {
        expect(decadeComponent).toBeTruthy();
    });

    it('should stop propagation when decade cell click', fakeAsync(() => {
        fixtureInstance.modelValue = new Date('2018-1-1');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const event = new Event('mouseenter');
        spyOn(event, 'stopPropagation').and.callThrough();
        decadeComponent.componentInstance.cellClick(event, decadeComponent.componentInstance.bodyRows[0].dateCells[0]);
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(event.stopPropagation).toHaveBeenCalled();
    }));
});

@Component({
    template: `
        <ng-container>
            <decade-table [value]="modelValue"></decade-table>
        </ng-container>
    `
})
class ThyTestDecadeTableComponent {
    modelValue: Date;
}
