import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyGridModule } from '../grid.module';
import { NgModule, Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyGridComponent } from '../grid.component';

const SizeMap = {
    sm: 'table-sm'
};
@Component({
    selector: 'thy-demo-default-grid',
    template: `
        <thy-grid
            [thyModel]="model"
            thyRowKey="id"
            [thyTheme]="theme"
            [thySize]="size"
            [thyTableTopSpace]="topSpace"
            [thyWholeRowSelect]="isRowSelect"
            [thyDraggable]="isDraggable"
            [thyClassName]="gridClassName"
            [thyRowClassName]="gridRowClassName"
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
            <thy-grid-column thyModelKey="selected" thyType="checkbox" [thySelections]="selections">
                <ng-template #header>
                    <span class="text-primary"
                        >选择<a href="javascript:;"><i class="wtf wtf-angle-down"></i></a
                    ></span>
                </ng-template>
            </thy-grid-column>
            <thy-grid-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-grid-column>
            <thy-grid-column thyTitle="年龄" thyModelKey="age" thyHeaderClassName="header-class-name"></thy-grid-column>
            <thy-grid-column thyTitle="备注" thyModelKey="desc" thyDefaultText="-"></thy-grid-column>
            <thy-grid-column thyTitle="默认" thyModelKey="checked" thyType="switch"></thy-grid-column>
            <thy-grid-column thyTitle="操作" thyClassName="thy-operation-links">
                <ng-template #cell let-row>
                    <a href="javascript:;">设置</a>
                    <a class="link-secondary" href="javascript:;">
                        <i class="wtf wtf-trash-o"></i>
                    </a>
                </ng-template>
            </thy-grid-column>
        </thy-grid>
        <ng-template #total let-total>共{{ total }}条</ng-template>
    `
})
class ThyDemoDefaultGridComponent {
    model = [
        {
            id: 1,
            name: '张三',
            age: '',
            checked: true
        },
        {
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 1,
            name: '张三2',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 2,
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 3,
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
    gridClassName = 'class-name';
    gridRowClassName = 'row-class-name';
    selections = [];
    theme = 'default';
    isLoadingDone = true;
    loadingText = 'loading now';
    size = 'sm';
    showTotal = false;
    topSpace = '10px';

    @ViewChild('total') totalTemplate: TemplateRef<any>;

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

@NgModule({
    imports: [ThyGridModule],
    declarations: [ThyDemoDefaultGridComponent],
    exports: [ThyDemoDefaultGridComponent]
})
export class GridTestModule {}

describe('ThyGrid', () => {
    let fixture: ComponentFixture<ThyDemoDefaultGridComponent>;
    let testComponent: ThyDemoDefaultGridComponent;
    let gridComponent;
    let table;
    let rows;
    let gridElements: HTMLElement[];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyGridModule, GridTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoDefaultGridComponent);
        testComponent = fixture.debugElement.componentInstance;
        gridComponent = fixture.debugElement.query(By.directive(ThyGridComponent));
        table = gridComponent.nativeElement.querySelector('table');
    });

    it('should be created grid component', () => {
        expect(gridComponent).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-default')).toBe(true);
        expect(table.classList.contains('class-name')).toBe(true);
        expect(table.classList.contains('table-hover')).toBe(false);
        expect(table.classList.contains('table-draggable')).toBe(false);

        rows = gridComponent.nativeElement.querySelectorAll('tr');
        expect(rows.length).toEqual(testComponent.model.length + 1);
        for (let i = 1; i < rows.length; i++) {
            expect(rows[i].classList.contains('row-class-name')).toBe(true);
        }

        const paginationComponent = gridComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent).toBeTruthy();
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

    it('should grid have style padding-top=20px when thyTableTopSpace is 20px', () => {
        testComponent.topSpace = '20px';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('thy-grid')).styles['padding-top']).toEqual('20px');
    });

    // it('should thy-switch disadled when thyDisabled is true', () => {
    //     fixture.detectChanges();
    //     const switchComponent = rows[1].querySelector('thy-switch');
    //     const labelElement = switchComponent.querySelector('label');
    //     expect(labelElement.classList.contains('thy-switch-disabled')).toBe(true);
    // });

    it('width is 160 when thyWidth is 160', () => {
        fixture.detectChanges();
        const cols = gridComponent.nativeElement.querySelectorAll('colgroup col');
        expect(cols[1].width).toEqual('160');
    });

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
        testComponent.gridClassName = 'class-name';
        fixture.detectChanges();
        expect(table.classList.contains('class-name')).toBe(true);
    });

    it('should have correct class when className is class-name,thySize is sm', () => {
        testComponent.gridClassName = 'class-name';
        testComponent.size = 'sm';
        fixture.detectChanges();
        expect(table.classList.contains('class-name')).toBe(true);
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-sm')).toBe(true);
    });

    it('should have thy-empty component when model is []', () => {
        testComponent.model = [];
        fixture.detectChanges();
        const defaultEmptyComponent = gridComponent.nativeElement.querySelector('thy-empty');
        expect(defaultEmptyComponent).toBeTruthy();
    });

    it('should have thy-loadin component when isLoadingDone is false', () => {
        testComponent.isLoadingDone = false;
        fixture.detectChanges();
        const loadingComponent = gridComponent.nativeElement.querySelector('thy-loading');
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
        const paginationComponent = gridComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent === null).toBe(true);
    });

    it('should in second page when index is 2', () => {
        testComponent.pagination = {
            index: 2,
            size: 3,
            total: 6
        };
        fixture.detectChanges();
        const paginationComponent = gridComponent.nativeElement.querySelector('thy-pagination');
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
        const paginationComponent = gridComponent.nativeElement.querySelector('thy-pagination');
        expect(paginationComponent).toBeTruthy();
    });

    it('should have page-total when total is bigger than size and showTotal is template', () => {
        testComponent.pagination = {
            index: 1,
            size: 10,
            total: 50
        };
        testComponent.showTotal = gridComponent.totalTemplate;
        fixture.detectChanges();
        const paginationComponent = gridComponent.nativeElement.querySelector('thy-pagination');
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

    it('#onRowClick() should set #message to "onRowClick is ok"', () => {
        expect(testComponent.onRowClick()).toMatch('onRowClick is ok');
    });

    it('#onMultiSelectChange() should set #message to "onMultiSelectChange is ok"', () => {
        expect(testComponent.onMultiSelectChange()).toMatch('onMultiSelectChange is ok');
    });

    it('#onPageChange() should set #message to "onPageChange is ok"', () => {
        expect(testComponent.onPageChange()).toMatch('onPageChange is ok');
    });

    it('#onSwitchChange() should set #message to "onSwitchChange is ok"', () => {
        expect(testComponent.onSwitchChange()).toMatch('onSwitchChange is ok');
    });

    it('#onRowContextMenu() should set #message to "onRowContextMenu is ok"', () => {
        expect(testComponent.onRowContextMenu()).toMatch('onRowContextMenu is ok');
    });
});
