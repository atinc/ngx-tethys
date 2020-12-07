import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ThyGridModule } from '../grid.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyGridComponent } from '../grid.component';
import { dispatchFakeEvent } from '../../core/testing/dispatcher-events';

@Component({
    selector: 'thy-demo-grid-tree',
    template: `
        <thy-grid [thyModel]="model" thyRowKey="id" [thyMode]="mode">
            <thy-grid-column thyTitle="姓名" thyModelKey="name" thyWidth="160"></thy-grid-column>
            <thy-grid-column
                thyTitle="年龄"
                thyModelKey="age"
                thyHeaderClassName="header-class-name"
                [thyExpand]="showExpand"
            ></thy-grid-column>
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
    `
})
class ThyDemoGridTreeComponent {
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
}

@NgModule({
    imports: [ThyGridModule],
    declarations: [ThyDemoGridTreeComponent],
    exports: [ThyDemoGridTreeComponent]
})
export class GridTreeTestModule {}

describe('ThyGrid', () => {
    let fixture: ComponentFixture<ThyDemoGridTreeComponent>;
    let testComponent: ThyDemoGridTreeComponent;
    let gridComponent;
    let rows;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyGridModule, GridTreeTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoGridTreeComponent);
        testComponent = fixture.debugElement.componentInstance;
        gridComponent = fixture.debugElement.query(By.directive(ThyGridComponent));
        fixture.detectChanges();
        rows = gridComponent.nativeElement.querySelectorAll('tr');
    });

    it('test expand event', fakeAsync(() => {
        expect(rows.length).toEqual(testComponent.model.length + 1);

        const secondRowColumnItem = rows[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[0].querySelector('.tree-expand-icon');
        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();
        tick(100);
        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(9);

        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();
        rows = gridComponent.nativeElement.querySelectorAll('tr');
        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));

    it('test Multi-level Collapse Expand', fakeAsync(() => {
        fixture.detectChanges();

        const secondRowColumnItem = gridComponent.nativeElement.querySelectorAll('tr')[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[0].querySelector('.tree-expand-icon');
        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();
        tick(100);

        const twoExpandElement = gridComponent.nativeElement
            .querySelectorAll('tr')[2]
            .querySelectorAll('td')[0]
            .querySelector('.tree-expand-icon');
        dispatchFakeEvent(twoExpandElement, 'click');
        fixture.detectChanges();
        tick(100);

        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(10);

        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();
        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));

    it('Test that Collapse Expand is displayed in the specified column', fakeAsync(() => {
        fixture = TestBed.createComponent(ThyDemoGridTreeComponent);
        fixture.componentInstance.showExpand = true;
        testComponent = fixture.debugElement.componentInstance;
        gridComponent = fixture.debugElement.query(By.directive(ThyGridComponent));
        fixture.detectChanges();
        rows = gridComponent.nativeElement.querySelectorAll('tr');

        const secondRowColumnItem = rows[1].querySelectorAll('td');
        const expandElement = secondRowColumnItem[1].querySelector('.tree-expand-icon');

        expect(expandElement).toBeTruthy();

        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();

        tick(100);

        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(9);

        dispatchFakeEvent(expandElement, 'click');
        fixture.detectChanges();
        rows = gridComponent.nativeElement.querySelectorAll('tr');
        expect(gridComponent.nativeElement.querySelectorAll('tr').length).toBe(7);
        tick(100);
    }));
});
