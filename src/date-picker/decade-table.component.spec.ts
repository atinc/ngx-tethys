import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TinyDate } from 'ngx-tethys/util';
import { DecadeTable, LibPackerModule } from 'ngx-tethys/date-picker';

function getDecadeCell(component: DecadeTable, label: string) {
    return component.bodyRows
        .flatMap(row => row.dateCells)
        .find(cell => (cell.content as string) === label);
}

describe('DecadeTableComponent', () => {
    let fixture!: ComponentFixture<ThyTestDecadeTableComponent>;
    let fixtureInstance!: ThyTestDecadeTableComponent;
    let decadeComponent!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDecadeTableComponent);
        fixtureInstance = fixture.componentInstance;
        decadeComponent = fixture.debugElement.query(By.directive(DecadeTable));
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

    it('should mark decade disabled only when all its days are disabled', fakeAsync(() => {
        // 2030 年及其之后全禁用：2020-2029 含可选日 → 可选；2030-2039 整段禁用 → 禁用
        fixtureInstance.disabledDate = (date: Date) => date.getFullYear() > 2029;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const component = decadeComponent.componentInstance as DecadeTable;
        expect(getDecadeCell(component, '2020-2029')!.isDisabled).toBe(false);
        expect(getDecadeCell(component, '2030-2039')!.isDisabled).toBe(true);
    }));

    it('should clamp value into enabled days when choosing a partially disabled decade', fakeAsync(() => {
        // 2027 年之前全禁用，选中 2020-2029 十年后收敛到十年内首个可选日 2027-01-01
        fixtureInstance.disabledDate = (date: Date) => date.getFullYear() < 2027;
        fixture.detectChanges();
        tick();
        const component = decadeComponent.componentInstance as DecadeTable;
        getDecadeCell(component, '2020-2029')!.onClick!();
        fixture.detectChanges();
        tick(500);
        const value = component.value() as TinyDate;
        expect(value.getFullYear()).toBe(2027);
        expect(value.getMonth()).toBe(0);
        expect(value.getDate()).toBe(1);
    }));
});

@Component({
    template: `
        <ng-container>
            <decade-table [value]="modelValue" [disabledDate]="disabledDate"></decade-table>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, LibPackerModule]
})
class ThyTestDecadeTableComponent {
    modelValue!: Date;
    disabledDate?: (date: Date) => boolean;
}
