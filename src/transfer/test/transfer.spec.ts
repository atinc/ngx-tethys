import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySelectModule } from 'ngx-tethys/select';

import { Component, DebugElement, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyTransfer } from '../transfer.component';
import {
    ThyTransferChangeEvent,
    ThyTransferDragEvent,
    ThyTransferItem,
    TransferDirection,
    InnerTransferDragEvent
} from '../transfer.interface';
import { ThyTransferModule } from '../transfer.module';
import { provideHttpClient } from '@angular/common/http';

const COUNT = 9;
const RIGHTCOUNT = 5;
const RIGHTMAX = 6;

const testData = {
    rightLockItems: [{ id: 9, title: '第9条数据', direction: TransferDirection.right, isLock: true, order: 0 }],
    rightUnLockItemsBeforeDrag: [
        { id: 5, title: '第5条数据', direction: TransferDirection.right, order: 0 },
        { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 1 },
        { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 2 },
        { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 3 }
    ],
    rightUnlockItemBeDrag: { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 3 },
    previousIndex: 3,
    currentIndex: 0,
    rightUnLockItemsAfterDrag: [
        { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 3 },
        { id: 5, title: '第5条数据', direction: TransferDirection.right, order: 0 },
        { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 1 },
        { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 2 }
    ],
    rightDataSourceAfterDrag: [
        { id: 9, title: '第9条数据', direction: TransferDirection.right, isLock: true, order: 0 },
        { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 0 },
        { id: 5, title: '第5条数据', direction: TransferDirection.right, order: 1 },
        { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 2 },
        { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 3 }
    ],
    rightDataSourceAfterAdd: [
        { id: 9, title: '第9条数据', direction: TransferDirection.right, isLock: true, order: 0 },
        { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 0 },
        { id: 5, title: '第5条数据', direction: TransferDirection.right, order: 1 },
        { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 2 },
        { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 3 },
        { id: 2, title: '第2条数据', direction: TransferDirection.right, order: 4, checked: false }
    ],
    rightDataSourceAfterDeleteIndexTwo: [
        { id: 9, title: '第9条数据', direction: TransferDirection.right, isLock: true, order: 0 },
        { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 0 },
        { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 1 },
        { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 2 }
    ],
    dragEvent: {
        model: { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 3 },
        models: [
            { id: 8, title: '第8条数据', direction: TransferDirection.right, order: 3, isLock: false },
            { id: 5, title: '第5条数据', direction: TransferDirection.right, order: 0, isLock: false },
            { id: 6, title: '第6条数据', direction: TransferDirection.right, order: 1, isLock: false },
            { id: 7, title: '第7条数据', direction: TransferDirection.right, order: 2, isLock: false }
        ],
        newIndex: 0,
        oldIndex: 3
    },
    leftItems: {
        lock: [] as ThyTransferItem[],
        unlock: [
            { id: 1, title: '第1条数据', direction: TransferDirection.left, order: 0 },
            { id: 2, title: '第2条数据', direction: TransferDirection.left, order: 1 },
            { id: 3, title: '第3条数据', direction: TransferDirection.left, order: 2 },
            { id: 4, title: '第4条数据', direction: TransferDirection.left, order: 3 }
        ]
    }
};

function buildDataList() {
    return [
        {
            id: 1,
            title: '第1条数据',
            direction: TransferDirection.left
        },
        {
            id: 2,
            title: '第2条数据',
            direction: TransferDirection.left
        },
        {
            id: 3,
            title: '第3条数据',
            direction: TransferDirection.left
        },
        {
            id: 4,
            title: '第4条数据',
            direction: TransferDirection.left
        },
        {
            id: 5,
            title: '第5条数据',
            direction: TransferDirection.right
        },
        {
            id: 6,
            title: '第6条数据',
            direction: TransferDirection.right
        },
        {
            id: 7,
            title: '第7条数据',
            direction: TransferDirection.right
        },
        {
            id: 8,
            title: '第8条数据',
            direction: TransferDirection.right
        },
        {
            id: 9,
            title: '第9条数据',
            direction: TransferDirection.right,
            isLock: true
        }
    ];
}

@Component({
    template: `
        <thy-transfer
            #comp
            [thyData]="dataSource"
            [thyTitles]="titles"
            [thyRightDraggable]="true"
            [thyRightCanLock]="true"
            [thyRightLockMax]="maxLock"
            [thyRightMax]="rightMax"
            (thyDraggableUpdate)="onDragUpdate($event)"
            (thyChange)="change($event)">
        </thy-transfer>
    `,
    encapsulation: ViewEncapsulation.None
})
class TestTransferComponent {
    @ViewChild('comp', { static: true }) comp: ThyTransfer;
    dataSource: any[] = buildDataList();
    titles = ['Source', 'Target'];

    rightMax: any;

    change(ret: ThyTransferChangeEvent): void {}

    onDragUpdate(ret: ThyTransferDragEvent) {}
}

@Component({
    template: `
        <thy-transfer #comp [thyData]="dataSource">
            <ng-template #renderTemplate let-item>
                <div class="custom">{{ item.title }}</div>
            </ng-template>
        </thy-transfer>
    `
})
class TestTransferCustomRenderComponent {
    @ViewChild('comp', { static: true }) comp: ThyTransfer;
    dataSource: any[] = buildDataList();
}

@Component({
    templateUrl: './transfer-template.html',
    encapsulation: ViewEncapsulation.None
})
class TestTransferCustomRenderContentComponent {
    @ViewChild('comp', { static: true }) comp: ThyTransfer;
    dataSource: any[] = buildDataList();
    titles = ['Source', 'Target'];

    select(item: ThyTransferItem, selectItem: (item: ThyTransferItem) => void, unselectItem: (item: ThyTransferItem) => void) {
        if (item.direction === TransferDirection.left) {
            selectItem(item);
        } else {
            unselectItem(item);
        }
    }

    change($event: ThyTransferChangeEvent) {}
}

describe('transfer', () => {
    let fixture: ComponentFixture<TestTransferComponent | TestTransferCustomRenderComponent | TestTransferCustomRenderContentComponent>;
    let dl: DebugElement;
    let instance: TestTransferComponent;
    let pageObject: TransferPageObject;
    let transferComponent: ThyTransfer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ThyTransferModule, ThyListModule, ThyIconModule, ThySelectModule],
            declarations: [TestTransferComponent, TestTransferCustomRenderComponent, TestTransferCustomRenderContentComponent],
            providers: [provideHttpClient()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTransferComponent);
        dl = fixture.debugElement;
        instance = dl.componentInstance;
        pageObject = new TransferPageObject();
        transferComponent = fixture.componentInstance.comp;
        fixture.detectChanges();
    });

    it('should have class thy-transfer', () => {
        expect(fixture.debugElement.query(By.directive(ThyTransfer)).nativeElement.classList.contains('thy-transfer')).toBeTruthy();
    });

    it('should show correct title', () => {
        const leftTitle = (pageObject.leftList.querySelector('.thy-transfer-list-header-title') as any).innerText;
        const rightTitle = (pageObject.rightList.querySelector('.thy-transfer-list-header-title') as any).innerText;
        expect(leftTitle).toBe(`Source · ${COUNT}`);
        expect(rightTitle).toBe(`Target · ${RIGHTCOUNT}`);
    });

    it('should display correct [thyData]', () => {
        pageObject.expectLeft(COUNT).expectRight(RIGHTCOUNT);
        const lockItems = dl.query(By.css('[id="lock"]')).nativeElement.querySelectorAll('.thy-transfer-list-content-item');
        expect(lockItems.length).toBe(1);
    });

    it('should be from left to right', () => {
        pageObject
            .expectLeft(COUNT)
            .transfer('right', 0)
            .expectLeft(COUNT)
            .expectRight(RIGHTCOUNT + 1);
    });

    it('should be from right to left', () => {
        pageObject
            .expectRight(RIGHTCOUNT)
            .transfer('left', 0)
            .expectRight(RIGHTCOUNT - 1)
            .expectLeft(COUNT);
    });

    it('should be from left to right less than or equal thyRightMax', () => {
        instance.rightMax = RIGHTMAX;
        fixture.detectChanges();
        const rightTitle = (pageObject.rightList.querySelector('.thy-transfer-list-header-title') as any).innerText;
        expect(rightTitle).toBe(`Target · ${RIGHTCOUNT} (上限${RIGHTMAX}个)`);

        pageObject
            .expectRight(RIGHTCOUNT)
            // 左侧选择一条 右侧达到最大选择
            .transfer('right', 0)
            .expectRight(RIGHTMAX)
            // 左侧再选择一条 右侧仍最大选择
            .transfer('right', 1)
            .expectRight(RIGHTMAX)
            // 左侧再选择一条 右侧仍最大选择
            .transfer('right', 2)
            .expectRight(RIGHTMAX)
            //取消第一条选择
            .transfer('right', 0)
            .expectRight(RIGHTMAX - 1)
            // 未达到最大选择 可以继续选择
            .transfer('right', 1)
            .expectRight(RIGHTMAX)
            .expectLeft(COUNT);
        const leftFirst = pageObject.leftList.querySelectorAll('.thy-transfer-list-content-item')[0];
        expect(leftFirst.classList).toContain('disabled');
    });

    class TransferPageObject {
        [key: string]: any;

        getEl(cls: string): HTMLElement {
            return dl.query(By.css(cls)).nativeElement as HTMLElement;
        }

        get leftList(): HTMLElement {
            return dl.queryAll(By.css('thy-transfer-list'))[0].nativeElement as HTMLElement;
        }

        get rightList(): HTMLElement {
            return dl.queryAll(By.css('thy-transfer-list'))[1].nativeElement as HTMLElement;
        }

        get rightListInstance() {
            return dl.queryAll(By.css('thy-transfer-list'))[1].componentInstance;
        }

        transfer(direction: 'left' | 'right', index: number): this {
            this.checkItem(direction === 'left' ? 'right' : 'left', index);
            fixture.detectChanges();
            return this;
        }

        checkItem(direction: 'left' | 'right', index: number): this {
            const items = (direction === 'left' ? this.leftList : this.rightList).querySelectorAll('.thy-transfer-list-content-item');
            if (direction === 'left') {
                (items[index] as HTMLElement).querySelector('div').click();
            } else {
                (items[index] as HTMLElement).querySelector('a').click();
            }

            fixture.detectChanges();
            return this;
        }

        expectLeft(count: number): this {
            expect(instance.comp.allDataSource.length).toBe(count);
            return this;
        }

        expectRight(count: number): this {
            expect(instance.comp.rightDataSource.length).toBe(count);
            return this;
        }

        dragOneItem() {
            const rightListInstance = dl.queryAll(By.css('thy-transfer-list'))[1].componentInstance;
            rightListInstance.lockItems = testData.rightLockItems;
            rightListInstance.unlockItems = testData.rightUnLockItemsAfterDrag;
            rightListInstance.drop({
                previousIndex: testData.previousIndex,
                currentIndex: testData.currentIndex,
                isPointerOverContainer: true,
                item: { data: testData.rightUnlockItemBeDrag },
                container: {
                    id: 'unlock',
                    data: testData.rightUnLockItemsBeforeDrag
                },
                previousContainer: {
                    id: 'unlock',
                    data: testData.rightUnLockItemsBeforeDrag
                }
            });
        }
    }

    describe('use custom render content template', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestTransferCustomRenderContentComponent);
            dl = fixture.debugElement;
            instance = dl.componentInstance;
            pageObject = new TransferPageObject();
            fixture.detectChanges();
        });

        it('should render correct content in left and right', () => {
            pageObject.expectLeft(COUNT).expectRight(RIGHTCOUNT);
        });

        it('should be select item from left to right', () => {
            pageObject.checkItem('left', 0);
            pageObject.expectLeft(COUNT).expectRight(RIGHTCOUNT + 1);
        });

        it('should remove item in left', () => {
            pageObject.checkItem('left', 5);
            pageObject.expectLeft(COUNT).expectRight(RIGHTCOUNT - 1);
        });

        it('should remove item in right', () => {
            const items = pageObject.rightList.querySelectorAll('.thy-transfer-list-content-item');
            (items[0] as HTMLElement).click();
            fixture.detectChanges();
            pageObject.expectLeft(COUNT).expectRight(RIGHTCOUNT - 1);
        });
    });

    describe('transfer event', () => {
        let rightListInstance: any;

        beforeEach(() => {
            pageObject = new TransferPageObject();
            rightListInstance = pageObject.rightListInstance;
            fixture.detectChanges();
        });

        it('should support transfer thyChange', () => {
            const spy = jasmine.createSpy('after thyChange subscribe spy');
            transferComponent.thyChange.subscribe((value: ThyTransferChangeEvent) => {
                expect(value.right.unlock.length).toBe(RIGHTCOUNT - 1);
                expect(value.items.length).toBe(1);
                spy();
            });
            pageObject.transfer('left', 0);
            expect(spy).toHaveBeenCalled();
        });

        it('should support transferList draggableUpdate and transfer thyDraggableUpdate', () => {
            const afterDraggableUpdateSpy = jasmine.createSpy('after draggableUpdate subscribe spy');
            rightListInstance.draggableUpdate.subscribe((value: InnerTransferDragEvent) => {
                expect(value).toEqual({
                    dragEvent: testData.dragEvent,
                    listData: {
                        lock: testData.rightLockItems,
                        unlock: testData.rightUnLockItemsAfterDrag
                    }
                });
                afterDraggableUpdateSpy();
            });

            const afterThyDraggableUpdateSpy = jasmine.createSpy('after thyDraggableUpdate subscribe spy');
            transferComponent.thyDraggableUpdate.subscribe((value: ThyTransferDragEvent) => {
                expect(value).toEqual({
                    ...testData.dragEvent,
                    left: testData.leftItems,
                    right: {
                        lock: testData.rightLockItems,
                        unlock: testData.rightUnLockItemsAfterDrag
                    }
                });
                afterThyDraggableUpdateSpy();
            });

            pageObject.dragOneItem();
            fixture.detectChanges();

            expect(afterDraggableUpdateSpy).toHaveBeenCalled();
            expect(afterThyDraggableUpdateSpy).toHaveBeenCalled();
        });

        it('should keep correct order for rightDataSource after drag', () => {
            pageObject.dragOneItem();
            fixture.detectChanges();
            expect(transferComponent.rightDataSource).toEqual(testData.rightDataSourceAfterDrag);
        });

        it('should keep correct order when add item after drag', () => {
            pageObject.dragOneItem();
            fixture.detectChanges();

            pageObject.transfer('right', 1);
            fixture.detectChanges();
            expect(transferComponent.rightDataSource).toEqual(testData.rightDataSourceAfterAdd);
        });

        it('should keep correct order when delete item after drag', () => {
            pageObject.dragOneItem();
            fixture.detectChanges();

            pageObject.transfer('left', 2);
            fixture.detectChanges();
            expect(transferComponent.rightDataSource).toEqual(testData.rightDataSourceAfterDeleteIndexTwo);
        });
    });
});
