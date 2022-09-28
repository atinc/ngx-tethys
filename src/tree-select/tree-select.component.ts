import { getFlexiblePositions, ThyClickDispatcher } from 'ngx-tethys/core';
import { ThyTreeNode } from 'ngx-tethys/tree';
import { isArray, isObject, produce, warnDeprecation } from 'ngx-tethys/util';
import { Observable, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { coerceArray, isFunction } from 'ngx-tethys/util';

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair, ViewportRuler } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThyTreeSelectNode, ThyTreeSelectType } from './tree-select.class';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

type FlattenAllNodesCb = (treeNode: ThyTreeSelectNode) => boolean;

export function filterTreeData(treeNodes: ThyTreeSelectNode[], searchText: string, searchKey: string = 'name') {
    const filterNodes = (node: ThyTreeSelectNode, result: ThyTreeSelectNode[]) => {
        if (node[searchKey] && node[searchKey].indexOf(searchText) !== -1) {
            result.push(node);
            return result;
        }
        if (Array.isArray(node.children)) {
            const nodes = node.children.reduce((previous, current) => filterNodes(current, previous), [] as ThyTreeSelectNode[]);
            if (nodes.length) {
                const parentNode = { ...node, children: nodes, expand: true };
                result.push(parentNode);
            }
        }
        return result;
    };
    const treeData = treeNodes.reduce((previous, current) => filterNodes(current, previous), [] as ThyTreeSelectNode[]);
    return treeData;
}
@Component({
    selector: 'thy-tree-select',
    templateUrl: './tree-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeSelectComponent),
            multi: true
        }
    ]
})
export class ThyTreeSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @HostBinding('class.thy-select-custom') treeSelectClass = true;

    @HostBinding('class.thy-select') isTreeSelect = true;

    // 菜单是否展开
    @HostBinding('class.menu-is-opened') expandTreeSelectOptions = false;

    @HostBinding('class.thy-select-custom--multiple') isMulti = false;

    public treeNodes: ThyTreeSelectNode[];

    public selectedValue: any;

    public selectedNode: ThyTreeSelectNode;

    public selectedNodes: ThyTreeSelectNode[] = [];

    public flattenTreeNodes: ThyTreeSelectNode[] = [];

    virtualTreeNodes: ThyTreeSelectNode[] = [];

    public cdkConnectOverlayWidth = 0;

    public positions: ConnectionPositionPair[];

    public icons: { expand: string; collapse: string; gap?: number } = {
        expand: 'angle-down',
        collapse: 'angle-right',
        gap: 15
    };

    private initialled = false;

    private destroy$ = new Subject<void>();

    public valueIsObject = false;

    originTreeNodes: ThyTreeSelectNode[];

    @ContentChild('thyTreeSelectTriggerDisplay')
    thyTreeSelectTriggerDisplayRef: TemplateRef<any>;

    @ContentChild('treeNodeTemplate')
    treeNodeTemplateRef: TemplateRef<any>;

    @ViewChild(CdkOverlayOrigin, { static: true }) cdkOverlayOrigin: CdkOverlayOrigin;

    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('customDisplayTemplate', { static: true }) customDisplayTemplate: TemplateRef<any>;

    @Input()
    set thyTreeNodes(value: ThyTreeSelectNode[]) {
        this.treeNodes = value;
        this.originTreeNodes = value;
        if (this.initialled) {
            this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
            this.setSelectedNodes();
        }
    }

    @Input() thyVirtualHeight: string | null = null;

    @Input() thyPrimaryKey = '_id';

    @Input() thyShowKey = 'name';

    @Input() thyChildCountKey = 'childCount';

    @Input() thyAllowClear: boolean;

    @Input() thyMultiple = false;

    @Input() thyDisable = false;

    @Input() thyPlaceholder = '请选择节点';

    get placeholder() {
        return this.thyPlaceholder;
    }

    @Input() thySize: InputSize;

    @Input() thyEmptyOptionsText = '暂时没有数据可选';

    @Input() thyHiddenNodeKey = 'hidden';

    @Input() thyDisableNodeKey = 'disabled';

    @Input() thyAsyncNode = false;

    @Input() thyShowWholeName = false;

    @Input() thyShowSearch = false;

    @Input()
    set thyIconType(type: ThyTreeSelectType) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation('This parameter has been deprecation');
        }
        // if (type === 'especial') {
        //     this.icons = { expand: 'minus-square', collapse: 'plus-square', gap: 20 };
        // } else {
        //     this.icons = { expand: 'caret-right-down', collapse: 'caret-right', gap: 15 };
        // }
    }

    @Input() thyHiddenNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden;

    @Input() thyDisableNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled;

    @Input() thyGetNodeChildren: (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([]);

    // TODO: 是否可以取消选中的node
    // @Input() thyUnRemoveSelectedNodeFn: Function;

    public onModelChange: Function = () => {};

    public onModelTouch: Function = () => {};

    private _getNgModelType() {
        if (this.thyMultiple) {
            this.valueIsObject = !this.selectedValue[0] || isObject(this.selectedValue[0]);
        } else {
            this.valueIsObject = isObject(this.selectedValue);
        }
    }
    public syncFlattenTreeNodes() {
        this.virtualTreeNodes = this.getParallelTreeNodes(this.treeNodes, false);
        console.log(this.virtualTreeNodes, 'this.virtualTreeNodes');
        return this.virtualTreeNodes;
    }

    getParallelTreeNodes(rootTrees: ThyTreeSelectNode[] = [], flattenAllNodes: boolean | FlattenAllNodesCb = true) {
        const flattenTreeData: ThyTreeSelectNode[] = [];
        function _getParallelTreeNodes(list: ThyTreeSelectNode[]) {
            return list.forEach((treeNode, index) => {
                flattenTreeData.push(treeNode);
                const flattenAllNodesFlag = isFunction(flattenAllNodes) ? flattenAllNodes(treeNode) : flattenAllNodes;
                if (flattenAllNodesFlag || treeNode.expand) {
                    _getParallelTreeNodes(treeNode.children);
                }
            });
        }
        _getParallelTreeNodes(rootTrees);
        return flattenTreeData;
    }

    writeValue(value: any): void {
        this.selectedValue = value;

        if (value) {
            this._getNgModelType();
        }
        this.setSelectedNodes();
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouch = fn;
    }

    constructor(
        public elementRef: ElementRef,
        public renderer: Renderer2,
        private ngZone: NgZone,
        private ref: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: string,
        private thyClickDispatcher: ThyClickDispatcher,
        private viewportRuler: ViewportRuler
    ) {}

    ngOnInit() {
        this.positions = getFlexiblePositions('bottom', 4);
        this.isMulti = this.thyMultiple;
        this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
        this.setSelectedNodes();
        this.initialled = true;

        this.syncFlattenTreeNodes();

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    event.stopPropagation();
                    if (!this.elementRef.nativeElement.contains(event.target) && this.expandTreeSelectOptions) {
                        this.ngZone.run(() => {
                            this.expandTreeSelectOptions = false;
                            this.ref.markForCheck();
                        });
                    }
                });
        }
        this.viewportRuler
            .change()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.init();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    get selectedValueObject() {
        return this.thyMultiple ? this.selectedNodes : this.selectedNode;
    }

    searchValue(searchText: string) {
        this.treeNodes = filterTreeData(this.originTreeNodes, searchText.trim(), this.thyShowKey);
    }

    public setPosition() {
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
                this.cdkConnectedOverlay.overlayRef.updatePosition();
            });
    }

    private init() {
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }

    private flattenNodes(
        nodes: ThyTreeSelectNode[] = [],
        resultNodes: ThyTreeSelectNode[] = [],
        parentPrimaryValue: string[] = []
    ): ThyTreeSelectNode[] {
        resultNodes = resultNodes.concat(nodes);
        let nodesLeafs: ThyTreeSelectNode[] = [];
        (nodes || []).forEach(item => {
            item.parentValues = parentPrimaryValue;
            item.level = item.parentValues.length;
            if (item.children && isArray(item.children)) {
                const nodeLeafs = this.flattenNodes(item.children, resultNodes, [...parentPrimaryValue, item[this.thyPrimaryKey]]);
                nodesLeafs = [...nodesLeafs, ...nodeLeafs];
            }
        });
        return [...nodes, ...nodesLeafs];
    }

    private tree2list = (tree: ThyTreeSelectNode[] = []) => {
        let node: ThyTreeSelectNode,
            list = [];
        while ((node = tree.shift())) {
            node.level = node.level || 0;
            node.expand = true;
            list.push(node);
            if (node.children) {
                tree.unshift(...node.children.map(item => ({ ...item, level: node.level + 1, expand: true, parentValues: [node._id] })));
            }
        }
        return list;
    };

    private _findTreeNode(value: string): ThyTreeSelectNode {
        return (this.flattenTreeNodes || []).find(item => item[this.thyPrimaryKey] === value);
    }

    private setSelectedNodes() {
        if (this.selectedValue) {
            // 多选数据初始化
            if (this.thyMultiple) {
                if (this.selectedValue.length > 0) {
                    if (this.valueIsObject && Object.keys(this.selectedValue[0]).indexOf(this.thyPrimaryKey) >= 0) {
                        this.selectedNodes = this.selectedValue.map((item: any) => {
                            return this._findTreeNode(item[this.thyPrimaryKey]);
                        });
                    } else {
                        this.selectedNodes = this.selectedValue.map((item: any) => {
                            return this._findTreeNode(item);
                        });
                    }
                }
            } else {
                // 单选数据初始化
                if (this.valueIsObject) {
                    if (Object.keys(this.selectedValue).indexOf(this.thyPrimaryKey) >= 0) {
                        this.selectedNode = this._findTreeNode(this.selectedValue[this.thyPrimaryKey]);
                    }
                } else {
                    this.selectedNode = this._findTreeNode(this.selectedValue);
                }
            }
        } else {
            this.selectedNodes = [];
            this.selectedNode = null;
        }
    }

    openSelectPop() {
        if (this.thyDisable) {
            return;
        }
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.expandTreeSelectOptions = !this.expandTreeSelectOptions;
    }

    close() {
        this.expandTreeSelectOptions = false;
    }

    clearSelectedValue(event: Event) {
        event.stopPropagation();
        this.selectedValue = null;
        this.selectedNode = null;
        this.selectedNodes = [];
        this.onModelChange(this.selectedValue);
    }

    private _changeSelectValue() {
        if (this.valueIsObject) {
            this.selectedValue = this.thyMultiple ? this.selectedNodes : this.selectedNode;
        } else {
            this.selectedValue = this.thyMultiple
                ? this.selectedNodes.map(item => item[this.thyPrimaryKey])
                : this.selectedNode[this.thyPrimaryKey];
        }
        this.onModelChange(this.selectedValue);
    }

    removeMultipleSelectedNode(event: { item: ThyTreeSelectNode; $eventOrigin: Event }) {
        this.removeSelectedNode(event.item, event.$eventOrigin);
    }

    // thyMultiple = true 时，移除数据时调用
    removeSelectedNode(node: ThyTreeSelectNode, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.thyDisable) {
            return;
        }
        if (this.thyMultiple) {
            this.selectedNodes = produce(this.selectedNodes).remove((item: ThyTreeSelectNode) => {
                return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
            });
            this._changeSelectValue();
        }
    }

    selectNode(node: ThyTreeSelectNode) {
        if (!this.thyMultiple) {
            this.selectedNode = node;
            this.expandTreeSelectOptions = false;
        } else {
            if (
                this.selectedNodes.find(item => {
                    return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
                })
            ) {
                this.removeSelectedNode(node);
            } else {
                this.selectedNodes = produce(this.selectedNodes).add(node);
            }
        }
        this._changeSelectValue();
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        const result = this.thyGetNodeChildren(node);
        if (result && result.subscribe) {
            result.pipe().subscribe((data: ThyTreeSelectNode[]) => {
                const nodes = this.flattenNodes(data, this.flattenTreeNodes, [...node.parentValues, node[this.thyPrimaryKey]]);
                const otherNodes = nodes.filter((item: ThyTreeNode) => {
                    return !this.flattenTreeNodes.find(hasItem => {
                        return hasItem[this.thyPrimaryKey] === item[this.thyPrimaryKey];
                    });
                });
                this.flattenTreeNodes = [...this.flattenTreeNodes, ...otherNodes];
                node.children = data;
            });
            return result;
        }
    }
}

@Component({
    selector: 'thy-tree-select-nodes',
    templateUrl: './tree-select-nodes.component.html'
})
export class ThyTreeSelectNodesComponent implements OnInit {
    @HostBinding('class') class: string;

    @Input() treeNodes: ThyTreeSelectNode[];

    @Input() thyVirtualHeight: string | null = null;

    public primaryKey = this.parent.thyPrimaryKey;

    public showKey = this.parent.thyShowKey;

    public isMultiple = this.parent.thyMultiple;

    public valueIsObject = this.parent.valueIsObject;

    public selectedValue = this.parent.selectedValue;

    public childCountKey = this.parent.thyChildCountKey;

    public treeNodeTemplateRef = this.parent.treeNodeTemplateRef;

    constructor(public parent: ThyTreeSelectComponent) {}

    ngOnInit() {
        this.class = this.isMultiple ? 'thy-tree-select-dropdown thy-tree-select-dropdown-multiple' : 'thy-tree-select-dropdown';
    }

    treeNodeIsSelected(node: ThyTreeSelectNode) {
        if (this.parent.thyMultiple) {
            return (this.parent.selectedNodes || []).find(item => {
                return item[this.primaryKey] === node[this.primaryKey];
            });
        } else {
            return this.parent.selectedNode && this.parent.selectedNode[this.primaryKey] === node[this.primaryKey];
        }
    }

    treeNodeIsHidden(node: ThyTreeSelectNode) {
        if (this.parent.thyHiddenNodeKey) {
            return node[this.parent.thyHiddenNodeKey];
        }
        if (this.parent.thyHiddenNodeFn) {
            return this.parent.thyHiddenNodeFn(node);
        }
        return false;
    }

    treeNodeIsDisable(node: ThyTreeSelectNode) {
        if (this.parent.thyDisableNodeKey) {
            return node[this.parent.thyDisableNodeKey];
        }
        if (this.parent.thyDisableNodeFn) {
            return this.parent.thyDisableNodeFn(node);
        }
        return false;
    }

    treeNodeIsExpand(node: ThyTreeSelectNode) {
        let isSelectedNodeParent = false;
        if (this.parent.thyMultiple) {
            isSelectedNodeParent = !!(this.parent.selectedNodes || []).find(item => {
                return item.parentValues.indexOf(node[this.primaryKey]) > -1;
            });
        } else {
            isSelectedNodeParent = this.parent.selectedNode
                ? this.parent.selectedNode.parentValues.indexOf(node[this.primaryKey]) > -1
                : false;
        }
        const isExpand = node.expand || (Object.keys(node).indexOf('expand') < 0 && isSelectedNodeParent);
        node.expand = isExpand;
        return isExpand;
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        return this.parent.getNodeChildren(node);
    }

    selectTreeNode(event: Event, node: ThyTreeSelectNode) {
        if (!this.treeNodeIsDisable(node)) {
            this.parent.selectNode(node);
        }
    }

    nodeExpandToggle(event: Event, node: ThyTreeSelectNode) {
        event.stopPropagation();
        if (Object.keys(node).indexOf('expand') > -1) {
            node.expand = !node.expand;
        } else {
            if (this.treeNodeIsExpand(node)) {
                node.expand = false;
            } else {
                node.expand = true;
            }
        }

        if (node.expand && this.parent.thyAsyncNode) {
            this.getNodeChildren(node).subscribe(() => {
                this.parent.setPosition();
            });
        }
        this.thyVirtualHeight && this.parent.syncFlattenTreeNodes();
        this.parent.setPosition();
    }

    tabTrackBy(index: number, item: ThyTreeSelectNode) {
        return index;
    }
}
