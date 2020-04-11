import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ThyTreeModule } from '../tree.module';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyTreeComponent } from '../tree.component';
import { treeNodes } from './mock';
import { ThyIconModule } from '../../icon';
import { ThyFlexibleTextModule } from '../../flexible-text/flexible-text.module';
import { ThyTreeNode } from '../tree-node.class';
import { ThyTreeEmitEvent } from '../tree.class';

const expandSelector = '.thy-tree-expand';
const expandIconSelector = '.thy-tree-expand-icon';
const treeNodeSelector = '.thy-tree-node';
const loadingSelector = '.thy-loading';
const treeNodeChildrenSelector = '.thy-tree-node-children';

describe('ThyTreeComponent', () => {
    function configureThyTreeTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyTreeModule, ThyIconModule, ThyFlexibleTextModule],
            declarations: declarations
        }).compileComponents();
    }
    describe('basic tree', () => {
        let treeInstance: TestBasicTreeComponent;
        let treeElement: HTMLElement;
        let component;
        let fixture: ComponentFixture<TestBasicTreeComponent>;
        let treeComponent: ThyTreeComponent;
        beforeEach(async(() => {
            configureThyTreeTestingModule([TestBasicTreeComponent]);
            fixture = TestBed.createComponent(TestBasicTreeComponent);
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
            [thyType]="'especial'"
            [thyDraggable]="options.draggable"
            [thyCheckable]="options.checkable"
            [thyMultiple]="options.multiple"
            [thySelectedKeys]="['000000000000000000000000']"
            [thyShowExpand]="true"
            [thyBeforeDragDrop]="beforeDragDrop"
            (thyOnDragDrop)="onEvent()"
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
    @ViewChild('tree') tree: ThyTreeComponent;

    // mock 不可变数据
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    options: any = {
        draggable: true,
        checkable: true,
        multiple: false
    };

    onEvent() {}

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

    @ViewChild('tree') treeComponent: ThyTreeComponent;

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
