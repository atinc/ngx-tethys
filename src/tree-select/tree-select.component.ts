import {
    Component,
    Input,
    Output,
    OnInit,
    forwardRef,
    HostBinding,
    ContentChild,
    TemplateRef,
    EventEmitter,
    ElementRef,
    HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTreeSelectNode } from './tree-select.class';
import { isObject, isArray } from 'util';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

@Component({
    selector: 'thy-tree-select',
    templateUrl: './tree-select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ThyTreeSelectComponent),
        multi: true
    }]
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

    public selectedNodes: ThyTreeSelectNode[];

    public flattenTreeNodes: ThyTreeSelectNode[] = [];

    private isInit = true;

    private valueIsObject = false;

    @ContentChild('thyTreeSelectTriggerDisplay') thyTreeSelectTriggerDisplayRef: TemplateRef<any>;

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

    @Input() thyAllowClear: boolean;

    @Input() thyMultiple = false;

    @Input() thyDisable = false;

    @Input() thyPlaceholder = '请选择节点';

    @Input() thySize: InputSize;

    @Input() thyEmptyOptionsText = '暂时没有数据可选';

    @Input() thyHiddenNodeKey = 'hidden';

    @Input() thyDisableNodeKey = 'disabled';

    @Input() thyAsyncNode = false;

    @Input() thyHiddenNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden;

    @Input() thyDisableNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disable;

    @Input() thyGetNodeChildren: (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([]);

    // TODO: 是否可以取消选中的node
    // @Input() thyUnRemoveSelectedNodeFn: Function;

    public onModelChange: Function = () => {

    }

    public onModelTouch: Function = () => {

    }

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
        public elementRef: ElementRef
    ) { }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.expandTreeSelectOptions = false;
        }
    }

    ngOnInit() {
        this.isMulti = this.thyMultiple;
    }

    private flattenNodes(
        nodes: ThyTreeSelectNode[] = [],
        resultNodes: ThyTreeSelectNode[] = [],
        parentPrimaryValue: string[] = []): ThyTreeSelectNode[] {
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
                    if ((this.selectedValue.keys()).includes(this.thyPrimaryKey)) {
                        this.selectedNode = this._findTreeNode(this.selectedValue[this.thyPrimaryKey]);
                    }
                } else {
                    this.selectedNode = this._findTreeNode(this.selectedValue);
                }
            }

        }
    }

    openSelectPop(event: Event) {
        event.stopPropagation();
        if (this.thyDisable) {
            return;
        }
        this.expandTreeSelectOptions = !this.expandTreeSelectOptions;
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
            this.selectedValue = this.thyMultiple ?
                this.selectedNodes.map(item => item[this.thyPrimaryKey]) : this.selectedNode[this.thyPrimaryKey];
        }
        this.onModelChange(this.selectedValue);
    }

    // thyMultiple = true 时，移除数据时调用
    removeSelectedNode(node: ThyTreeSelectNode, event?: Event, ) {
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
        } else {
            if (this.selectedNodes.find((item) => {
                return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
            })) {
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
                this.flattenTreeNodes = this.flattenNodes(data, this.flattenTreeNodes, [...node.parentValues, node[this.thyPrimaryKey]]);
                node.children = data;
            });
        }
    }

}
