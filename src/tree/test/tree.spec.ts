import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { Component, OnInit, viewChild, DOCUMENT } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyDragDropEvent } from 'ngx-tethys/drag-drop';
import { ThyIcon } from 'ngx-tethys/icon';
import {
    ThyTree,
    ThyTreeNode,
    ThyTreeNodeComponent,
    ThyTreeBeforeDragDropContext,
    ThyTreeBeforeDragStartContext,
    ThyTreeDragDropEvent,
    ThyTreeDropPosition,
    ThyTreeEmitEvent
} from 'ngx-tethys/tree';
import { bigTreeNodes, treeNodes, hasCheckTreeNodes } from './mock';
import { CDK_DRAG_CONFIG, DragDropConfig } from '@angular/cdk/drag-drop';

import { scrollToViewport, scrollToViewportOffset } from './utils';
import { provideHttpClient } from '@angular/common/http';
import { ThyFlexibleText, ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';

const expandSelector = '.thy-tree-expand';
const expandIconSelector = '.thy-tree-expand-icon';
const treeNodeSelector = '.thy-tree-node';
const loadingSelector = '.thy-loading';
const treeNodeContentSelector = '.thy-tree-node-content';

describe('ThyTreeComponent', () => {
    function configureThyTreeTestingModule() {
        TestBed.configureTestingModule({
            imports: [ThyFlexibleTextModule],
            providers: [
                {
                    provide: CDK_DRAG_CONFIG,
                    useValue: {
                        dragStartThreshold: 0,
                        pointerDirectionChangeThreshold: 5
                    } as DragDropConfig
                },
                provideHttpClient()
            ]
        }).compileComponents();
    }

    describe('basic tree', () => {
        let treeInstance!: TestBasicTreeComponent;
        let treeElement!: HTMLElement;
        let component!: TestBasicTreeComponent;
        let fixture!: ComponentFixture<TestBasicTreeComponent>;
        let multipleFixture!: ComponentFixture<TestMultipleTreeComponent>;
        let treeComponent!: ThyTree;

        beforeEach(fakeAsync(() => {
            configureThyTreeTestingModule();
            fixture = TestBed.createComponent(TestBasicTreeComponent);
            multipleFixture = TestBed.createComponent(TestMultipleTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeInstance = fixture.debugElement.componentInstance;
            treeComponent = fixture.debugElement.componentInstance.tree();
            treeElement = fixture.debugElement.query(By.directive(ThyTree)).nativeElement;
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
            const disabledElement = treeElement.querySelector(`.disabled`);
            expect(disabledElement.innerHTML).toContain('设计部(禁用)');
            (disabledElement as HTMLElement).click();
            fixture.detectChanges();
            expect(disabledElement.classList).not.toContain('active');
        });

        it('test tree node disabled click change expand', () => {
            const disabledElement = treeElement.querySelector(`.disabled`);
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            (disabledElement as HTMLElement).click();
            fixture.detectChanges();
            expect(treeComponent.getExpandedNodes().length).toEqual(2);
        });

        it('test expand status when tree nodes changed ', fakeAsync(() => {
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            treeComponent.expandAllNodes();
            tick(100);
            fixture.detectChanges();
            const expandNodeCount = treeComponent.getExpandedNodes().length;
            expect(treeComponent.getExpandedNodes().length).toEqual(expandNodeCount);
        }));

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

        it(`test public function 'treeNodes()`, () => {
            expect(treeComponent.treeNodes.length).toEqual(2);
        });

        it(`test public getExpandedNodes`, () => {
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            (treeElement.querySelector(expandIconSelector) as HTMLElement).click();
            fixture.detectChanges();
            expect(treeComponent.getExpandedNodes().length).toEqual(0);
        });

        it(`test public function 'getSelectedNodes()`, () => {
            treeComponent.selectTreeNode(treeComponent.treeNodes[1]);
            fixture.detectChanges();
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            expect(treeComponent.getSelectedNode().title).toEqual('未分配部门');
        });

        it(`test public function 'getCheckedNodes()`, () => {
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLElement[];
            checkNodes[4].click();
            checkNodes[5].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(3);
        });

        it(`test public function 'addTreeNode()`, () => {
            treeComponent.addTreeNode(
                {
                    key: '000000000000000000001111',
                    title: '新增部门'
                },
                null
            );
            treeComponent.addTreeNode({ key: 'child0001', title: '未分配部门Child' }, treeComponent.treeNodes[1]);
            fixture.detectChanges();
            expect(treeComponent.treeNodes.length).toEqual(3);
            expect(treeComponent.treeNodes[1].children[0].title).toEqual('未分配部门Child');

            fixture.detectChanges();
            treeComponent.addTreeNode(
                {
                    key: '000000000000000000002222',
                    title: '新增部门2'
                },
                null,
                0
            );
            fixture.detectChanges();
            expect(treeComponent.treeNodes.length).toEqual(4);
            expect(treeComponent.treeNodes[0].title).toEqual('新增部门2');
        });

        it(`test public function 'deleteTreeNode()`, () => {
            treeComponent.deleteTreeNode(treeComponent.treeNodes[1]);
            expect(treeComponent.treeNodes.length).toEqual(1);
        });

        it(`test tree checked state`, () => {
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLElement[];
            checkNodes[1].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(8);
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(2);
            treeComponent.treeNodes[0].children[0].children[0].children[0].setChecked(false, true);
            fixture.detectChanges();
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(3);
            expect(treeComponent.getCheckedNodes().length).toEqual(5);
        });

        it(`test tree disabled checked state`, () => {
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLElement[];
            checkNodes[9].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(5);
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(2);
            checkNodes[9].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(1);
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(2);

            checkNodes[10].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(1);
        });

        it(`test tree check state resolve`, () => {
            const checkStateResolveSpy = jasmine.createSpy();
            fixture.componentInstance.options.checkStateResolve = () => {
                checkStateResolveSpy();
            };
            fixture.detectChanges();
            const checkNodes = Array.from(treeElement.querySelectorAll('.thy-tree-node-check')) as HTMLInputElement[];
            checkNodes[1].click();
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(8);
            expect(checkStateResolveSpy).toHaveBeenCalled();
            expect(checkNodes[0].checked).toEqual(false);
        });

        it('test click event', fakeAsync(() => {
            const clickSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-wrapper')[1] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(targetNode.classList).toContain('active');
            expect(clickSpy).toHaveBeenCalledTimes(1);
        }));

        it('should exec checkbox when thyClickBehavior is `selectCheckbox`', () => {
            const checkStateResolveSpy = jasmine.createSpy();
            fixture.componentInstance.options.checkStateResolve = () => {
                checkStateResolveSpy();
            };
            treeInstance.options.clickBehavior = 'selectCheckbox';
            fixture.detectChanges();
            expect(treeComponent.getCheckedNodes().length).toEqual(1);
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-wrapper')[1] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(targetNode.classList).not.toContain('active');
            expect(treeComponent.getCheckedNodes().length).toEqual(8);
            expect(checkStateResolveSpy).toHaveBeenCalledTimes(1);

            targetNode.click();
            fixture.detectChanges();
            expect(targetNode.classList).not.toContain('active');
            expect(treeComponent.getCheckedNodes().length).toEqual(1);
            expect(checkStateResolveSpy).toHaveBeenCalledTimes(2);
        });

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

        it('test dbclick event', fakeAsync(() => {
            const dbclickSpy = spyOn(treeInstance, 'onDbClickEvent');
            const targetNode = treeElement.querySelectorAll(treeNodeContentSelector)[0] as HTMLElement;
            targetNode.dispatchEvent(new MouseEvent('dblclick'));
            fixture.detectChanges();
            expect(dbclickSpy).toHaveBeenCalledTimes(1);
        }));

        it('test checkboxChange event', fakeAsync(() => {
            const checkChangeSpy = spyOn(treeInstance, 'onEvent');
            const targetNode = treeElement.querySelectorAll('.thy-tree-node-check')[0] as HTMLElement;
            targetNode.click();
            fixture.detectChanges();
            expect(checkChangeSpy).toHaveBeenCalledTimes(1);
        }));

        it('should add and show the drag icon when the tree node is hovered', () => {
            const dragContentList = treeElement.querySelectorAll('.thy-drag-content');

            dragContentList.forEach(dragContent => {
                const dragContentInnerHTML = dragContent.querySelector('.thy-tree-node-title').innerHTML;

                const dragIcon = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                expect(dragIcon.style.visibility).toBeFalsy();

                dispatchMouseEvent(dragContent, 'mouseenter');
                const dragIconVisible = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                if (dragContent.className.includes('disabled')) {
                    expect(dragIconVisible.style.visibility).toBeTruthy();
                } else {
                    let cssVisible = dragContentInnerHTML.includes('不可拖拽') ? 'hidden' : 'visible';
                    expect(dragIconVisible.style.visibility === cssVisible).toBeTruthy();
                }

                dispatchMouseEvent(dragContent, 'mouseleave');
                const dragIconHide = dragContent.querySelector('.thy-tree-drag-icon') as HTMLElement;
                if (dragContent.className.includes('disabled')) {
                    expect(dragIconHide.style.visibility).toBeTruthy();
                } else {
                    expect(dragIconHide.style.visibility === 'hidden').toBeTruthy();
                }
            });
        });

        it('test ngOnChanges methods called when multiple or thyType or thySelectedKeys was modified after init', () => {
            const selectionModelSpy = spyOn<any>(treeComponent, `instanceSelectionModel`);

            treeInstance.options.multiple = true;
            fixture.detectChanges();

            expect(selectionModelSpy).toHaveBeenCalledTimes(1);

            const treeTypeSpy = spyOn<any>(treeComponent, 'setTreeType');

            treeInstance.treeType = 'default';
            fixture.detectChanges();

            expect(treeTypeSpy).toHaveBeenCalledTimes(1);

            const treeNodesSpy = spyOn<any>(treeComponent, 'selectTreeNodes');

            const onChangesData = JSON.parse(JSON.stringify(treeNodes));
            onChangesData.pop();
            treeInstance.selectedKeys = ['000000000000000000000000', '111111111111111111111111'];
            fixture.detectChanges();

            expect(treeNodesSpy).toHaveBeenCalledTimes(1);
        });

        it('should test public function collapsedAllNodes', fakeAsync(() => {
            const spy = spyOn(treeComponent.thyTreeService, 'syncFlattenTreeNodes').and.callThrough();
            treeComponent.collapsedAllNodes();
            expect(spy).toHaveBeenCalled();
        }));

        it('should test tree-node class setKey and setTitle', fakeAsync(() => {
            expect(treeComponent.treeNodes[0].key).toEqual(treeNodes[0].key);
            expect(treeComponent.treeNodes[0].title).toEqual(treeNodes[0].name);
            const rootNodes = treeComponent.treeNodes;
            rootNodes[0].setKey('setKey');
            rootNodes[0].setTitle('设置名称');

            fixture.detectChanges();

            expect(treeComponent.treeNodes[0].key).toEqual('setKey');
            expect(treeComponent.treeNodes[0].title).toEqual('设置名称');
        }));

        it('should test tree-node class syncNodeCheckState', fakeAsync(() => {
            const getRootNodesSpy = spyOn(treeComponent.thyTreeService, 'syncNodeCheckState');
            const rootNodes = treeComponent.treeNodes;
            rootNodes[0].syncNodeCheckState();

            fixture.detectChanges();

            expect(getRootNodesSpy).toHaveBeenCalled();
        }));

        it('should toggleTreeNode is be called when type is multiple', fakeAsync(() => {
            multipleFixture.detectChanges();
            tick(100);
            multipleFixture.detectChanges();
            const multipleElement = multipleFixture.debugElement.query(By.directive(ThyTree)).nativeElement;
            const multipleTree = multipleFixture.debugElement.componentInstance.tree();
            const selectionModelSpy = spyOn(multipleTree.selectionModel, 'toggle');
            const nodeElement = multipleElement.querySelector('.thy-tree-node-wrapper') as HTMLElement;
            nodeElement.click();
            fixture.detectChanges();

            expect(selectionModelSpy).toHaveBeenCalled();
        }));

        it('test should successful add tree node ', () => {
            const treeCount = treeElement.querySelectorAll(treeNodeSelector).length;
            expect(treeCount).toEqual(12);
            const tmpTreeNode = {
                key: '111000000000000',
                title: '新增测试',
                expanded: true,
                _id: '111000000000000',
                name: '新增测试',
                member_count: 3
            };
            treeComponent.addTreeNode(tmpTreeNode);
            fixture.detectChanges();
            const updateTreeNodesCount = treeElement.querySelectorAll(treeNodeSelector).length;
            expect(updateTreeNodesCount).toEqual(13);
        });

        it('test should successful delete tree node ', () => {
            const treeCount = treeElement.querySelectorAll(treeNodeSelector).length;
            expect(treeCount).toEqual(12);
            const node = treeComponent.treeNodes[0];
            treeComponent.deleteTreeNode(node);
            fixture.detectChanges();
            const updateTreeNodesCount = treeElement.querySelectorAll(treeNodeSelector).length;
            expect(updateTreeNodesCount).toEqual(1);
        });

        it('test should throw error when thySize and thyItemSize are both assigned ', () => {
            try {
                component.size = 'sm';
                component.itemSize = 55;
            } catch (error) {
                expect(error.message).toEqual('setting thySize and thyItemSize at the same time is not allowed');
            }
        });

        it('test should thyItemSize is 42 when thySize is sm', () => {
            component.size = 'sm';
            expect(component.tree().itemSize()).toEqual(42);
        });

        it('test tree node nodeIconStyle', () => {
            component.size = null;
            fixture.detectChanges();
            expect(treeComponent.itemSize()).toEqual(44);
        });

        it('should thyIndent worked', () => {
            const indexElement: HTMLElement = treeElement.querySelectorAll('.thy-tree-node')[1].querySelector('.thy-tree-index');
            expect(indexElement.style.width).toEqual('10px');
        });

        it('test should successful set thyExpandedKeys ', fakeAsync(() => {
            component.expandedKeys = ['111111111111111111111111', '5d4e5b365fadf30311c3d889'];
            fixture.detectChanges();
            expect(treeComponent.flattenTreeNodes().find(item => item.key === '111111111111111111111111').isExpanded).toEqual(true);
            expect(treeComponent.flattenTreeNodes().find(item => item.key === '5d4e5b365fadf30311c3d889').isExpanded).toEqual(true);
        }));

        it('test should successful set thyExpandAll ', fakeAsync(() => {
            component.expandAll = true;
            fixture.detectChanges();
            treeComponent.flattenTreeNodes().forEach(item => {
                expect(item.isExpanded).toEqual(true);
            });
        }));
    });

    describe('async tree', () => {
        let treeElement!: HTMLElement;
        let component!: TestAsyncTreeComponent;
        let fixture!: ComponentFixture<TestAsyncTreeComponent>;

        beforeEach(waitForAsync(() => {
            configureThyTreeTestingModule();
            fixture = TestBed.createComponent(TestAsyncTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeElement = fixture.debugElement.query(By.directive(ThyTree)).nativeElement;
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
            expect(treeElement.querySelectorAll(treeNodeSelector).length).toEqual(12);
        }));
    });

    describe('virtual scrolling tree', () => {
        let treeElement!: HTMLElement;
        let component!: TestVirtualScrollingTreeComponent;
        let fixture!: ComponentFixture<TestVirtualScrollingTreeComponent>;
        let document!: Document;

        beforeEach(fakeAsync(() => {
            configureThyTreeTestingModule();
            fixture = TestBed.createComponent(TestVirtualScrollingTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            treeElement = fixture.debugElement.query(By.directive(ThyTree)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should scrolling tree nodes', fakeAsync(() => {
            fixture.detectChanges();
            const nodeElements = treeElement.querySelectorAll(treeNodeSelector);
            const firstNodeElementText = nodeElements[0].textContent;
            expect(nodeElements.length).toEqual(12);
            scrollToViewportOffset(fixture, 10000);
            const updateFirstNodeElementText = nodeElements[0].textContent;
            expect(firstNodeElementText !== updateFirstNodeElementText).toBeTruthy();
            expect(nodeElements.length).toEqual(12);
        }));

        it('should successful set node class', fakeAsync(() => {
            fixture.detectChanges();
            const nodeElements = treeElement.querySelectorAll('.node-test');
            expect(nodeElements.length).toEqual(1);

            component.setNodeItemClass('node-test2', 0);
            tick(200);
            fixture.detectChanges();
            const nodeElements2 = treeElement.querySelectorAll('.node-test2');
            expect(nodeElements2.length).toEqual(1);
        }));

        it('should drag and drop successful', fakeAsync(() => {
            fixture.detectChanges();
            const dragDropSpy = spyOn(component, 'onDragDrop');

            dragDropSpy.and.callFake((event: any) => {});

            const document = TestBed.inject(DOCUMENT);

            // start drag
            let nodeDebugElements = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent));
            const startNodeData = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent))[0].componentInstance.node();
            const startNodeElement = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent))[0].nativeElement;
            startDragging(fixture, startNodeElement, 10, 10);

            // scroll to viewport bottom
            scrollToViewport(fixture, { bottom: 0 });

            // drop last node
            nodeDebugElements = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent));
            const targetNodeData = nodeDebugElements[nodeDebugElements.length - 1].componentInstance.node();
            const targetNodeElement = nodeDebugElements[nodeDebugElements.length - 1].nativeElement;
            const targetClientRect = targetNodeElement.getBoundingClientRect();
            const targetClientY = targetClientRect.top + targetClientRect.height / 2 - 1;

            // 拖拽内部调用函数 elementFromPoint 只能获取可视窗口的元素，但是测试环境是不确定的，可能受到滚动条影响原因，所以通过fake函数指定目标元素
            spyOn(document, 'elementFromPoint').and.callFake(() => targetNodeElement);

            dispatchMouseEvent(targetNodeElement, 'mousemove', targetClientRect.left + 10, targetClientY);
            fixture.detectChanges();

            dispatchMouseEvent(targetNodeElement, 'mouseup', targetClientRect.left + 10, targetClientY);
            fixture.detectChanges();

            tick();

            expect(dragDropSpy).toHaveBeenCalledTimes(1);
            const args = dragDropSpy.calls.allArgs()[0][0];
            const treeComponent = component.treeComponent();
            expect(args.dragNode).toEqual(treeComponent.getTreeNode(startNodeData.key));
            expect(args.targetNode).toEqual(treeComponent.getTreeNode(targetNodeData.key));
            expect(args.afterNode).toEqual(undefined);
        }));
    });

    describe('has checked nodes tree', () => {
        let treeElement!: HTMLElement;
        let treeInstance!: TestHasCheckedTreeComponent;
        let component!: TestHasCheckedTreeComponent;
        let fixture!: ComponentFixture<TestHasCheckedTreeComponent>;
        let treeComponent!: ThyTree;

        beforeEach(fakeAsync(() => {
            configureThyTreeTestingModule();
            fixture = TestBed.createComponent(TestHasCheckedTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeInstance = fixture.debugElement.componentInstance;
            treeComponent = fixture.debugElement.componentInstance.tree();
            treeElement = fixture.debugElement.query(By.directive(ThyTree)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it(`should indent default is 25px`, () => {
            const indexElement: HTMLElement = treeElement.querySelectorAll('.thy-tree-node')[1].querySelector('.thy-tree-index');
            expect(indexElement.style.width).toEqual('25px');
        });

        it('parent node should has checked', () => {
            fixture.detectChanges();
            const productAGroupCheckbox = treeElement.querySelectorAll('.thy-tree-node-check')[2];
            expect(treeComponent.getCheckedNodes().length).toEqual(2);
            expect(treeElement.querySelectorAll('.form-check-indeterminate').length).toEqual(3);
            expect(productAGroupCheckbox.className.includes('form-check-indeterminate')).toBeTruthy();
        });
    });

    describe('drag drop tree', () => {
        let treeElement!: HTMLElement;
        let component!: TestDragDropTreeComponent;
        let fixture!: ComponentFixture<TestDragDropTreeComponent>;
        let document!: Document;
        let elementFromPointSpy!: jasmine.Spy;

        beforeEach(fakeAsync(() => {
            configureThyTreeTestingModule();
            fixture = TestBed.createComponent(TestDragDropTreeComponent);
            document = TestBed.inject(DOCUMENT);
            component = fixture.componentInstance;
            elementFromPointSpy = spyOn(document, 'elementFromPoint');
            fixture.detectChanges();
            treeElement = fixture.debugElement.query(By.directive(ThyTree)).nativeElement;
            tick();
            fixture.detectChanges();
        }));

        function dragToTargetNode(options: { start: string; target: string; position: ThyTreeDropPosition }) {
            const nodeDebugElements = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent));

            let startNode: any = null;
            let targetNode: any = null;

            for (let i = 0; i < nodeDebugElements.length; i++) {
                const item = nodeDebugElements[i];
                const node = item.componentInstance?.node();
                if (node && node.key === options.start && !startNode) {
                    startNode = item;
                }
                if (node && node.key === options.target && !targetNode) {
                    targetNode = item;
                }
            }

            if (!startNode || !targetNode) {
                throw new Error(`Cannot find node: start=${options.start}, target=${options.target}`);
            }

            // elementFromPoint 只能获取可视窗口的元素，但是测试环境是不确定的，可能受到滚动条影响原因，所以通过fake函数指定目标元素
            elementFromPointSpy.and.returnValue(targetNode.nativeElement);

            dargNode(fixture, startNode.nativeElement, targetNode.nativeElement, options.position);
        }

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should successfully drag node to the target before position"', fakeAsync(() => {
            const dragDropSpy = spyOn(component, 'onDragDrop');

            dragToTargetNode({
                start: '001',
                target: '003',
                position: ThyTreeDropPosition.before
            });

            expect(dragDropSpy).toHaveBeenCalledTimes(1);
            const args = dragDropSpy.calls.allArgs()[0][0];
            const treeComponent = component.treeComponent();
            expect(args.dragNode).toEqual(treeComponent.getTreeNode('001'));
            expect(args.targetNode).toEqual(null);
            expect(args.afterNode).toEqual(treeComponent.getTreeNode('002'));
        }));

        it('should successfully drag node to the target after position"', fakeAsync(() => {
            const dragDropSpy = spyOn(component, 'onDragDrop');

            dragToTargetNode({
                start: '002',
                target: '001-01',
                position: ThyTreeDropPosition.after
            });

            fixture.detectChanges();
            expect(dragDropSpy).toHaveBeenCalledTimes(1);
            const args = dragDropSpy.calls.allArgs()[0][0];
            const treeComponent = component.treeComponent();
            expect(args.dragNode).toEqual(treeComponent.getTreeNode('002'));
            expect(args.targetNode).toEqual(treeComponent.getTreeNode('001'));
            expect(args.afterNode).toEqual(treeComponent.getTreeNode('001-01'));
        }));

        it('should successfully drag node to the target in position"', fakeAsync(() => {
            const dragDropSpy = spyOn(component, 'onDragDrop');

            dragToTargetNode({
                start: '002',
                target: '001',
                position: ThyTreeDropPosition.in
            });

            expect(dragDropSpy).toHaveBeenCalledTimes(1);
            const args = dragDropSpy.calls.allArgs()[0][0];
            const treeComponent = component.treeComponent();
            expect(args.dragNode).toEqual(treeComponent.getTreeNode('002'));
            expect(args.targetNode).toEqual(treeComponent.getTreeNode('001'));
            expect(args.afterNode).toEqual(treeComponent.getTreeNode('001-01'));
        }));

        it('should update the tree structure correctly when dragging a node to a different level', fakeAsync(() => {
            const dragDropSpy = spyOn(component, 'onDragDrop');
            dragDropSpy.and.callFake((event: ThyTreeDragDropEvent) => {
                expect(event.dragNode.level).toEqual(event.targetNode.level + 1);
                expect(event.targetNode.children).toContain(event.dragNode);
            });

            dragToTargetNode({
                start: '003',
                target: '001-01-01',
                position: ThyTreeDropPosition.in
            });

            expect(dragDropSpy).toHaveBeenCalledTimes(1);
        }));

        it('should disable dragging node when node title is 003', fakeAsync(() => {
            const dragDropSpy = spyOn(component, 'onDragDrop');
            const beforeDragStart = spyOn(component, 'beforeDragStart');
            beforeDragStart.and.callFake((event: ThyTreeBeforeDragStartContext) => {
                if (event.item.title.includes('001')) {
                    return false;
                }
                return true;
            });

            fixture.detectChanges();

            dragToTargetNode({
                start: '001',
                target: '003',
                position: ThyTreeDropPosition.in
            });

            const nodeDebugElements = fixture.debugElement.queryAll(By.directive(ThyTreeNodeComponent));
            const startNode = nodeDebugElements.find(item => item.componentInstance.node().key === '001');

            expect(beforeDragStart).toHaveBeenCalled();
            expect(startNode.nativeElement.classList).toContain('cdk-drag-disabled');
            expect(dragDropSpy).not.toHaveBeenCalled();
        }));

        // it('should not allow drop in node 003', fakeAsync(() => {
        //     const dragDropSpy = spyOn(component, 'onDragDrop');
        //     const beforeDragDrop = spyOn(component, 'beforeDragDrop');
        //     beforeDragDrop.and.callFake((event: ThyTreeBeforeDragDropContext) => {
        //         if (event.item.title.includes('003') && event.position === ThyTreeDropPosition.in) {
        //             return false;
        //         }
        //         return true;
        //     });
        //     fixture.detectChanges();

        //     dragToTargetNode({
        //         start: '001',
        //         target: '003',
        //         position: ThyTreeDropPosition.in
        //     });
        //     expect(beforeDragDrop).toHaveBeenCalledTimes(1);
        //     expect(dragDropSpy).not.toHaveBeenCalled();

        //     dragToTargetNode({
        //         start: '001',
        //         target: '003',
        //         position: ThyTreeDropPosition.before
        //     });
        //     expect(beforeDragDrop).toHaveBeenCalledTimes(2);
        //     expect(dragDropSpy).toHaveBeenCalledTimes(1);

        //     dragToTargetNode({
        //         start: '001',
        //         target: '003',
        //         position: ThyTreeDropPosition.after
        //     });
        //     expect(beforeDragDrop).toHaveBeenCalledTimes(3);
        //     expect(dragDropSpy).toHaveBeenCalledTimes(2);
        // }));
    });
});

@Component({
    selector: 'test-basic-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thySize]="size"
            [thyItemSize]="itemSize"
            [thyIndent]="indent"
            [thyIcons]="options.treeIcons"
            [thyType]="treeType"
            [thyDraggable]="options.draggable"
            [thyCheckable]="options.checkable"
            [thyCheckStateResolve]="options.checkStateResolve"
            [thyMultiple]="options.multiple"
            [thyClickBehavior]="options.clickBehavior"
            [thySelectedKeys]="selectedKeys"
            [thyExpandedKeys]="expandedKeys"
            [thyExpandAll]="expandAll"
            [thyShowExpand]="true"
            [thyBeforeDragStart]="options.beforeDragStart"
            (thyOnDragDrop)="dragDrop($event)"
            (thyOnClick)="onEvent()"
            (thyDblClick)="onDbClickEvent()"
            (thyOnCheckboxChange)="onEvent()"
            (thyOnExpandChange)="onEvent()">
            <ng-template #treeNodeTemplate let-node="node" let-data="origin">
                @if (data.type !== 'member') {
                    <thy-icon class="thy-tree-node-icon" [thyIconName]="node?.isExpanded ? 'folder-open-fill' : 'folder-fill'"></thy-icon>
                }
                <div class="thy-tree-node-title text-truncate" thyFlexibleText [thyTooltipContent]="data?.title">
                    {{ data?.name }} <span class="text-desc ml-1">( {{ data.member_count || 0 }}人 )</span>
                </div>
            </ng-template>
        </thy-tree>
    `,
    imports: [ThyTree, ThyFlexibleText, ThyIcon]
})
class TestBasicTreeComponent {
    readonly tree = viewChild<ThyTree>('tree');

    // mock 不可变数据
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    treeType = 'especial';

    size = 'sm';

    indent = 10;

    itemSize: number = undefined;

    expandedKeys: string[];

    expandAll = false;

    options: any = {
        draggable: true,
        checkable: true,
        multiple: false,
        clickBehavior: 'default',
        beforeDragStart: (event: ThyDragDropEvent<ThyTreeNode>) => {
            return !event.item.title.includes('不可拖拽');
        }
    };

    dragDropSpy = jasmine.createSpy('drag drop');

    selectedKeys = ['000000000000000000000000'];

    onEvent() {}

    onDbClickEvent() {}

    dragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        this.dragDropSpy(event);
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
        <div style="height: 300px">
            <thy-tree #tree [thyCheckable]="true" [thyMultiple]="true" [thyShowExpand]="true" [thyCheckable]="true" [(ngModel)]="mockData">
                <ng-template #treeNodeTemplate let-node="node" let-data="origin">
                    <thy-icon [thyIconName]="node?.isExpanded ? 'folder-open-fill' : 'folder-fill'"></thy-icon>
                    <div class="thy-tree-node-title text-truncate" thyFlexibleText [thyTooltipContent]="data?.title">
                        {{ data?.name }} <span class="text-desc ml-1">( {{ data.member_count || 0 }}人 )</span>
                    </div>
                </ng-template>
            </thy-tree>
        </div>
    `,
    imports: [ThyTree, ThyIcon, ThyFlexibleText, FormsModule]
})
class TestMultipleTreeComponent {
    mockData = JSON.parse(JSON.stringify(treeNodes));

    readonly tree = viewChild<ThyTree>('tree');

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
            (thyOnExpandChange)="onExpandChange($event)">
        </thy-tree>
    `,
    imports: [ThyTree, FormsModule]
})
class TestAsyncTreeComponent {
    mockData = treeNodes;

    treeNodes = this.mockData.map(item => {
        return { ...item, children: [], expanded: false };
    });

    readonly treeComponent = viewChild<ThyTree>('tree');

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

@Component({
    selector: 'test-virtual-scrolling-tree',
    template: `
        <div style="height: 300px">
            <thy-tree
                #tree
                [thyNodes]="mockData"
                [thyVirtualScroll]="true"
                [thyCheckable]="true"
                [thyItemSize]="44"
                [thyDraggable]="true"
                (thyOnDragDrop)="onDragDrop($event)">
            </thy-tree>
        </div>
    `,
    imports: [ThyTree, FormsModule]
})
class TestVirtualScrollingTreeComponent implements OnInit {
    mockData = bigTreeNodes;

    readonly treeComponent = viewChild<ThyTree>('tree');

    setNodeItemClass(className: string, index: number): void {
        this.mockData[index].itemClass = className;
        this.mockData = [...this.mockData];
    }

    constructor() {}

    ngOnInit(): void {
        this.setNodeItemClass('node-test', 0);
    }

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

@Component({
    selector: 'test-drag-drop-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thyDraggable]="true"
            [thyBeforeDragStart]="beforeDragStart"
            [thyBeforeDragDrop]="beforeDragDrop"
            (thyOnDragDrop)="onDragDrop($event)">
        </thy-tree>
    `,
    imports: [ThyTree, FormsModule]
})
class TestDragDropTreeComponent {
    treeNodes = [
        {
            key: '001',
            title: '001',
            expanded: true,
            children: [
                {
                    key: '001-01',
                    title: '001-01',
                    expanded: true,
                    children: [
                        {
                            key: '001-01-01',
                            title: '001-01-01'
                        }
                    ]
                }
            ]
        },
        {
            key: '002',
            title: '002',
            disabled: true
        },
        {
            key: '003',
            title: '003'
        }
    ];

    readonly treeComponent = viewChild<ThyTree>('tree');

    constructor() {}

    beforeDragDrop(event: ThyTreeBeforeDragDropContext) {
        return true;
    }

    beforeDragStart(event: ThyTreeBeforeDragStartContext) {
        return true;
    }

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

@Component({
    selector: 'test-has-checked-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="hasCheckTreeNodes"
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
            (thyOnDragDrop)="dragDrop($event)"
            (thyOnClick)="onEvent()"
            (thyOnCheckboxChange)="onEvent()"
            (thyOnExpandChange)="onEvent()">
            <ng-template #treeNodeTemplate let-node="node" let-data="origin">
                @if (data.type !== 'member') {
                    <thy-icon class="thy-tree-node-icon" [thyIconName]="node?.isExpanded ? 'folder-open-fill' : 'folder-fill'"></thy-icon>
                }
                <div class="thy-tree-node-title text-truncate" thyFlexibleText [thyTooltipContent]="data?.title">
                    {{ data?.name }} <span class="text-desc ml-1">( {{ data.member_count || 0 }}人 )</span>
                </div>
            </ng-template>
        </thy-tree>
    `,
    imports: [ThyTree, ThyIcon, ThyFlexibleText, FormsModule]
})
class TestHasCheckedTreeComponent {
    readonly tree = viewChild<ThyTree>('tree');

    // mock 不可变数据
    hasCheckTreeNodes = JSON.parse(JSON.stringify(hasCheckTreeNodes));

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

    dragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        this.dragDropSpy(event);
    }

    addNode() {
        // mock 不可变数据
        this.hasCheckTreeNodes = JSON.parse(JSON.stringify(hasCheckTreeNodes));
        this.hasCheckTreeNodes[0].children = [
            ...this.hasCheckTreeNodes[0].children,
            {
                key: new Date().getTime(),
                title: '测试'
            }
        ];
    }
}

function startDragging(fixture: ComponentFixture<any>, element: Element, x?: number, y?: number) {
    dispatchMouseEvent(element, 'mousedown', x, y);
    fixture.detectChanges();

    dispatchMouseEvent(document, 'mousemove', x, y);
    fixture.detectChanges();
}

function dargNode(fixture: ComponentFixture<any>, startNode: HTMLElement, targetNode: HTMLElement, dropPosition: ThyTreeDropPosition) {
    startDragging(fixture, startNode, 10, 10);

    const targetClientRect = targetNode.getBoundingClientRect();
    let targetClientY = 0;
    if (dropPosition === ThyTreeDropPosition.before) {
        targetClientY = targetClientRect.top;
    } else if (dropPosition === ThyTreeDropPosition.in) {
        targetClientY = targetClientRect.top + targetClientRect.height / 2 - 1;
    } else {
        targetClientY = targetClientRect.top + targetClientRect.height - 1;
    }

    dispatchMouseEvent(targetNode, 'mousemove', targetClientRect.left, targetClientY);
    fixture.detectChanges();

    dispatchMouseEvent(targetNode, 'mouseup', targetClientRect.left, targetClientY);
    fixture.detectChanges();

    tick();
}
