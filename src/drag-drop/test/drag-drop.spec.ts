import { Component, DebugElement, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    ThyDragContentDirective,
    ThyDragDropEvent,
    ThyDragDropModule,
    ThyDragEndEvent,
    ThyDragOverEvent,
    ThyDragStartEvent,
    ThyDropContainerDirective
} from 'ngx-tethys/drag-drop';
import { ThySharedModule } from 'ngx-tethys/shared';
import { createDragEvent, dispatchFakeEvent } from 'ngx-tethys/testing';
import { helpers } from 'ngx-tethys/util';
import { ThyDragHandleDirective } from '../drag-handle.directive';
import { ThyDragDirective } from '../drag.directive';

interface DragNodeInfo {
    key: string;
    title: string;
    draggable: boolean;
    class?: string;
    children?: DragNodeInfo[];
}
const nodes: DragNodeInfo[] = [
    {
        key: '000001',
        title: 'item 1',
        draggable: true,
        class: 'drag-first'
    },
    {
        key: '000002',
        title: 'item 2',
        draggable: true,
        class: 'drag-second'
    },
    {
        key: '000003',
        title: 'item 3',
        draggable: false,
        class: 'drag-third'
    },
    {
        key: '000004',
        title: 'item 4',
        draggable: true,
        class: 'drag-fourth',
        children: []
    },
    {
        key: '000005',
        title: 'item 5',
        draggable: true,
        class: 'drag-fifth',
        children: []
    }
];

describe('drag-drop basic directive', () => {
    let fixture: ComponentFixture<TestBasicDragDropComponent>;
    let testComponent: TestBasicDragDropComponent;
    let debugElement: DebugElement;
    let dropContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThySharedModule, ThyDragDropModule, ThyDropContainerDirective, ThyDragDirective],
            declarations: [TestBasicDragDropComponent],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBasicDragDropComponent);
        testComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyDropContainerDirective));
        dropContainerElement = debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should get correct DOM count', () => {
        fixture.detectChanges();
        const count = nodes.length;
        const firstLevelItems = dropContainerElement.querySelectorAll('.drag-item');
        expect(firstLevelItems.length).toBe(count);

        const totalChildrenCount = nodes.reduce((acc, cur) => {
            if (helpers.isArray(cur.children)) {
                acc = acc + cur.children.length;
            }
            return acc;
        }, 0);
        const childrenItems = dropContainerElement.querySelectorAll('.children-item');
        expect(childrenItems.length).toBe(totalChildrenCount);
    });

    it('should emit drag event when drag', fakeAsync(() => {
        fixture.detectChanges();

        const item = debugElement.query(By.css('.drag-first')).nativeElement;
        expect(fixture.componentInstance.beforeStartSpy).not.toHaveBeenCalled();

        const dragstartEvent = createDragEvent('dragstart');
        item.dispatchEvent(dragstartEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.beforeStartSpy).toHaveBeenCalled();
        expect(fixture.componentInstance.dragStartSpy).toHaveBeenCalled();
        const lastDrag = fixture.componentInstance.drags.last;

        expect(lastDrag.dragRef['dragDropService'].previousDrag).not.toBeUndefined();
        expect(lastDrag.dragRef['dragDropService'].classMap.size).toBe(0);
        const dragoverEvent = createDragEvent('dragover');
        item.dispatchEvent(dragoverEvent);
        fixture.detectChanges();
        tick(100);
        expect(fixture.componentInstance.beforeOverSpy).toHaveBeenCalled();
        expect(fixture.componentInstance.dragOverSpy).toHaveBeenCalled();
        expect(lastDrag.dragRef['dragDropService'].classMap.size).toBe(1);

        fixture.detectChanges();
        const dragenterItem = testComponent.drags.first;
        const dragenterSpy = jasmine.createSpy('drag enter');
        dragenterItem.dragRef.entered.asObservable().subscribe(() => {
            dragenterSpy();
        });

        fixture.detectChanges();
        const dragenterEvent = createDragEvent('dragenter');
        item.dispatchEvent(dragenterEvent);
        fixture.detectChanges();

        expect(dragenterSpy).toHaveBeenCalled();

        const secondItem = debugElement.query(By.css('.drag-second')).nativeElement;
        const dataTransfer = new DataTransfer();
        dataTransfer.dropEffect = 'move';
        const dropEvent = createDragEvent('drop', dataTransfer, true, true);

        secondItem.dispatchEvent(dropEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.dragDropSpy).toHaveBeenCalled();

        const dragendEvent = createDragEvent('dragend');
        item.dispatchEvent(dragendEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.beforeDropSpy).toHaveBeenCalled();
        expect(fixture.componentInstance.dragEndSpy).toHaveBeenCalled();
        expect(lastDrag.dragRef['dragDropService'].previousDrag).toBeUndefined();

        fixture.detectChanges();
        const drag = testComponent.drags.first;
        const spy = jasmine.createSpy('drag leave');
        drag.dragRef.leaved.asObservable().subscribe(() => {
            spy();
        });

        fixture.detectChanges();
        const dragleaveEvent = createDragEvent('dragleave');
        item.dispatchEvent(dragleaveEvent);
        fixture.detectChanges();
        flush();

        expect(spy).toHaveBeenCalled();
        expect(lastDrag.dragRef['dragDropService'].classMap.size).toBe(0);
    }));

    it('should get right disabled value when set thyDragDisabled for thyDrag item', () => {
        fixture.detectChanges();

        const lastDrag = testComponent.drags.last;
        expect(lastDrag.disabled).toEqual(true);
    });

    it("should not drag when dragContainer's disabled is true", () => {
        testComponent.disabled = true;
        fixture.detectChanges();

        const dragstartEvent = createDragEvent('dragstart');

        const lastDrag = testComponent.drags.last;
        expect(lastDrag.dragRef['dragStart'](dragstartEvent)).toEqual(false);
    });

    it("should not drag when dragRef's disabled is true", () => {
        fixture.detectChanges();
        const drag = testComponent.drags.first;
        drag.dragRef.disabled = true;

        fixture.detectChanges();
        const item = debugElement.query(By.css('.drag-first')).nativeElement;

        const dragstartEvent = createDragEvent('dragstart');
        item.dispatchEvent(dragstartEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.beforeStartSpy).not.toHaveBeenCalled();
        expect(fixture.componentInstance.dragStartSpy).not.toHaveBeenCalled();
    });

    it('should not emit drag event when drag outside element', () => {
        fixture.detectChanges();

        const item = fixture.debugElement.query(By.css('.drag-second')).nativeElement;
        const dragoverEvent = createDragEvent('dragover');

        item.dispatchEvent(dragoverEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.dragOverSpy).not.toHaveBeenCalled();

        const dataTransfer = new DataTransfer();
        dataTransfer.dropEffect = 'move';
        const dropEvent = createDragEvent('drop', dataTransfer, true, true);

        item.dispatchEvent(dropEvent);
        fixture.detectChanges();
        expect(fixture.componentInstance.dragDropSpy).not.toHaveBeenCalled();
    });
});

describe('with handle', () => {
    let fixture: ComponentFixture<TestWithHandleDragDropComponent>;
    let testComponent: TestWithHandleDragDropComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThySharedModule, ThyDragDropModule, ThyDropContainerDirective, ThyDragDirective, ThyDragHandleDirective],
            declarations: [TestWithHandleDragDropComponent],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWithHandleDragDropComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should drag by handleDisabled', () => {
        fixture.detectChanges();
        const nodesData = testComponent.basicNodes;
        const firstDragHandle = testComponent.dragHandles.first;
        const lastDragHandle = testComponent.dragHandles.last;
        expect(firstDragHandle.disabled).toEqual(nodesData[0].handleDisabled);
        expect(lastDragHandle.disabled).toEqual(nodesData[nodesData.length - 1].handleDisabled);
    });

    it('should get right target for drag handle', () => {
        fixture.detectChanges();
        const item = fixture.debugElement.query(By.css('.drag-handle-4')).nativeElement;
        dispatchFakeEvent(item, 'mouseover', true);
        const target = testComponent.drags.last.dragRef['target'];
        expect(target).toEqual(item);
        const dragstartEvent = createDragEvent('dragstart');

        item.dispatchEvent(dragstartEvent);
    });
});

@Component({
    selector: 'app-test-basic-drag-drop',
    template: `
        <ul
            [thyDropContainer]="nodes"
            [thyBeforeDragStart]="beforeDragStart"
            [thyBeforeDragOver]="beforeDragOver"
            [thyBeforeDragDrop]="beforeDragDrop"
            (thyDragStarted)="onDragStart($event)"
            (thyDragOvered)="onDragOver($event)"
            (thyDragDropped)="onDragDrop($event)"
            (thyDragEnded)="onDragEnd($event)"
            [thyDropContainerDisabled]="disabled">
            @for (item of nodes; track $index; let i = $index) {
                <li class="drag-item" [ngClass]="item.class" [thyDrag]="item" [thyDragDisabled]="i === nodes.length - 1">
                    <ng-template [ngTemplateOutlet]="itemTemplate" [ngTemplateOutletContext]="{ item: item, level: 0 }"></ng-template>
                </li>
            }
        </ul>
        <div class="outside-element">outside element</div>
        <ng-template #itemTemplate let-item="item" let-level="level">
            <div>{{ item.title }}</div>
            @if (item.children) {
                <ul
                    [thyDropContainer]="item.children"
                    [thyBeforeDragStart]="beforeDragStart"
                    [thyBeforeDragOver]="beforeDragOver"
                    [thyBeforeDragDrop]="beforeDragDrop"
                    (thyDragStarted)="onDragStart($event)"
                    (thyDragOvered)="onDragOver($event)"
                    (thyDragDropped)="onDragDrop($event)"
                    (thyDragEnded)="onDragEnd($event)">
                    @for (subItem of item.children; track subItem) {
                        <li class="children-item" [style.paddingLeft.px]="level * 10" [thyDrag]="item">
                            <ng-template
                                [ngTemplateOutlet]="itemTemplate"
                                [ngTemplateOutletContext]="{ item: subItem, level: level + 1 }"></ng-template>
                        </li>
                    }
                </ul>
            }
        </ng-template>
    `
})
export class TestBasicDragDropComponent {
    public nodes = nodes;

    public disabled = false;

    @ViewChild(ThyDragContentDirective, { static: true }) dropContainer: ThyDragContentDirective;

    @ViewChildren(ThyDragDirective) drags: QueryList<ThyDragDirective>;

    beforeStartSpy = jasmine.createSpy('before drag start');

    beforeOverSpy = jasmine.createSpy('before drag over');

    beforeDropSpy = jasmine.createSpy('before drag drop');

    dragStartSpy = jasmine.createSpy('drag start');

    dragOverSpy = jasmine.createSpy('drag over');

    dragDropSpy = jasmine.createSpy('drag drop');

    dragEndSpy = jasmine.createSpy('drag end');

    beforeDragStart = (event: ThyDragStartEvent<DragNodeInfo>) => {
        this.beforeStartSpy();

        return event.item.draggable;
    };

    beforeDragOver = (event: ThyDragStartEvent<DragNodeInfo>) => {
        this.beforeOverSpy();
        return event.item.draggable;
    };

    beforeDragDrop = (event: ThyDragStartEvent<DragNodeInfo>) => {
        this.beforeDropSpy();
        return event.item.draggable;
    };

    onDragStart(event: ThyDragStartEvent) {
        this.dragStartSpy();
    }
    onDragOver(event: ThyDragOverEvent<DragNodeInfo>) {
        this.dragOverSpy();
    }
    onDragDrop(event: ThyDragDropEvent<DragNodeInfo>) {
        this.dragDropSpy();
    }
    onDragEnd(event: ThyDragEndEvent<DragNodeInfo>) {
        this.dragEndSpy();
    }
}

@Component({
    selector: 'app-test-with-handle-drag-drop',
    template: `
        <ul [thyDropContainer]="basicNodes">
            @for (item of basicNodes; track $index) {
                <li [thyDrag]="item">
                    <span thyDragHandle [ngClass]="item.class" [thyDisabled]="item.handleDisabled" class="cursor-pointer">🖐️</span>
                    <span thyDragContent>{{ item.title }}</span>
                </li>
            }
        </ul>
    `
})
export class TestWithHandleDragDropComponent {
    public basicNodes = [
        {
            key: '000001',
            title: '000001（不可拖拽）',
            draggable: false,
            handleDisabled: true
        },
        {
            key: '000002',
            title: '000002',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000003',
            title: '000003',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000004',
            title: '000004',
            draggable: true,
            class: 'drag-handle-4',
            handleDisabled: false
        }
    ];

    public disabled = false;

    @ViewChild(ThyDragContentDirective, { static: true }) dropContainer: ThyDragContentDirective;

    @ViewChildren(ThyDragDirective) drags: QueryList<ThyDragDirective>;

    @ViewChildren(ThyDragHandleDirective) dragHandles: QueryList<ThyDragHandleDirective>;
}
