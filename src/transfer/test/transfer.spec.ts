import { Component, DebugElement, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ThyTransferModule } from '../transfer.module';
import { ThyTransferComponent } from '../transfer.component';
import { ThyTransferDragEvent, ThyTransferChangeEvent, TransferDirection, ThyTransferItem } from '../transfer.interface';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ThyListModule } from '../../list/list.module';
import { ThyIconModule } from '../../icon/icon.module';

const COUNT = 9;
const RIGHTCOUNT = 5;

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
            (thyDraggableUpdate)="onDragUpdate($event)"
            (thyChange)="change($event)"
        >
        </thy-transfer>
    `,
    encapsulation: ViewEncapsulation.None
})
class TestTransferComponent {
    @ViewChild('comp', { static: true }) comp: ThyTransferComponent;
    dataSource: any[] = buildDataList();
    titles = ['Source', 'Target'];

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
    @ViewChild('comp', { static: true }) comp: ThyTransferComponent;
    dataSource: any[] = buildDataList();
}

@Component({
    templateUrl: './transfer-template.html',
    encapsulation: ViewEncapsulation.None
})
class TestTransferCustomRenderContentComponent {
    @ViewChild('comp', { static: true }) comp: ThyTransferComponent;
    dataSource: any[] = buildDataList();
    titles = ['Source', 'Target'];

    select(item: ThyTransferItem, selectItem: (item: ThyTransferItem) => void, unselectItem: (item: ThyTransferItem) => void) {
        if (item.direction === TransferDirection.left) {
            selectItem(item);
        } else {
            unselectItem(item);
        }
    }
}

describe('transfer', () => {
    let fixture: ComponentFixture<TestTransferComponent | TestTransferCustomRenderComponent | TestTransferCustomRenderContentComponent>;
    let dl: DebugElement;
    let instance: TestTransferComponent;
    let pageObject: TransferPageObject;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ThyTransferModule, ThyListModule, ThyIconModule],
            declarations: [TestTransferComponent, TestTransferCustomRenderComponent, TestTransferCustomRenderContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTransferComponent);
        dl = fixture.debugElement;
        instance = dl.componentInstance;
        pageObject = new TransferPageObject();
        fixture.detectChanges();
    });

    it('should have class thy-transfer', () => {
        expect(
            fixture.debugElement.query(By.directive(ThyTransferComponent)).nativeElement.classList.contains('thy-transfer')
        ).toBeTruthy();
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
});
