import { dispatchFakeEvent } from 'ngx-tethys/testing';

import { Component, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThyTable } from '../table.component';
import { ThyTableModule } from '../table.module';

@Component({
    selector: 'thy-demo-table-tree',
    template: `
        <thy-table [thyModel]="model" thyRowKey="id" [thyMode]="mode" [thyDraggable]="draggable">
            <thy-table-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-table-column>
            <thy-table-column
                thyTitle="年龄"
                thyModelKey="age"
                thyHeaderClassName="header-class-name"
                [thyExpand]="showExpand"></thy-table-column>
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
        </thy-table>
    `
})
class ThyDemoTableTreeComponent {
    showExpand = false;

    model = [
        {
            id: 1,
            name: '张三',
            age: '20',
            checked: true,
            children: [
                {
                    id: 11,
                    name: '张三11',
                    age: '',
                    checked: true,
                    children: [
                        {
                            id: 111,
                            name: '张三111',
                            age: '',
                            checked: true,
                            children: [
                                {
                                    id: 1111,
                                    name: '张三11111',
                                    age: '',
                                    checked: true
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 33,
                    name: '张三33',
                    age: '',
                    checked: true
                }
            ]
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
            id: 4,
            name: '张三2',
            age: 0,
            checked: true,
            desc: ''
        },
        {
            id: 5,
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        },
        {
            id: 6,
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }
    ];

    mode = 'tree';

    draggable: boolean;
}

@NgModule({
    imports: [ThyTableModule],
    declarations: [ThyDemoTableTreeComponent],
    exports: [ThyDemoTableTreeComponent]
})
export class TableTreeTestModule {}

describe('ThyTable: tree', () => {
    let fixture: ComponentFixture<ThyDemoTableTreeComponent>;
    let testComponent: ThyDemoTableTreeComponent;
    let tableComponent;
    let rows;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyTableModule, TableTreeTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoTableTreeComponent);
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTable));
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
    });

    it('test expand event', fakeAsync(() => {
        expect(rows.length).toEqual(testComponent.model.length + 1);

        const secondRowColumnItem = rows[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[0].querySelector('.tree-expand-icon');
        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();
        tick(100);
        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(9);

        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));

    it('test Multi-level Collapse Expand', fakeAsync(() => {
        fixture.detectChanges();

        const secondRowColumnItem = tableComponent.nativeElement.querySelectorAll('tr')[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[0].querySelector('.tree-expand-icon');
        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();
        tick(100);

        const twoExpandElement = tableComponent.nativeElement
            .querySelectorAll('tr')[2]
            .querySelectorAll('td')[0]
            .querySelector('.tree-expand-icon');
        dispatchFakeEvent(twoExpandElement, 'click', true);
        fixture.detectChanges();
        tick(100);

        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(10);

        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();
        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));

    it('Test that Collapse Expand is displayed in the specified column', fakeAsync(() => {
        fixture = TestBed.createComponent(ThyDemoTableTreeComponent);
        fixture.componentInstance.showExpand = true;
        testComponent = fixture.debugElement.componentInstance;
        tableComponent = fixture.debugElement.query(By.directive(ThyTable));
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');

        const secondRowColumnItem = rows[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[1].querySelector('.tree-expand-icon');

        expect(expandElement).toBeTruthy();

        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();

        tick(100);

        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(9);

        dispatchFakeEvent(expandElement, 'click', true);
        fixture.detectChanges();
        rows = tableComponent.nativeElement.querySelectorAll('tr');
        expect(tableComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));

    it('should throw error when thyDraggable is true', () => {
        expect(() => {
            testComponent.draggable = true;
            fixture.detectChanges();
        }).toThrowError('Tree mode sorting is not supported');
    });
});
