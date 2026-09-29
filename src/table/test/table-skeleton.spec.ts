import { provideHttpClient, withXhr } from '@angular/common/http';
import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    ThyTableColumnSkeletonType,
    ThyTableModule,
    ThyTableSize,
    ThyTableSkeletonColumn,
    ThyTableSkeleton,
    ThyTableAppearance,
    ThyTableTheme
} from 'ngx-tethys/table';
import { SafeAny } from 'ngx-tethys/types';

const defaultColumns = [
    {
        width: '40%',
        type: ThyTableColumnSkeletonType.title
    },
    {
        width: '17%',
        type: ThyTableColumnSkeletonType.member
    },
    {
        width: 'auto',
        type: ThyTableColumnSkeletonType.default
    },
    {
        width: 'auto',
        type: ThyTableColumnSkeletonType.default
    },
    {
        width: 'auto',
        type: ThyTableColumnSkeletonType.default
    }
];

@Component({
    selector: 'test-table-skeleton-basic',
    template: `<thy-table-skeleton
        [thyRowCount]="rowCount"
        [thyAppearance]="appearance"
        [thyTheme]="theme"
        [thySize]="size"
        [thyColumns]="columns"
        [thyHeadless]="headless"
        [thyMinWidth]="minWidth">
    </thy-table-skeleton>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTableModule]
})
class TestTableSkeletonBasicComponent {
    rowCount!: number;

    headless!: boolean;

    appearance!: ThyTableAppearance;

    theme!: ThyTableTheme;

    size!: ThyTableSize;

    minWidth!: string | number;

    columns!: ThyTableSkeletonColumn[];
}

describe('thy-table-skeleton', () => {
    let fixture!: ComponentFixture<TestTableSkeletonBasicComponent>;
    let tableSkeletonElement!: SafeAny;
    let tableSkeletonInstance!: ThyTableSkeleton;
    let tableDebugElement!: DebugElement;
    let tableElement!: SafeAny;
    let testComponent!: TestTableSkeletonBasicComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyTableModule],
            providers: [provideHttpClient(withXhr()), provideAnimations()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestTableSkeletonBasicComponent);

        const tableSkeletonDebugElement = fixture.debugElement.query(By.directive(ThyTableSkeleton));
        tableSkeletonElement = tableSkeletonDebugElement.nativeElement;
        tableSkeletonInstance = tableSkeletonDebugElement.componentInstance;

        tableDebugElement = fixture.debugElement.query(By.css('table'));
        tableElement = tableDebugElement.nativeElement;
        testComponent = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should create table skeleton', () => {
        expect(fixture).toBeTruthy();
        expect(tableSkeletonElement).toBeTruthy();
        expect(tableSkeletonElement.classList).toContain('thy-table-skeleton');
        expect(tableElement.classList).toContain('table');
    });

    it('should support thyAppearance', () => {
        testComponent.theme = undefined as unknown as ThyTableTheme;
        testComponent.appearance = 'bordered';
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyAppearance).toBe('bordered');
        expect(tableElement.classList).toContain('table-bordered');

        testComponent.appearance = 'boxed';
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyAppearance).toBe('boxed');
        expect(tableElement.classList).toContain('table-boxed');
    });

    it('should support deprecated thyTheme', () => {
        testComponent.appearance = undefined as unknown as ThyTableAppearance;
        testComponent.theme = 'bordered';
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyTheme).toBe('bordered');
        expect(tableElement.classList).toContain('table-bordered');

        testComponent.theme = 'boxed';
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyTheme).toBe('boxed');
        expect(tableElement.classList).toContain('table-boxed');
    });

    it('should support thySize', () => {
        (['xs', 'sm', 'md', 'lg', 'xlg', 'default'] as ThyTableSize[]).forEach((size: ThyTableSize) => {
            testComponent.size = size;
            fixture.detectChanges();
            expect(tableSkeletonInstance.thySize).toBe(size);
            expect(tableElement.classList).toContain(`table-${size}`);
        });
    });

    it('should has correct default columns', () => {
        expect(tableSkeletonInstance.columns).toEqual(defaultColumns);
    });

    it('should support thyRowCount', () => {
        testComponent.rowCount = 3;
        fixture.detectChanges();

        const trLen = tableElement.querySelectorAll('tbody tr').length;
        expect(trLen).toBe(3);
    });

    it('should support thyColumns', () => {
        testComponent.columns = [
            { width: 'auto', type: ThyTableColumnSkeletonType.title },
            { width: 'auto', type: ThyTableColumnSkeletonType.default },
            { width: 100, type: ThyTableColumnSkeletonType.default },
            { width: '200px', type: ThyTableColumnSkeletonType.default },
            { width: '17%', type: ThyTableColumnSkeletonType.member }
        ];

        fixture.detectChanges();
        expect(tableSkeletonInstance.columns).toEqual(testComponent.columns);
    });

    it('should support thyHeadless', fakeAsync(() => {
        expect(tableSkeletonInstance.thyHeadless).toBe(false);
        const theadElement = fixture.debugElement.query(By.css('thead'));
        expect(theadElement).toBeTruthy();

        testComponent.headless = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyHeadless).toBe(true);
        const theadElement2 = fixture.debugElement.query(By.css('thead'));
        expect(theadElement2).toBeFalsy();
    }));

    it('should support thyMinWidth', () => {
        expect(tableSkeletonInstance.thyMinWidth).toBe('');
        expect(tableElement.style.minWidth).toBeFalsy();

        testComponent.minWidth = 700;
        fixture.detectChanges();
        expect(tableSkeletonInstance.thyMinWidth).toBe('700px');
    });
});
