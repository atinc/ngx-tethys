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
    Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTreeSelectNode, ThyTreeSelectType } from './tree-select.class';
import { isObject, isArray } from '../util/helpers';
import { Observable, of } from 'rxjs';
import { CdkOverlayOrigin, CdkConnectedOverlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import { getFlexiblePositions } from '../core/overlay';
import { ThyTreeNode } from '../tree/tree-node.class';

import { take } from 'rxjs/operators';
import { produce } from '../util';
import { warnDeprecation } from '../core';

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
    ]
})
export class ThyTreeSelectComponent implements OnInit, ControlValueAccessor {
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

    public cdkConnectOverlayWidth = 0;

    public positions: ConnectionPositionPair[];

    public icons: { expand: string; collapse: string; gap?: number } = {
        expand: 'angle-down',
        collapse: 'angle-right',
        gap: 15
    };

    private initialled = false;

    public valueIsObject = false;

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
        if (this.initialled) {
            this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
            this.setSelectedNodes();
        }
    }

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

    @Input()
    set thyIconType(type: ThyTreeSelectType) {
        warnDeprecation('This parameter has been deprecation');
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

    constructor(public elementRef: ElementRef, public renderer: Renderer2, private ngZone: NgZone) {}

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target) && this.expandTreeSelectOptions) {
            this.expandTreeSelectOptions = false;
        }
    }

    ngOnInit() {
        this.positions = getFlexiblePositions('bottom', 4);
        this.isMulti = this.thyMultiple;
        this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
        this.setSelectedNodes();
        this.initialled = true;
        this.init();
    }

    get selectedValueObject() {
        return this.thyMultiple ? this.selectedNodes : this.selectedNode;
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

    removeMultipleSelectedNode(event: { item: ThyTreeSelectNode; $event: Event }) {
        this.removeSelectedNode(event.item, event.$event);
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
