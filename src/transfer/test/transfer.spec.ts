import { Component, DebugElement, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ThyTransferModule } from '../transfer.module';
import { ThyTransferComponent, TransferDirection } from '../transfer.component';
import { ThyTransferDragEvent, ThyTransferChangeEvent } from '../transfer.interface';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

const COUNT = 9;
const LEFTCOUNT = 4;

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
    @ViewChild('comp') comp: ThyTransferComponent;
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
    @ViewChild('comp') comp: ThyTransferComponent;
    dataSource: any[] = buildDataList();
}

describe('transfer', () => {
    let fixture: ComponentFixture<TestTransferComponent | TestTransferCustomRenderComponent>;
    let dl: DebugElement;
    let instance: TestTransferComponent;
    let pageObject: TransferPageObject;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ThyTransferModule],
            declarations: [TestTransferComponent, TestTransferCustomRenderComponent]
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
            fixture.debugElement
                .query(By.directive(ThyTransferComponent))
                .nativeElement.classList.contains('thy-transfer')
        ).toBeTruthy();
    });

    it('should show correct title', () => {
        const leftTitle = (pageObject.leftList.querySelector('.thy-transfer-list-header-title') as any).innerText;
        const rightTitle = (pageObject.rightList.querySelector('.thy-transfer-list-header-title') as any).innerText;
        expect(leftTitle).toBe('Source');
        expect(rightTitle).toBe('Target');
    });

    it('should display correct [thyData]', () => {
        pageObject.expectLeft(LEFTCOUNT).expectRight(COUNT - LEFTCOUNT);
        const lockItems = dl
            .query(By.css('[id="lock"]'))
            .nativeElement.querySelectorAll('.thy-transfer-list-content-item');
        expect(lockItems.length).toBe(1);
    });

    it('should be from left to right', () => {
        pageObject
            .expectLeft(LEFTCOUNT)
            .transfer('right', 0)
            .expectLeft(LEFTCOUNT - 1)
            .expectRight(COUNT - LEFTCOUNT + 1);
    });

    it('should be from right to left', () => {
        pageObject
            .expectRight(COUNT - LEFTCOUNT)
            .transfer('left', 0)
            .expectRight(COUNT - LEFTCOUNT - 1)
            .expectLeft(LEFTCOUNT + 1);
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
            const items = (direction === 'left' ? this.leftList : this.rightList).querySelectorAll(
                '.thy-transfer-list-content-item'
            );
            (items[index] as HTMLElement).click();
            fixture.detectChanges();
            return this;
        }

        expectLeft(count: number): this {
            expect(instance.comp.leftDataSource.length).toBe(count);
            return this;
        }

        expectRight(count: number): this {
            expect(instance.comp.rightDataSource.length).toBe(count);
            return this;
        }
    }
});
