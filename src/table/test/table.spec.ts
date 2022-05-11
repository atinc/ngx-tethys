import { ThySwitchComponent } from 'ngx-tethys/switch';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

import { ApplicationRef, Component, DebugElement, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThyTableComponent } from '../table.component';
import { ThyTableModule } from '../table.module';

const SizeMap = {
    sm: 'table-sm'
};
@Component({
    selector: 'thy-demo-default-table',
    template: `
        <thy-table
            [thyModel]="model"
            thyRowKey="id"
            thyGroupBy="group_id"
            [thyMode]="mode"
            [thyGroups]="groups"
            [thyTheme]="theme"
            [thySize]="size"
            [thyWholeRowSelect]="isRowSelect"
            [thyDraggable]="isDraggable"
            [thyClassName]="tableClassName"
            [thyRowClassName]="tableRowClassName"
            [thyLoadingDone]="isLoadingDone"
            [thyLoadingText]="loadingText"
            [thyShowHeader]="isShowHeader"
            (thyOnRowClick)="onRowClick($event)"
            (thyOnMultiSelectChange)="onMultiSelectChange($event)"
            (thyOnRadioSelectChange)="onRadioSelectChange($event)"
            [thyPageIndex]="pagination.index"
            [thyPageSize]="pagination.size"
            [thyPageTotal]="pagination.total"
            (thyOnPageChange)="onPageChange($event)"
            (thyOnPageIndexChange)="onPageIndexChange($event)"
            (thyOnSwitchChange)="onSwitchChange($event)"
            (thyOnRowContextMenu)="onRowContextMenu($event)"
            (thyOnDraggableChange)="onDraggableChange($event)"
            [thyEmptyOptions]="emptyOptions"
            #table
        >
            <ng-template #group let-group>{{ group.id }}</ng-template>
            <thy-table-column thyModelKey="selected" [thyType]="isCheckbox ? 'checkbox' : 'radio'" [thySelections]="selections">
                <ng-template #header>
                    <span class="text-primary"
                        >选择<a href="javascript:;"><i class="wtf wtf-angle-down"></i></a
                    ></span>
                </ng-template>
            </thy-table-column>
            <thy-table-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-table-column>
            <thy-table-column thyTitle="年龄" thyModelKey="age" thyHeaderClassName="header-class-name"></thy-table-column>
            <thy-table-column thyTitle="备注" thyModelKey="desc" thyDefaultText="-"></thy-table-column>
            <thy-table-column thyTitle="默认" thyModelKey="checked" thyType="switch" [thySelections]="selections"></thy-table-column>
            <thy-table-column thyTitle="操作" thyClassName="thy-operation-links">
                <ng-template #cell let-row>
                    <a href="javascript:;">设置</a>
                    <a class="link-secondary" href="javascript:;">
                        <i class="wtf wtf-trash-o"></i>
                    </a>
                </ng-template>
            </thy-table-column>
        </thy-table>
        <ng-template #total let-total>共{{ total }}条</ng-template>
    `
})
class ThyDemoDefaultTableComponent {
    @ViewChild('table') table: ThyTableComponent;

    isCheckbox = true;

    groups = [
        {
            id: '11',
            title: '分组1'
        },
        {
            id: '22',
            title: '分组2'
        }
    ];
    model = [
        {
            group_id: '11',
            id: 1,
            name: '张三',
            age: '',
            checked: true
        },
        {
            group_id: '11',
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '11',
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '22',
            id: 4,
            name: '张三2',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            group_id: '22',
            id: 5,
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '22',
            id: 6,
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }
    ];
    pagination = {
        index: 1,
        size: 3,
        total: 6
    };
    isShowHeader = true;
    isDraggable = false;
    isRowSelect = false;
    tableClassName = 'class-name';
    tableRowClassName = 'row-class-name';
    selections = [];
    theme = 'default';
    isLoadingDone = true;
    loadingText = 'loading now';
    size = 'sm';
    showTotal = false;

    mode = 'list';

    emptyOptions = { message: '空' };

    @ViewChild('total', { static: true }) totalTemplate: TemplateRef<any>;

    onRowClick(event: any) {
        return 'onRowClick is ok';
    }

    onMultiSelectChange() {
        return 'onMultiSelectChange is ok';
    }

    onRadioSelectChange() {}

    onPageChange() {
        return 'onPageChange is ok';
    }

    onPageIndexChange() {}

    onSwitchChange() {
        return 'onSwitchChange is ok';
    }

    onRowContextMenu() {
        return 'onRowContextMenu is ok';
    }
    onDraggableChange() {
        console.log('drop');
    }
}

@NgModule({
    imports: [ThyTableModule],
    declarations: [ThyDemoDefaultTableComponent],
    exports: [ThyDemoDefaultTableComponent]
})
export class TableTestModule {}

describe('ThyTable: basic', () => {
    let fixture: ComponentFixture<ThyDemoDefaultTableComponent>;
    let testComponent: ThyDemoDefaultTableComponent;
    let tableComponent: any;
    let table: HTMLElement;
    let rows: any;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyTableModule, TableTestModule],
                providers: []
            });
            TestBed.compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoDefaultTableComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTableComponent));
        table = tableComponent.nativeElement.querySelector('table');
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-default')).toBe(true);
        expect(table.classList.contains('class-name')).toBe(true);
        expect(table.classList.contains('table-hover')).toBe(false);
        expect(table.classList.contains('table-draggable')).toBe(false);

        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(rows.length).toEqual(testComponent.model.length + 1);
        for (let i = 1; i < rows.length; i++) {
            expect(rows[i].classList.contains('row-class-name')).toBe(true);
        }

        const paginationComponent = tableComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent).toBeTruthy();
    });

    it('should display emptyOptions msg when model is [] and has thyEmptyOptions', () => {
        testComponent.model = [];
        fixture.detectChanges();
        const empty = tableComponent.nativeElement.querySelector('.thy-empty-text');
        expect(empty.innerText).toBe(testComponent.emptyOptions.message);
    });

    it('should th "姓名" when thyTitle is "姓名"', () => {
        fixture.detectChanges();
        const headColumnItem = rows[0].querySelectorAll('th');
        expect(headColumnItem[1].innerText.trim()).toEqual('姓名');
    });

    it('should td "张三" when row name is "张三"', () => {
        fixture.detectChanges();
        const firstRowColumnItem = rows[1].querySelectorAll('td');
        expect(firstRowColumnItem[1].innerText.trim()).toEqual('张三');
    });

    it('should td "" when conlunm not set thyDefaultText and row age is ""', () => {
        fixture.detectChanges();
        const firstRowColumnItem = rows[1].querySelectorAll('td');
        expect(firstRowColumnItem[2].innerText.trim()).toEqual('');
    });

    it('should th have correct class when conlunm head set thyHeaderClassName is header-class-name', () => {
        fixture.detectChanges();
        const firstRowColumnItem = rows[0].querySelectorAll('th');
        expect(firstRowColumnItem[2].classList.contains('header-class-name')).toBe(true);
    });

    it('should td is "这是一条测试数据" when conlunm thyDefaultText is "-" and row item is "这是一条测试数据"', () => {
        fixture.detectChanges();
        const secondRowColumnItem = rows[2].querySelectorAll('td');
        expect(secondRowColumnItem[3].innerText.trim()).toEqual('这是一条测试数据');
    });

    it('should text is "-" when conlunm thyDefaultText is "-" and row item is ""', () => {
        fixture.detectChanges();
        const secondRowColumnItem = rows[1].querySelectorAll('td');
        const defaultElement = secondRowColumnItem[3].querySelector('.text-desc');
        expect(defaultElement.innerText.trim()).toEqual('-');
    });

    it('have checkbox when conlunm set thyType checkbox', () => {
        fixture.detectChanges();
        const inputElement = rows[1].querySelector('input');
        expect(inputElement.type).toEqual('checkbox');
    });

    it('should have thy-switch when thyType is switch', () => {
        fixture.detectChanges();
        const switchComponent = rows[1].querySelector('thy-switch');
        expect(switchComponent).toBeTruthy();
    });

    // it('should thy-switch disadled when thyDisabled is true', () => {
    //     fixture.detectChanges();
    //     const switchComponent = rows[1].querySelector('thy-switch');
    //     const labelElement = switchComponent.querySelector('label');
    //     expect(labelElement.classList.contains('thy-switch-disabled')).toBe(true);
    // });

    // it('width is 160 when thyWidth is 160', () => {
    //     fixture.detectChanges();
    //     const cols = tableComponent.nativeElement.querySelectorAll('colgroup col');
    //     expect(cols[1].width).toEqual('160');
    // });

    it('should have correct class when isRowSelect is true', () => {
        testComponent.isRowSelect = true;
        fixture.detectChanges();
        expect(table.classList.contains('table-hover')).toBe(true);
    });

    it('should have correct class when thyDraggable is true', () => {
        testComponent.isDraggable = true;
        fixture.detectChanges();
        expect(table.classList.contains('table-draggable')).toBe(true);
    });

    it('should have correct class when thyTheme is table-bordered', () => {
        testComponent.theme = 'bordered';
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-bordered')).toBe(true);
    });

    it('should have correct class when thySize is default', () => {
        testComponent.size = '';
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-default')).toBe(true);
    });

    it('should have correct class when thySize is sm', () => {
        testComponent.size = 'sm';
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-sm')).toBe(true);
    });

    it('should have correct class when thySize is sm and thyTheme is default', () => {
        testComponent.size = 'sm';
        testComponent.theme = 'default';
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-sm')).toBe(true);
        expect(table.classList.contains('table-default-sm-bottom-padding')).toBe(true);
    });

    it('should have correct class when className is class-name', () => {
        testComponent.tableClassName = 'class-name';
        fixture.detectChanges();
        expect(table.classList.contains('class-name')).toBe(true);
    });

    it('should have correct class when className is class-name,thySize is sm', () => {
        testComponent.tableClassName = 'class-name';
        testComponent.size = 'sm';
        fixture.detectChanges();
        expect(table.classList.contains('class-name')).toBe(true);
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-sm')).toBe(true);
    });

    it('should have thy-empty component when model is []', () => {
        testComponent.model = [];
        fixture.detectChanges();
        const defaultEmptyComponent = tableComponent.nativeElement.querySelector('thy-empty');
        expect(defaultEmptyComponent).toBeTruthy();
    });

    it('should have thy-loadin component when isLoadingDone is false', () => {
        testComponent.isLoadingDone = false;
        fixture.detectChanges();
        const loadingComponent = tableComponent.nativeElement.querySelector('thy-loading');
        const loadingText = loadingComponent.querySelector('span');
        expect(loadingText.innerText).toEqual(testComponent.loadingText);
    });

    it('should not have thy-pagination component when size is bigger than total', () => {
        testComponent.pagination = {
            index: 1,
            size: 8,
            total: 6
        };
        fixture.detectChanges();
        const paginationComponent = tableComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent === null).toBe(true);
    });

    it('should in second page when index is 2', () => {
        testComponent.pagination = {
            index: 2,
            size: 3,
            total: 6
        };
        fixture.detectChanges();
        const paginationComponent = tableComponent.nativeElement.querySelector('thy-pagination');
        const items = paginationComponent.querySelectorAll('li');
        expect(items[testComponent.pagination.index].classList.contains('active')).toBe(true);
        expect(items.length).toEqual(4);
    });

    it('should have page-total when total is bigger than size and showTotal is true', () => {
        testComponent.pagination = {
            index: 1,
            size: 10,
            total: 30
        };
        testComponent.showTotal = true;
        fixture.detectChanges();
        const paginationComponent = tableComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent).toBeTruthy();
    });

    it('should have page-total when total is bigger than size and showTotal is template', () => {
        testComponent.pagination = {
            index: 1,
            size: 10,
            total: 50
        };
        testComponent.showTotal = tableComponent.totalTemplate;
        fixture.detectChanges();
        const paginationComponent = tableComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent).toBeTruthy();
    });

    it('have <thead> when set thyShowHeader true', () => {
        fixture.detectChanges();
        const thead = table.querySelector('thead');
        expect(thead).toBeTruthy();
    });

    it('do not have <thead> when set thyShowHeader false', () => {
        testComponent.isShowHeader = false;
        fixture.detectChanges();
        const thead = table.querySelector('thead');
        expect(thead).toBeNull();
    });

    it('should has correct class and when mode is group', () => {
        testComponent.mode = 'group';
        fixture.detectChanges();
        expect(table.classList.contains('table-group')).toBe(true);
    });

    it('should has group element when mode is group', () => {
        testComponent.mode = 'group';
        fixture.detectChanges();
        const groups = table.querySelector('.thy-table-group');
        expect(groups).toBeTruthy();
    });

    it('should call thyOnRowClick when click tr', fakeAsync(() => {
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const rowClickSpy = spyOn(testComponent, 'onRowClick');
        const event = dispatchFakeEvent(rows[1], 'click', true);
        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();
        expect(rowClickSpy).toHaveBeenCalled();
        expect(rowClickSpy).toHaveBeenCalledWith({ event: event, row: testComponent.model[0] });
    }));

    it('should call thyOnMultiSelectChange when click tr and thyWholeRowSelect is true', fakeAsync(() => {
        testComponent.isCheckbox = true;
        testComponent.isRowSelect = true;
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const multiSelectSpy = spyOn(testComponent, 'onMultiSelectChange');
        const event = dispatchFakeEvent(rows[1], 'click', true);
        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();
        expect(multiSelectSpy).toHaveBeenCalled();
        expect(multiSelectSpy).toHaveBeenCalledWith({ event: event, row: testComponent.model[0], rows: [testComponent.model[0]] });
    }));

    it('should call thyOnMultiSelectChange when click checkbox', fakeAsync(() => {
        testComponent.isCheckbox = true;
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const column = rows[1].querySelector('input');
        const multiSelectSpy = spyOn(testComponent, 'onMultiSelectChange');
        column.click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(multiSelectSpy).toHaveBeenCalled();
    }));

    it('should call thyOnRadioSelectChange when click tr and thyWholeRowSelect is true', fakeAsync(() => {
        testComponent.isCheckbox = false;
        testComponent.isRowSelect = true;
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const multiSelectSpy = spyOn(testComponent, 'onRadioSelectChange');
        const event = dispatchFakeEvent(rows[1], 'click', true);
        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();
        expect(multiSelectSpy).toHaveBeenCalled();
        expect(multiSelectSpy).toHaveBeenCalledWith({ event: event, row: testComponent.model[0] });
    }));

    it('should call onPageChange when call table onPageChange', () => {
        fixture.detectChanges();
        const pageChangeSpy = spyOn(testComponent, 'onPageChange');
        const event = {
            itemsPerPage: 10,
            page: 1
        };
        testComponent.table.onPageChange(event);
        expect(pageChangeSpy).toHaveBeenCalled();
        expect(pageChangeSpy).toHaveBeenCalledWith(event);
    });

    it('should call onPageIndexChange when call table onPageIndexChange', () => {
        fixture.detectChanges();
        const pageIndexChangeSpy = spyOn(testComponent, 'onPageIndexChange');
        const event = 1;
        testComponent.table.onPageIndexChange(event);
        expect(pageIndexChangeSpy).toHaveBeenCalled();
        expect(pageIndexChangeSpy).toHaveBeenCalledWith(event);
    });

    it('should call onSwitchChange when change switch', fakeAsync(() => {
        fixture.detectChanges();
        const switchComponent: DebugElement = (tableComponent as DebugElement).query(By.directive(ThySwitchComponent));
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const switchChangeSpy = spyOn(testComponent, 'onSwitchChange');
        (switchComponent.componentInstance as ThySwitchComponent).toggle({} as Event);
        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();
        expect(switchChangeSpy).toHaveBeenCalled();
    }));

    it('should call thyOnRowContextMenu when contextmenu', fakeAsync(() => {
        fixture.detectChanges();
        const contextmenuSpy = spyOn(testComponent, 'onRowContextMenu');
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const event = dispatchFakeEvent(rows[1], 'contextmenu');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(contextmenuSpy).toHaveBeenCalled();
        expect(contextmenuSpy).toHaveBeenCalledWith({ event: event, row: testComponent.model[0] });
    }));

    it('should add class thy-table-drag-preview when start drag', fakeAsync(() => {
        testComponent.isDraggable = true;
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        const spy = spyOn(testComponent, 'onDraggableChange');

        dispatchMouseEvent(rows[1], 'mousedown', 0, 50);
        fixture.detectChanges();

        dispatchMouseEvent(rows[1], 'mousemove', 50, 50);
        fixture.detectChanges();

        dispatchMouseEvent(rows[1], 'mouseup', 50, 50);
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    }));
});

// table group mode test
@Component({
    selector: 'thy-demo-group-table',
    template: `
        <thy-table
            [thyGroups]="groups"
            [thyModel]="model"
            thyRowKey="id"
            thyGroupBy="group_id"
            [thyMode]="mode"
            [thyPageIndex]="pagination.index"
            [thyPageSize]="pagination.size"
            [thyPageTotal]="pagination.total"
            [thyDraggable]="draggable"
            #table
        >
            <ng-template #group let-group>{{ group.id }}</ng-template>
            <thy-table-column thyModelKey="selected" thyType="checkbox" [thySelections]="selections">
                <ng-template #header>
                    <span class="text-primary"
                        >选择<a href="javascript:;"><i class="wtf wtf-angle-down"></i></a
                    ></span>
                </ng-template>
            </thy-table-column>
            <thy-table-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-table-column>
            <thy-table-column thyTitle="年龄" thyModelKey="age" thyHeaderClassName="header-class-name"></thy-table-column>
            <thy-table-column thyTitle="备注" thyModelKey="desc" thyDefaultText="-"></thy-table-column>
            <thy-table-column thyTitle="默认" thyModelKey="checked" thyType="switch"></thy-table-column>
        </thy-table>
        <ng-template #total let-total>共{{ total }}条</ng-template>
    `
})
class ThyDemoGroupTableComponent {
    @ViewChild('table') innerTable: ThyTableComponent;

    groups = [
        {
            id: '11',
            title: '分组1'
        },
        {
            id: '22',
            title: '分组2'
        }
    ];
    model = [
        {
            group_id: '11',
            id: 1,
            name: '张三',
            age: '',
            checked: true
        },
        {
            group_id: '11',
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '11',
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '22',
            id: 4,
            name: '张三2',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            group_id: '22',
            id: 5,
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            group_id: '22',
            id: 6,
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }
    ];
    mode = 'group';
    pagination = {
        index: 1,
        size: 3,
        total: 6
    };

    draggable = false;
}

describe('ThyTable: group', () => {
    let fixture: ComponentFixture<ThyDemoGroupTableComponent>;
    let testComponent: ThyDemoGroupTableComponent;
    let tableComponent: DebugElement;
    let table;
    let rows;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyTableModule, TableTestModule],
            declarations: [ThyDemoGroupTableComponent]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoGroupTableComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTableComponent));
        table = tableComponent.nativeElement.querySelector('table');
        fixture.detectChanges();
        rows = table.querySelectorAll('tr');
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should has correct class and when mode is group', () => {
        fixture.detectChanges();
        expect(table.classList.contains('table-group')).toBe(true);
    });

    it('should has group element when mode is group', () => {
        fixture.detectChanges();
        const groups = table.querySelector('.thy-table-group');
        expect(groups).toBeTruthy();
    });

    it('test expand event', fakeAsync(() => {
        expect(rows.length).toBe(9);

        const trExpandElement = rows[1];

        dispatchFakeEvent(trExpandElement, 'click');
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(rows.length).toBe(6);

        dispatchFakeEvent(trExpandElement, 'click');
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(rows.length).toBe(9);
    }));

    it('should throw error when thyDraggable is true', () => {
        expect(() => {
            testComponent.draggable = true;
            fixture.detectChanges();
        }).toThrowError('Only list mode sorting is supported');
    });

    it('should stop propagation on events dispatched on `.thy-sortable-item` rows', () => {
        testComponent.draggable = false;
        fixture.detectChanges();
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        const items = fixture.nativeElement.querySelectorAll('.thy-sortable-item');
        const event = new PointerEvent('pointerdown');
        spyOn(event, 'stopPropagation');
        items[0].dispatchEvent(event);
        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});

@Component({
    selector: 'thy-demo-empty-table',
    template: `
        <thy-table
            [thyModel]="model"
            thyRowKey="id"
            thyGroupBy="group_id"
            [thyMode]="mode"
            [thyGroups]="groups"
            [thyTheme]="theme"
            [thySize]="size"
            [thyWholeRowSelect]="isRowSelect"
            [thyDraggable]="isDraggable"
            [thyClassName]="tableClassName"
            [thyRowClassName]="tableRowClassName"
            [thyLoadingDone]="isLoadingDone"
            [thyLoadingText]="loadingText"
            [thyShowHeader]="isShowHeader"
            (thyOnRowClick)="onRowClick($event, row)"
            (thyOnMultiSelectChange)="onMultiSelectChange($event, row)"
            [thyPageIndex]="pagination.index"
            [thyPageSize]="pagination.size"
            [thyPageTotal]="pagination.total"
            (thyOnPageChange)="onPageChange($event)"
            (thyOnSwitchChange)="onSwitchChange($event)"
            (thyOnRowContextMenu)="onContextMenu($event)"
        >
            <ng-template #group let-group>{{ group.id }}</ng-template>
            <thy-table-column thyModelKey="selected" thyType="checkbox" [thySelections]="selections">
                <ng-template #header>
                    <span class="text-primary"
                        >选择<a href="javascript:;"><i class="wtf wtf-angle-down"></i></a
                    ></span>
                </ng-template>
            </thy-table-column>
            <thy-table-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-table-column>
            <thy-table-column thyTitle="年龄" thyModelKey="age" thyHeaderClassName="header-class-name"></thy-table-column>
            <thy-table-column thyTitle="备注" thyModelKey="desc" thyDefaultText="-"></thy-table-column>
            <thy-table-column thyTitle="默认" thyModelKey="checked" thyType="switch"></thy-table-column>
            <thy-table-column thyTitle="操作" thyClassName="thy-operation-links">
                <ng-template #cell let-row>
                    <a href="javascript:;">设置</a>
                    <a class="link-secondary" href="javascript:;">
                        <i class="wtf wtf-trash-o"></i>
                    </a>
                </ng-template>
            </thy-table-column>
            <ng-template #empty>
                <div class="custom-empty">
                    空数据模板
                </div>
            </ng-template>
        </thy-table>
        <ng-template #total let-total>共{{ total }}条</ng-template>
    `
})
class ThyDemoEmptyTableComponent {
    model = [];

    pagination = {
        index: 1,
        size: 3,
        total: 6
    };
    isShowHeader = true;
    isDraggable = false;
    isRowSelect = false;
    tableClassName = 'class-name';
    tableRowClassName = 'row-class-name';
    selections = [];
    theme = 'default';
    isLoadingDone = true;
    loadingText = 'loading now';
    size = 'sm';
    showTotal = false;

    mode = 'list';

    @ViewChild('total', { static: true }) totalTemplate: TemplateRef<any>;

    onRowClick() {
        return 'onRowClick is ok';
    }
    onMultiSelectChange() {
        return 'onMultiSelectChange is ok';
    }
    onPageChange() {
        return 'onPageChange is ok';
    }
    onSwitchChange() {
        return 'onSwitchChange is ok';
    }
    onRowContextMenu() {
        return 'onRowContextMenu is ok';
    }
}
describe('ThyTable: empty', () => {
    let fixture: ComponentFixture<ThyDemoEmptyTableComponent>;
    let testComponent: ThyDemoEmptyTableComponent;
    let tableComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyTableModule],
            declarations: [ThyDemoEmptyTableComponent]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoEmptyTableComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTableComponent));
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should display custom empty template when model is [] and has empty', () => {
        testComponent.model = [];
        fixture.detectChanges();
        const defaultEmptyComponent = tableComponent.nativeElement.querySelector('thy-empty');
        expect(defaultEmptyComponent).not.toBeTruthy();
        expect(tableComponent.query(By.css('.custom-empty'))).toBeTruthy();
    });
});

@Component({
    selector: 'thy-demo-fixed-table',
    template: `
        <thy-table [thyModel]="data" thyRowKey="id">
            <thy-table-column thyTitle="Id" thyModelKey="id" [thyWidth]="'100px'" [thyFixed]="fixedLeft"></thy-table-column>
            <thy-table-column thyTitle="Name" thyModelKey="name" thyWidth="500" [thyFixed]="fixedLeft"></thy-table-column>
            <thy-table-column thyTitle="Age" thyModelKey="age" [thyWidth]="'500px'"></thy-table-column>
            <thy-table-column thyTitle="Job" thyModelKey="job" [thyWidth]="'300px'"> </thy-table-column>
            <thy-table-column thyTitle="Address" thyModelKey="address" [thyWidth]="500"></thy-table-column>
            <thy-table-column thyTitle="Job" thyModelKey="job" [thyWidth]="'300px'" [thyFixed]="fixedRight"></thy-table-column>
        </thy-table>
    `
})
class ThyDemoFixedTableComponent {
    fixedLeft = 'left';
    fixedRight = '';
}

describe('ThyTable: fixed', () => {
    let fixture: ComponentFixture<ThyDemoFixedTableComponent>;
    let testComponent: ThyDemoFixedTableComponent;
    let tableComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyTableModule],
            declarations: [ThyDemoFixedTableComponent]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoFixedTableComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTableComponent));
    });

    it('should be created table component', () => {
        expect(tableComponent).toBeTruthy();
    });

    it('should be classes when fixed the left column', () => {
        tableComponent.componentInstance.hasFixed = true;
        fixture.detectChanges();
        expect(tableComponent.query(By.css('.thy-table-fixed'))).toBeTruthy();
        testComponent.fixedLeft = 'left';
        fixture.detectChanges();
        expect(tableComponent.query(By.css('.thy-table-fixed-column-left'))).toBeTruthy();
    });

    it('should be right classes fixed the right column', () => {
        tableComponent.componentInstance.hasFixed = true;
        testComponent.fixedRight = 'right';
        fixture.detectChanges();
        expect(tableComponent.query(By.css('.thy-table-fixed-column-right'))).toBeTruthy();
    });
});
