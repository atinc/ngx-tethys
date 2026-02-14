import { Component, DebugElement, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyPage } from 'ngx-tethys/table';
import { provideHttpClient } from '@angular/common/http';
import { ThyNativeTableModule } from '../native-table.module';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableComponent } from '../table/table.component';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'thy-native-table-test',
    template: `
        <thy-native-table #nativeTable [thyData]="data" [thyTheme]="theme" [thySize]="size" [thyEmptyOptions]="emptyOptions">
            <thead>
                <tr>
                    <th thyWidth="50px">Id</th>
                    <th thyWidth="100px">Name</th>
                    <th>Age</th>
                    <th>Job</th>
                    <th>Address</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @for (row of nativeTable.data(); track row.id) {
                    <tr>
                        <td>{{ row.id }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.age }}</td>
                        <td>{{ row.job }}</td>
                        <td>{{ row.address }}</td>
                        <td>
                            <a class="link-secondary mr-8" href="javascript:;"> </a>
                        </td>
                    </tr>
                }
            </tbody>
        </thy-native-table>
    `,
    imports: [ThyNativeTableModule, FormsModule]
})
class ThyNativeTableTestComponent {
    @ViewChild('nativeTable') nativeTable!: ThyNativeTableComponent;

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];
    pagination: ThyPage = {
        index: 1,
        size: 3,
        total: 6,
        sizeOptions: [3, 5, 10]
    };

    theme = 'default';

    size = 'md';

    emptyOptions = { message: '空' };

    onMultiSelectChange() {
        return 'onMultiSelectChange is ok';
    }

    onPageChange() {
        return 'onPageChange is ok';
    }

    onPageIndexChange() {}

    onPageSizeChange() {}
}

describe('ThyNativeTable: basic', () => {
    let fixture!: ComponentFixture<ThyNativeTableTestComponent>;
    let testComponent!: ThyNativeTableTestComponent;
    let tableComponent!: DebugElement;
    let table!: HTMLElement;
    let rows!: HTMLElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyNativeTableModule, ThyEmptyModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyNativeTableTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyNativeTableComponent));
        table = tableComponent.nativeElement;
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(table.classList.contains('thy-native-table')).toBe(true);
        expect(table.classList.contains('native-table-default')).toBe(true);
        expect(table.classList.contains('native-table-md')).toBe(true);

        const head = table.querySelector('thead');
        expect(head).toBeTruthy();
        expect(head?.classList.contains('thy-native-table-thead')).toBe(true);

        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(rows.length).toEqual(testComponent.data.length + 1);
        for (let i = 1; i < rows.length; i++) {
            expect(rows[i].classList.contains('thy-native-table-row')).toBe(true);
        }
    });
    it('thyWidth of th is correct', () => {
        fixture.detectChanges();
        const cols = tableComponent.nativeElement.querySelectorAll('colgroup col');
        expect(cols[0].offsetWidth).toEqual(50);
        expect(cols[1].offsetWidth).toEqual(100);
    });

    it('should have correct class when thyTheme is bordered', () => {
        testComponent.theme = 'bordered';
        fixture.detectChanges();
        expect(table.classList.contains('native-table-bordered')).toBe(true);
    });

    it('should have correct class when thyTheme is boxed', () => {
        testComponent.theme = 'boxed';
        fixture.detectChanges();
        expect(table.classList.contains('native-table-boxed')).toBe(true);
    });

    it('should have correct class when thySize is md', () => {
        testComponent.size = '';
        fixture.detectChanges();
        expect(table.classList.contains('native-table-md')).toBe(true);
    });

    it('should have correct class for sizes', () => {
        ['xs', 'sm', 'md', 'lg', 'default', 'xlg'].forEach(size => {
            testComponent.size = size;
            fixture.detectChanges();
            expect(table.classList.contains(`native-table-${size}`)).toBe(true);
        });
    });
    it('should have thy-empty component when data is []', () => {
        fixture.detectChanges();
        testComponent.data = [];
        fixture.detectChanges();
        const defaultEmptyComponent = tableComponent.nativeElement.querySelector('thy-empty');
        expect(defaultEmptyComponent).toBeTruthy();
    });

    it('should display emptyOptions msg when data is [] and has thyEmptyOptions', () => {
        testComponent.data = [];
        fixture.detectChanges();
        const empty = tableComponent.nativeElement.querySelector('.thy-empty-text');
        expect(empty.innerText).toBe(testComponent.emptyOptions.message);
    });
});

@Component({
    selector: 'thy-native-table-checkbox-test',
    template: `
        <thy-native-table #nativeTable [thyData]="data" thySize="md" thyTheme="default">
            <thead>
                <tr>
                    <th
                        thyWidth="50px"
                        thyHeaderCell="checkbox"
                        [thyChecked]="checkedAll()"
                        (thyCheckedChange)="onCheckedAllChange($event)"></th>
                    <th thyWidth="50px">Id</th>
                    <th thyWidth="100px">Name</th>
                    <th thyWidth="80px">Age</th>
                    <th>Job</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                @for (row of nativeTable.data(); track row.id) {
                    <tr>
                        <td thyCell="checkbox" (thyCheckedChange)="onCheckedRowChange($event, row)"></td>
                        <td>{{ row.id }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.age }}</td>
                        <td>{{ row.job }}</td>
                        <td>{{ row.address }}</td>
                    </tr>
                }
            </tbody>
        </thy-native-table>
    `,
    imports: [ThyNativeTableModule, FormsModule]
})
class ThyNativeTableCheckboxTestComponent {
    @ViewChild('nativeTable') nativeTable!: ThyNativeTableComponent;

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    selection = new SelectionModel<any>(true);

    checkedAll = signal<boolean>(false);

    onCheckedAllChange(checked: boolean): void {}

    onCheckedRowChange(): void {}
}

describe('ThyNativeTable: checkbox', () => {
    let fixture!: ComponentFixture<ThyNativeTableCheckboxTestComponent>;
    let testComponent!: ThyNativeTableCheckboxTestComponent;
    let tableComponent!: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyNativeTableModule, ThyEmptyModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyNativeTableCheckboxTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyNativeTableComponent));
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should display checkbox', () => {
        fixture.detectChanges();
        const checkboxTh = tableComponent.nativeElement.querySelectorAll('tr th[thyheadercell="checkbox"]');
        const checkboxTd = tableComponent.nativeElement.querySelectorAll('tr td[thycell="checkbox"]');
        expect(checkboxTh.length).toBe(1);
        expect(checkboxTd.length).toBe(3);
    });

    it('should call thyCheckedChange of th[thyheadercell="checkbox"] when click checkbox', fakeAsync(() => {
        fixture.detectChanges();
        const checkboxTh = tableComponent.nativeElement.querySelector('tr th[thyheadercell="checkbox"] label input');
        const checkboxThSpy = spyOn(testComponent, 'onCheckedAllChange');
        checkboxTh.click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(checkboxThSpy).toHaveBeenCalled();
    }));

    it('should call thyCheckedChange of td[thycell="checkbox"] when click checkbox', fakeAsync(() => {
        fixture.detectChanges();
        const checkboxTd = tableComponent.nativeElement.querySelector('tr td[thycell="checkbox"] label input');
        const checkboxTdSpy = spyOn(testComponent, 'onCheckedRowChange');
        checkboxTd.click();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(checkboxTdSpy).toHaveBeenCalled();
    }));
});

@Component({
    selector: 'thy-native-table-fixed-test',
    template: `<thy-native-table #nativeTable [thyData]="data" [thyScroll]="{ x: '100%' }">
        <thead>
            <tr>
                <th thyWidth="100px" thyFixedLeft>Id</th>
                <th thyWidth="200px">Name</th>
                <th thyWidth="200px" thyFixedLeft>Age</th>
                <th thyWidth="200px">Job</th>
                <th thyWidth="300px">Address</th>
                <th thyWidth="300px">Column1</th>
                <th thyWidth="300px">Column2</th>
                <th thyWidth="300px">Column3</th>
                <th thyWidth="200px" thyFixedRight></th>
            </tr>
        </thead>
        <tbody>
            @for (row of nativeTable.data(); track row.id) {
                <tr>
                    <td>{{ row.id }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.age }}</td>
                    <td>{{ row.job }}</td>
                    <td>{{ row.address }}</td>
                    <td>{{ row.address }}</td>
                    <td>{{ row.address }}</td>
                    <td>{{ row.address }}</td>
                    <td>
                        <a class="link-secondary mr-8" href="javascript:;"> </a>
                    </td>
                </tr>
            }
        </tbody>
    </thy-native-table> `,
    imports: [ThyNativeTableModule, FormsModule]
})
class ThyNativeTableFixedTestComponent {
    @ViewChild('nativeTable') nativeTable!: ThyNativeTableComponent;

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];
}

describe('ThyNativeTable: fixed', () => {
    let fixture!: ComponentFixture<ThyNativeTableFixedTestComponent>;
    let tableComponent!: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyNativeTableModule, ThyEmptyModule],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyNativeTableFixedTestComponent);
        tableComponent = fixture.debugElement.query(By.directive(ThyNativeTableComponent));
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should have fixed left column', () => {
        fixture.detectChanges();
        const fixedLeftTh = tableComponent.nativeElement.querySelectorAll('th[thyfixedleft]');
        expect(fixedLeftTh.length).toBe(2);
        expect(fixedLeftTh[0].style.left).toBe(`0px`);
        expect(fixedLeftTh[1].style.left).toBe(`100px`);
        const allFixedLeftTd = tableComponent.nativeElement.querySelectorAll('tbody .thy-native-table-row .thy-table-cell-fix-left');
        expect(allFixedLeftTd.length).toBe(6);
        const rows = tableComponent.nativeElement.querySelectorAll('tbody .thy-native-table-row');
        rows.forEach((row: HTMLElement) => {
            const fixedLeftTds = row.querySelectorAll<HTMLElement>('.thy-table-cell-fix-left');
            expect(fixedLeftTds.length).toBe(2);
            expect(fixedLeftTds[0].style.left).toBe(`0px`);
            expect(fixedLeftTds[1].style.left).toBe(`100px`);
        });
    });
    it('should have fixed right column', () => {
        fixture.detectChanges();
        const fixedRight = tableComponent.nativeElement.querySelectorAll('th[thyfixedright]');
        expect(fixedRight.length).toBe(1);
        const fixedRightTd = tableComponent.nativeElement.querySelectorAll('tbody tr .thy-table-cell-fix-right');
        expect(fixedRightTd.length).toBe(3);
        const rows = tableComponent.nativeElement.querySelectorAll('tbody .thy-native-table-row');
        rows.forEach((row: HTMLElement) => {
            const fixedRightTds = row.querySelectorAll<HTMLElement>('.thy-table-cell-fix-right');
            expect(fixedRightTds.length).toBe(1);
            expect(fixedRightTds[0].style.right).toBe(`0px`);
        });
    });
});
