import {
    Component,
    Input,
    OnInit,
    forwardRef,
    HostBinding,
    ContentChild,
    TemplateRef,
    ElementRef,
    ViewChild,
    NgZone,
    HostListener,
    InjectionToken,
    Inject,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTreeSelectNode } from './tree-select.class';
import { isObject, isArray } from '../util/helpers';
import { Observable, of } from 'rxjs';
import {
    CdkOverlayOrigin,
    ConnectedOverlayPositionChange,
    ScrollStrategy,
    Overlay,
    ScrollDispatcher,
    CdkScrollable,
    CdkConnectedOverlay,
    ConnectionPositionPair
} from '@angular/cdk/overlay';
import { DEFAULT_4_POSITIONS, DEFAULT_DROPDOWN_POSITIONS, EXPANDED_DROPDOWN_POSITIONS } from '../core/overlay/overlay-opsition-map';
import { ThyTreeNode } from '../tree/tree.class';

import { $ } from '../typings';

const MAT_SELECT_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('MAT_SELECT_SCROLL_STRATEGY');

export function MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): ScrollStrategy {
    return overlay.scrollStrategies.reposition();
}

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

@Component({
    selector: 'thy-tree-select',
    templateUrl: './tree-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeSelectComponent),
            multi: true
        }
        // {
        //     provide: MAT_SELECT_SCROLL_STRATEGY,
        //     deps: [Overlay],
        //     useFactory: MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY
        // }
    ]
})
export class ThyTreeSelectComponent implements OnInit, ControlValueAccessor {
    @HostBinding('class.thy-select-custom') treeSelectClass = true;

    @HostBinding('class.thy-select') isTreeSelect = true;

    // 菜单是否展开
    @HostBinding('class.menu-is-opened') expandTreeSelectOptions = true;

    @HostBinding('class.thy-select-custom--multiple') isMulti = false;

    public treeNodes: ThyTreeSelectNode[];

    public selectedValue: any;

    public selectedNode: ThyTreeSelectNode;

    public selectedNodes: ThyTreeSelectNode[];

    public flattenTreeNodes: ThyTreeSelectNode[] = [];

    public cdkConnectOverlayWidth = 0;

    // public scrollStrategy: ScrollStrategy;

    public positions: ConnectionPositionPair[] = [...EXPANDED_DROPDOWN_POSITIONS];

    private isInit = true;

    public valueIsObject = false;

    private parentNodes: any;

    private cdkScrollables: CdkScrollable[] = [];

    @ContentChild('thyTreeSelectTriggerDisplay')
    thyTreeSelectTriggerDisplayRef: TemplateRef<any>;

    @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;

    @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;

    @Input()
    set thyTreeNodes(value: ThyTreeSelectNode[]) {
        this.treeNodes = value;
        if (!this.isInit && this.treeNodes && this.treeNodes.length > 0) {
            this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
            this._dataLoadingDoneFn();
        }
    }

    @Input() thyPrimaryKey = '_id';

    @Input() thyShowKey = 'name';

    @Input() thyChildCountKey = 'childCount';

    @Input() thyAllowClear: boolean;

    @Input() thyMultiple = false;

    @Input() thyDisable = false;

    @Input() thyPlaceholder = '请选择节点';

    @Input() thySize: InputSize;

    @Input() thyEmptyOptionsText = '暂时没有数据可选';

    @Input() thyHiddenNodeKey = 'hidden';

    @Input() thyDisableNodeKey = 'disabled';

    @Input() thyAsyncNode = false;

    @Input() thyShowWholeName = false;

    @Input() thyHiddenNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden;

    @Input() thyDisableNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disable;

    @Input() thyGetNodeChildren: (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([]);

    // TODO: 是否可以取消选中的node
    // @Input() thyUnRemoveSelectedNodeFn: Function;

    public onModelChange: Function = () => {};

    public onModelTouch: Function = () => {};

    private _getNgModelType() {
        if (this.thyMultiple) {
            this.valueIsObject = this.selectedValue[0] && isObject(this.selectedValue[0]);
        } else {
            this.valueIsObject = isObject(this.selectedValue);
        }
    }

    writeValue(value: any): void {
        this.selectedValue = value;
        if (this.isInit) {
            this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes);
            this.isInit = false;
        }
        if (value) {
            this._getNgModelType();
            this._dataLoadingDoneFn();
        }
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
        private overlay: Overlay,
        // @Inject(MAT_SELECT_SCROLL_STRATEGY) scrollStrategy: any,
        private scrollDispatcher: ScrollDispatcher
    ) {
        // this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target) && this.expandTreeSelectOptions) {
            this.expandTreeSelectOptions = false;
            this.deregisterInScrollDispatcher();
        }
    }

    ngOnInit() {
        this.isMulti = this.thyMultiple;
        this.expandTreeSelectOptions = false;
        this.init();
    }

    private init() {
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }

    private registerInScrollDispatcher() {
        this.parentNodes = $(this.elementRef.nativeElement).parents();
        for (let i = 0; i < this.parentNodes.length; i++) {
            if (this.parentNodes[i]) {
                if (this.parentNodes[i].scrollHeight > this.parentNodes[i].clientHeight) {
                    const cdkScrollable: CdkScrollable = new CdkScrollable(
                        { nativeElement: this.parentNodes[i] },
                        this.scrollDispatcher,
                        this.ngZone
                    );
                    this.cdkScrollables.push(cdkScrollable);
                    this.scrollDispatcher.register(cdkScrollable);
                }
            }
        }
    }

    private deregisterInScrollDispatcher() {
        for (let i = 0; i < this.cdkScrollables.length; i++) {
            this.scrollDispatcher.deregister(this.cdkScrollables[i]);
        }
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

    private _findTreeNode(value: string): ThyTreeSelectNode {
        return (this.flattenTreeNodes || []).find(item => item[this.thyPrimaryKey] === value);
    }

    getShowNodeName() {
        if (this.thyShowWholeName) {
            let wholeName = '';
            (this.selectedNode.parentValues || []).forEach((item: string, index: number) => {
                const node = this._findTreeNode(item);
                wholeName = `${wholeName}${node[this.thyShowKey]} > `;
            });
            return `${wholeName}${this.selectedNode[this.thyShowKey]}`;
        } else {
            return this.selectedNode[this.thyShowKey];
        }
    }

    private _dataLoadingDoneFn() {
        if (this.selectedValue) {
            // 多选数据初始化
            if (this.thyMultiple) {
                if (this.selectedValue.length > 0) {
                    if (this.valueIsObject && this.selectedValue[0].keys().includes(this.thyPrimaryKey)) {
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
                    if (this.selectedValue.keys().includes(this.thyPrimaryKey)) {
                        this.selectedNode = this._findTreeNode(this.selectedValue[this.thyPrimaryKey]);
                    }
                } else {
                    this.selectedNode = this._findTreeNode(this.selectedValue);
                }
            }
        }
    }

    openSelectPop() {
        if (this.thyDisable) {
            return;
        }
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.expandTreeSelectOptions = !this.expandTreeSelectOptions;
        if (this.expandTreeSelectOptions) {
            this.registerInScrollDispatcher();
        }
    }

    close() {
        this.expandTreeSelectOptions = false;
        this.deregisterInScrollDispatcher();
    }

    // 单选 thyMultiple = false 时，清除数据时调用
    clearSelectedValue(event: Event) {
        event.stopPropagation();
        this.selectedValue = null;
        this.selectedNode = null;
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

    // thyMultiple = true 时，移除数据时调用
    removeSelectedNode(node: ThyTreeSelectNode, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.thyDisable) {
            return;
        }
        if (this.thyMultiple) {
            this.selectedNodes = this.selectedNodes.filter(item => {
                return item[this.thyPrimaryKey] !== node[this.thyPrimaryKey];
            });
            this._changeSelectValue();
        }
    }

    selectNode(node: ThyTreeSelectNode) {
        if (!this.thyMultiple) {
            this.selectedNode = node;
            this.expandTreeSelectOptions = false;
            this.deregisterInScrollDispatcher();
        } else {
            if (
                this.selectedNodes.find(item => {
                    return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
                })
            ) {
                this.removeSelectedNode(node);
            } else {
                this.selectedNodes.push(node);
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
        }
    }
}
