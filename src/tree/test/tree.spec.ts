import { createDragEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyDragDropModule } from '../../drag-drop';
import { ThyDragDropEvent } from '../../drag-drop/drag-drop.class';
import { ThyFlexibleTextModule } from '../../flexible-text/flexible-text.module';
import { ThyIconModule } from '../../icon';
import { ThyTreeNode } from '../tree-node.class';
import { ThyTreeEmitEvent } from '../tree.class';
import { ThyTreeComponent } from '../tree.component';
import { ThyTreeModule } from '../tree.module';
import { treeNodes } from './mock';

const expandSelector = '.thy-tree-expand';
const expandIconSelector = '.thy-tree-expand-icon';
const treeNodeSelector = '.thy-tree-node';
const loadingSelector = '.thy-loading';
const treeNodeChildrenSelector = '.thy-tree-node-children';

describe('ThyTreeComponent', () => {
    function configureThyTreeTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyTreeModule, ThyIconModule, ThyFlexibleTextModule, ThyDragDropModule, FormsModule],
            declarations
        }).compileComponents();
    }

    describe('basic tree', () => {
        let treeInstance: TestBasicTreeComponent;
        let treeElement: HTMLElement;
        let component;
        let fixture: ComponentFixture<TestBasicTreeComponent>;
        let multipleFixture: ComponentFixture<TestMultipleTreeComponent>;
        let treeComponent: ThyTreeComponent;
        beforeEach(async(() => {
            configureThyTreeTestingModule([TestBasicTreeComponent, TestMultipleTreeComponent]);
            fixture = TestBed.createComponent(TestBasicTreeComponent);
            multipleFixture = TestBed.createComponent(TestMultipleTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeInstance = fixture.debugElement.componentInstance;
            treeComponent = fixture.debugElement.componentInstance.tree;
            treeElement = fixture.debugElement.query(By.directive(ThyTreeComponent)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('test set tree property correctly', () => {
            expect(treeElement.classList).toContain('thy-tree-sm');
            expect(treeElement.classList).toContain('thy-tree-especial');
            expect(treeElement.querySelector('.thy-tree-node-title').classList).toContain('text-truncate');
        });

        it('test set data correctly', () => {
            expect(treeComponent.getRootNodes().length).toEqual(2);
            expect(treeComponent.treeNodes.length).toEqual(2);
        });

        it('test set icons correctly', () => {
            treeInstance.options.treeIcons = { expand: 'minus-square', collapse: 'plus-square' };
            fixture.detectChanges();
            expect(treeElement.querySelector(expandIconSelector).classList).toContain('thy-icon-minus-square');
            (treeElement.querySelector(expandIconSelector) as HTMLElement).click();
            fixture.detectChanges();
            expect(treeElement.querySelector(expandIconSelector).classList).toContain('thy-icon-plus-square');
        });

        it('test set selectedKeys correctly', () => {
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            expect(treeComponent.getSelectedNode().title).toEqual('未分配部门');
        });

        it('test tree node disabled state', () => {
            expect(treeElement.querySelector(`.disabled`).innerHTML).toContain('未分配部门');
        });

        it('test expand status when tree nodes changed ', () => {
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            treeComponent.expandAllNodes();
            const expandNodeCount = treeComponent.getExpandedNodes().length;
            // change tree nodes
            treeInstance.addNode();
            fixture.detectChanges();
            expect(treeComponent.getExpandedNodes().length).toEqual(expandNodeCount);
        });

        it('test selected status when tree nodes changed ', () => {
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            const node = treeComponent.treeNodes[0];
            treeComponent.selectTreeNode(node);
            // change tree nodes
            treeInstance.addNode();
            fixture.detectChanges();
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            expect(treeComponent.getSelectedNodes()[0].key).toEqual(node.key);
        });

        it(`test public function 'getRootNodes()`, () => {
            expect(treeComponent.getRootNodes().length).toEqual(2);
        });

        it(`test public function 'beforeDragOver()`, () => {
            const item = treeElement.querySelectorAll(treeNodeSelector)[1];

            const isShowExpandSpy = spyOn(treeComponent, 'isShowExpand');

            const dragstartEvent = createDragEvent('dragstart');
            item.dispatchEvent(dragstartEvent);
            fixture.detectChanges();

            const dragoverEvent = createDragEvent('dragover');
            item.dispatchEvent(dragoverEvent);
            fixture.detectChanges();

            expect(isShowExpandSpy).toHaveBeenCalled();
        });

        it(`test public function 'getExpandedNodes()`, () => {
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            (treeElement.querySelector(expandIconSelector) as HTMLElement).click();
            fixture.detectChanges();
            expect(treeComponent.getExpandedNodes().length).toEqual(0);
        });

        it(`test public function 'getSelectedNodes()`, () => {
            treeComponent.selectTreeNode(treeComponent.getRootNodes()[1]);
            fixture.detectChanges();
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            expect(treeComponent.getSelectedNode().title).toEqual('未分配部门');
        });

        it(`test public function 'getCheckedNodes()`, () => {
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLElement[];
            checkNodes[4].click();
            checkNodes[5].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(2);
        });

        it(`test public function 'addTreeNode()`, () => {
            treeComponent.addTreeNode(
                {
                    key: '000000000000000000001111',
                    title: '新增部门'
                },
                null
            );
            treeComponent.addTreeNode({ key: 'child0001', title: '未分配部门Child' }, treeComponent.getRootNodes()[1]);
            fixture.detectChanges();
            expect(treeComponent.getRootNodes().length).toEqual(3);
            expect(treeComponent.getRootNodes()[1].children[0].title).toEqual('未分配部门Child');

            fixture.detectChanges();
            treeComponent.addTreeNode(
                {
                    key: '000000000000000000001111',
                    title: '新增部门1'
                },
                null,
                0
            );
            fixture.detectChanges();
            expect(treeComponent.getRootNodes().length).toEqual(4);
            expect(treeComponent.getRootNodes()[0].title).toEqual('新增部门1');
        });

        it(`test public function 'deleteTreeNode()`, () => {
            treeComponent.deleteTreeNode(treeComponent.getRootNodes()[1]);
            expect(treeComponent.getRootNodes().length).toEqual(1);
        });

        it(`test tree checked state`, () => {
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLElement[];
            checkNodes[1].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(7);
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(1);
            treeComponent.treeNodes[0].children[0].children[0].children[0].setChecked(false, true);
            fixture.detectChanges();
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(2);
            expect(treeComponent.getCheckedNodes().length).toEqual(4);
        });

        it(`test tree check state resolve`, () => {
            const checkStateResolveSpy = jasmine.createSpy();
            fixture.componentInstance.options.checkStateResolve = node => {
                checkStateResolveSpy();
            };
            fixture.detectChanges();
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLInputElement[];
            checkNodes[1].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(7);
            expect(checkStateResolveSpy).toHaveBeenCalled();
            expect(checkNodes[0].checked).toEqual(false);
        });

        it('test click event', fakeAsync(() => {
            const clickSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-wrapper')[1] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        }));

        it('test click event', fakeAsync(() => {
            const clickSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-wrapper')[1] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        }));

        it('test expand event', fakeAsync(() => {
            const expandSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll(expandSelector)[0] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(expandSpy).toHaveBeenCalledTimes(1);
        }));

        it('test checkboxChange event', fakeAsync(() => {
            const checkChangeSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-check')[0] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(checkChangeSpy).toHaveBeenCalledTimes(1);
        }));

        it('test hide drag icon when node hover', fakeAsync(() => {
            const dragContentList = treeElement.querySelectorAll('.thy-drag-content');
            dragContentList.forEach((dragContent, index) => {
                const dragContentInnerHTML = dragContent.querySelector('.thy-tree-node-title').innerHTML;

                const dragIcon = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                expect(dragIcon.style.visibility).toBeFalsy();

                dispatchMouseEvent(dragContent, 'mouseenter');
                const dragIconVisible = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                if (dragContent.className.includes('disabled')) {
                    expect(!dragIconVisible.style.visibility).toBeTruthy();
                } else {
                    let cssVisible = dragContentInnerHTML.includes('不可拖拽') ? 'hidden' : 'visible';
                    expect(dragIconVisible.style.visibility === cssVisible).toBeTruthy();
                }

                dispatchMouseEvent(dragContent, 'mouseleave');
                const dragIconHide = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                if (dragContent.className.includes('disabled')) {
                    expect(!dragIconHide.style.visibility).toBeTruthy();
                } else {
                    expect(dragIconHide.style.visibility === 'hidden').toBeTruthy();
                }
            });
        }));

        it('test ngOnChanges methods called when multiple or thyType was modified after init', () => {
            const selectionModelSpy = spyOn<any>(treeComponent, `_instanceSelectionModel`);

            treeInstance.options.multiple = true;
            fixture.detectChanges();

            expect(selectionModelSpy).toHaveBeenCalledTimes(1);

            const treeTypeSpy = spyOn<any>(treeComponent, '_setTreeType');

            treeInstance.treeType = 'default';
            fixture.detectChanges();

            expect(treeTypeSpy).toHaveBeenCalledTimes(1);
        });

        it(`test public function onDragDrop not has parent`, () => {
            expect(treeComponent.getTreeNode(treeNodes[0].key).title).toEqual('易成时代（不可拖拽）');
            const item = treeElement.querySelectorAll(treeNodeSelector)[9];

            const dragstartEvent = createDragEvent('dragstart');
            item.dispatchEvent(dragstartEvent);
            fixture.detectChanges();

            const dragoverEvent = createDragEvent('dragover');
            item.dispatchEvent(dragoverEvent);
            fixture.detectChanges();

            const isShowExpandSpy = spyOn(treeComponent, 'isShowExpand');
            const treeServiceSpy = spyOn(treeComponent.thyTreeService, 'resetSortedTreeNodes');

            const secondItem = treeElement.querySelectorAll(treeNodeSelector)[0];
            const dataTransfer = new DataTransfer();
            dataTransfer.dropEffect = 'move';
            const dropEvent = createDragEvent('drop', dataTransfer, true, true);
            secondItem.dispatchEvent(dropEvent);
            fixture.detectChanges();

            expect(isShowExpandSpy).toHaveBeenCalled();
            expect(treeServiceSpy).toHaveBeenCalled();
            expect(fixture.componentInstance.dragDropSpy).toHaveBeenCalled();
            expect(treeComponent.getRootNodes()[0].title).toEqual('未分配部门');
        });

        it(`test public function onDragDrop`, () => {
            const item = treeElement.querySelectorAll(treeNodeSelector)[1];

            const dragstartEvent = createDragEvent('dragstart');
            item.dispatchEvent(dragstartEvent);
            fixture.detectChanges();

            const dragoverEvent = createDragEvent('dragover');
            item.dispatchEvent(dragoverEvent);
            fixture.detectChanges();

            const isShowExpandSpy = spyOn(treeComponent, 'isShowExpand');

            const secondItem = treeElement.querySelectorAll(treeNodeSelector)[2];
            const dataTransfer = new DataTransfer();
            dataTransfer.dropEffect = 'move';
            const dropEvent = createDragEvent('drop', dataTransfer, true, true);
            secondItem.dispatchEvent(dropEvent);
            fixture.detectChanges();

            expect(isShowExpandSpy).toHaveBeenCalled();
            expect(fixture.componentInstance.dragDropSpy).toHaveBeenCalled();
        });

        it('should test public function collapsedAllNodes', fakeAsync(() => {
            const mockNodes = [{ ...treeNodes[1], setExpanded(expanded: boolean, propagate = false) {} }];
            const getRootNodesSpy = spyOn(treeComponent, 'getRootNodes').and.returnValue(mockNodes);

            treeComponent.collapsedAllNodes();

            expect(getRootNodesSpy).toHaveBeenCalled();
        }));

        it('should test tree-node class setKey and setTitle', fakeAsync(() => {
            expect(treeComponent.getRootNodes()[0].key).toEqual(treeNodes[0].key);
            expect(treeComponent.getRootNodes()[0].title).toEqual(treeNodes[0].name);
            const rootNodes = treeComponent.getRootNodes();
            rootNodes[0].setKey('setKey');
            rootNodes[0].setTitle('设置名称');

            fixture.detectChanges();

            expect(treeComponent.getRootNodes()[0].key).toEqual('setKey');
            expect(treeComponent.getRootNodes()[0].title).toEqual('设置名称');
        }));

        it('should test tree-node class syncNodeCheckState', fakeAsync(() => {
            const getRootNodesSpy = spyOn(treeComponent.thyTreeService, 'syncNodeCheckState');
            const rootNodes = treeComponent.getRootNodes();
            rootNodes[0].syncNodeCheckState();

            fixture.detectChanges();

            expect(getRootNodesSpy).toHaveBeenCalled();
        }));

        it('should toggleTreeNode is be called when type is multiple', fakeAsync(() => {
            multipleFixture.detectChanges();
            tick(100);
            multipleFixture.detectChanges();
            const multipleElement = multipleFixture.debugElement.query(By.directive(ThyTreeComponent)).nativeElement;
            const multipleTree = multipleFixture.debugElement.componentInstance.tree;
            const selectionModelSpy = spyOn(multipleTree._selectionModel, 'toggle');

            const nodeElement = multipleElement.querySelector('.thy-tree-node-wrapper') as HTMLElement;
            nodeElement.click();
            fixture.detectChanges();

            expect(selectionModelSpy).toHaveBeenCalled();
        }));
    });

    describe('async tree', () => {
        let treeInstance: TestAsyncTreeComponent;
        let treeElement: HTMLElement;
        let component;
        let fixture: ComponentFixture<TestAsyncTreeComponent>;
        let treeComponent: ThyTreeComponent;
        beforeEach(async(() => {
            configureThyTreeTestingModule([TestAsyncTreeComponent]);
            fixture = TestBed.createComponent(TestAsyncTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeInstance = fixture.debugElement.componentInstance;
            treeComponent = fixture.debugElement.componentInstance.tree;
            treeElement = fixture.debugElement.query(By.directive(ThyTreeComponent)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should show expand icon', () => {
            expect(treeElement.querySelectorAll(expandIconSelector).length).toEqual(2);
        });

        it('should async load data', fakeAsync(() => {
            const nodeElement = treeElement.querySelectorAll(treeNodeSelector)[0] as HTMLElement;
            const expandElement = nodeElement.querySelector(expandSelector) as HTMLElement;
            expandElement.click();
            fixture.detectChanges();
            expect(nodeElement.querySelector(loadingSelector)).toBeTruthy();
            tick(100);
            fixture.detectChanges();
            expect(nodeElement.querySelector(loadingSelector)).toBeNull();
            expect((nodeElement.querySelector(treeNodeChildrenSelector) as HTMLElement).children.length).toEqual(8);
        }));
    });
});

@Component({
    selector: 'test-basic-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thySize]="'sm'"
            [thyIcons]="options.treeIcons"
            [thyType]="treeType"
            [thyDraggable]="options.draggable"
            [thyCheckable]="options.checkable"
            [thyCheckStateResolve]="options.checkStateResolve"
            [thyMultiple]="options.multiple"
            [thySelectedKeys]="['000000000000000000000000']"
            [thyShowExpand]="true"
            [thyBeforeDragStart]="options.beforeDragStart"
            (thyOnDragDrop)="dragDrop()"
            (thyOnClick)="onEvent()"
            (thyOnCheckboxChange)="onEvent()"
            (thyOnExpandChange)="onEvent()"
        >
            <ng-template #treeNodeTemplate let-node="node" let-data="origin">
                <thy-icon
                    *ngIf="data.type !== 'member'"
                    class="thy-tree-node-icon"
                    [thyIconName]="node?.isExpanded ? 'folder-open-fill' : 'folder-fill'"
                ></thy-icon>
                <div class="thy-tree-node-title text-truncate" thyFlexibleText [thyTooltipContent]="data?.title">
                    {{ data?.name }} <span class="text-desc ml-1">( {{ data.member_count || 0 }}人 )</span>
                </div>
            </ng-template>
        </thy-tree>
    `
})
class TestBasicTreeComponent {
    @ViewChild('tree', { static: true }) tree: ThyTreeComponent;

    // mock 不可变数据
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    treeType = 'especial';

    options: any = {
        draggable: true,
        checkable: true,
        multiple: false,
        beforeDragStart: (event: ThyDragDropEvent<ThyTreeNode>) => {
            return !event.item.title.includes('不可拖拽');
        }
    };

    dragDropSpy = jasmine.createSpy('drag drop');

    onEvent() {}

    dragDrop() {
        this.dragDropSpy();
    }

    addNode() {
        // mock 不可变数据
        this.treeNodes = JSON.parse(JSON.stringify(treeNodes));
        this.treeNodes[0].children = [
            ...this.treeNodes[0].children,
            {
                key: new Date().getTime(),
                title: '测试'
            }
        ];
    }
}
@Component({
    selector: 'test-multiple-tree',
    template: `
        <thy-tree #tree [thyCheckable]="true" [thyMultiple]="true" [thyShowExpand]="true" [thyCheckable]="true" [(ngModel)]="mockData">
            <ng-template #treeNodeTemplate let-node="node" let-data="origin">
                <thy-icon [thyIconName]="node?.isExpanded ? 'folder-open-fill' : 'folder-fill'"></thy-icon>
                <div class="thy-tree-node-title text-truncate" thyFlexibleText [thyTooltipContent]="data?.title">
                    {{ data?.name }} <span class="text-desc ml-1">( {{ data.member_count || 0 }}人 )</span>
                </div>
            </ng-template>
        </thy-tree>
    `
})
export class TestMultipleTreeComponent {
    mockData = JSON.parse(JSON.stringify(treeNodes));

    @ViewChild('tree', { static: true }) tree: ThyTreeComponent;

    constructor() {}
}
@Component({
    selector: 'test-async-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thyAsync]="true"
            [thyCheckable]="true"
            [thyShowExpand]="showExpand"
            (thyOnExpandChange)="onExpandChange($event)"
        >
        </thy-tree>
    `
})
export class TestAsyncTreeComponent {
    mockData = treeNodes;

    treeNodes = this.mockData.map(item => {
        return { ...item, children: [], expanded: false };
    });

    @ViewChild('tree', { static: true }) treeComponent: ThyTreeComponent;

    constructor() {}

    showExpand(node: ThyTreeNode) {
        return node.origin.type !== 'member';
    }

    onExpandChange(event: ThyTreeEmitEvent) {
        setTimeout(() => {
            if (event.node.getChildren().length === 0) {
                const children = this.mockData.find(n => n.key === event.node.key).children;
                children.forEach(node => {
                    node.checked = event.node.origin.checked;
                });
                event.node.addChildren(children);
            }
        }, 100);
    }
}
