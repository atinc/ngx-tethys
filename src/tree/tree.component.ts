import {
    Component,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    TemplateRef,
    OnInit,
    OnChanges,
    EventEmitter,
    ContentChild,
    HostBinding,
    forwardRef,
    SimpleChanges
} from '@angular/core';
import { ThyTreeNodeData, ThyTreeEmitEvent, ThyTreeDragDropEvent, ThyTreeIcons, ThyTreeNodeCheckState } from './tree.class';
import { helpers } from '../util';
import { ThyTreeService } from './tree.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ThyDragDropEvent, ThyDropPosition, ThyDragOverEvent, ThyDragStartEvent } from '../drag-drop/drag-drop.class';
import { ThyTreeNode } from './tree-node.class';

type ThyTreeSize = 'sm' | '';

type ThyTreeType = 'default' | 'especial';

const treeTypeClassMap: any = {
    default: ['thy-tree-default'],
    especial: ['thy-tree-especial']
};

@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeComponent),
            multi: true
        },
        ThyTreeService,
        UpdateHostClassService
    ]
})
export class ThyTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _expandedKeys: (string | number)[];

    private _selectedKeys: (string | number)[];

    public _selectionModel: SelectionModel<ThyTreeNode>;

    public treeNodes: ThyTreeNode[];

    @Input()
    set thyNodes(value: ThyTreeNodeData[]) {
        this._expandedKeys = this.getExpandedNodes().map(node => node.key);
        this._selectedKeys = this.getSelectedNodes().map(node => node.key);
        this.treeNodes = (value || []).map(node => new ThyTreeNode(node, null, this.thyTreeService));
        this.thyTreeService.treeNodes = this.treeNodes;
        this.thyTreeService.expandTreeNodes(this._expandedKeys);
        this._selectTreeNodes(this._selectedKeys);
    }

    @Input() thyShowExpand: boolean | ((_: ThyTreeNodeData) => boolean) = true;

    @HostBinding(`class.thy-multiple-selection-list`)
    @Input()
    thyMultiple = false;

    @HostBinding('class.thy-tree-draggable')
    @Input()
    set thyDraggable(value: boolean) {
        this._draggable = value;
    }

    get thyDraggable() {
        return this._draggable;
    }
    @Input() thyShowDragIcon = true;

    @Input() thyCheckable: boolean;

    @Input() set thyCheckStateResolve(resolve: (node: ThyTreeNode) => ThyTreeNodeCheckState) {
        this.thyTreeService.setCheckStateResolve(resolve);
    }

    @Input() thyAsync = false;

    private _thyType: ThyTreeType = 'default';

    @Input()
    set thyType(type: ThyTreeType) {
        this._thyType = type;
        if (type === 'especial') {
            this.thyIcons = { expand: 'minus-square', collapse: 'plus-square' };
        }
    }

    get thyType() {
        return this._thyType;
    }

    @Input() thyIcons: ThyTreeIcons = {};

    @Input() thySize: ThyTreeSize;

    @Input() thyTitleTruncate = true;

    @Input() set thySelectedKeys(keys: string[]) {
        this._selectedKeys = keys;
    }

    @Input() thyBeforeDragStart: (e: ThyDragStartEvent) => boolean;

    @Input() thyBeforeDragDrop: (e: ThyDragDropEvent) => boolean;

    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnCheckboxChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnDragDrop: EventEmitter<ThyTreeDragDropEvent> = new EventEmitter<ThyTreeDragDropEvent>();

    @ContentChild('treeNodeTemplate', { static: true })
    set templateRef(template: TemplateRef<any>) {
        if (template) {
            this._templateRef = template;
        }
    }

    get templateRef() {
        return this._templateRef;
    }

    @ContentChild('emptyChildrenTemplate', { static: true }) emptyChildrenTemplate: TemplateRef<any>;
    set emptyChildrenTemplateRef(template: TemplateRef<any>) {
        if (template) {
            this._emptyChildrenTemplateRef = template;
        }
    }

    get emptyChildrenTemplateRef() {
        return this._emptyChildrenTemplateRef;
    }

    @HostBinding('class.thy-tree') thyTreeClass = true;

    beforeDragOver = (event: ThyDragOverEvent<ThyTreeNode>) => {
        return this.isShowExpand(event.item) || (!this.isShowExpand(event.item) && event.position !== ThyDropPosition.in);
    };

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        public thyTreeService: ThyTreeService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyType && !changes.thyType.isFirstChange()) {
            this._setTreeType();
        }
        if (changes.thyMultiple && !changes.thyMultiple.isFirstChange()) {
            this._instanceSelectionModel();
        }
    }

    ngOnInit(): void {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
        this._setTreeType();
        this._setTreeSize();
        this._instanceSelectionModel();
        this._selectTreeNodes(this._selectedKeys);
    }

    private _setTreeType() {
        if (this.thyType) {
            this.updateHostClassService.addClass(treeTypeClassMap[this.thyType]);
        }
    }

    private _setTreeSize() {
        if (this.thySize) {
            this.updateHostClassService.addClass(`thy-tree-${this.thySize}`);
        }
    }

    private _instanceSelectionModel() {
        this._selectionModel = new SelectionModel<any>(this.thyMultiple);
    }

    private _selectTreeNodes(keys: (string | number)[]) {
        (keys || []).forEach(key => {
            const node = this.thyTreeService.getTreeNode(key);
            if (node) {
                this.selectTreeNode(this.thyTreeService.getTreeNode(key));
            }
        });
    }

    public isSelected(node: ThyTreeNode) {
        return this._selectionModel.isSelected(node);
    }

    public toggleTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this._selectionModel.toggle(node);
        }
    }

    public trackByFn(index: number, item: any) {
        return item.key || index;
    }

    public onDragStart(event: ThyDragStartEvent<ThyTreeNode>) {
        if (this.isShowExpand(event.item) && event.item.isExpanded) {
            event.item.setExpanded(false);
        }
    }

    public onDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        if (!this.isShowExpand(event.item) && event.position === ThyDropPosition.in) {
            return;
        }
        const parent = event.previousItem.parentNode;
        if (parent) {
            parent.children = parent.children.filter(item => item !== event.previousItem);
        } else {
            this.treeNodes = this.treeNodes.filter(item => item !== event.previousItem);
        }
        switch (event.position) {
            case ThyDropPosition.in:
                event.item.addChildren(event.previousItem.origin);
                break;
            case ThyDropPosition.after:
            case ThyDropPosition.before:
                const targetParent = event.item.parentNode;
                const index = event.position === ThyDropPosition.before ? 0 : 1;
                if (targetParent) {
                    targetParent.addChildren(event.previousItem.origin, targetParent.children.indexOf(event.item) + index);
                } else {
                    this.treeNodes.splice(this.treeNodes.indexOf(event.item) + index, 0, event.previousItem);
                }
                break;
        }
        this.thyTreeService.resetSortedTreeNodes(this.treeNodes);

        let afterNode = null;
        let targetNode = null;
        if (event.position === ThyDropPosition.before) {
            afterNode = event.containerItems[event.currentIndex - 1];
            targetNode = event.item.parentNode;
        } else if (event.position === ThyDropPosition.after) {
            afterNode = event.containerItems[event.currentIndex];
            targetNode = event.item.parentNode;
        } else {
            afterNode = event.item.children[event.item.children.length - 2];
            targetNode = event.item;
        }
        this.thyOnDragDrop.emit({
            event,
            currentIndex: event.currentIndex,
            dragNode: event.previousItem,
            targetNode: targetNode,
            afterNode: afterNode
        });
    }

    public isShowExpand(node: ThyTreeNode) {
        if (helpers.isFunction(this.thyShowExpand)) {
            return (this.thyShowExpand as Function)(node);
        } else {
            return this.thyShowExpand;
        }
    }

    writeValue(value: ThyTreeNodeData[]): void {
        this.thyNodes = value;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    // region Public Functions

    public selectTreeNode(node: ThyTreeNode) {
        this._selectionModel.select(node);
    }

    public getRootNodes(): ThyTreeNode[] {
        return this.treeNodes;
    }

    public getTreeNode(key: string) {
        return this.thyTreeService.getTreeNode(key);
    }

    public getSelectedNode(): ThyTreeNode {
        return this._selectionModel ? this._selectionModel.selected[0] : null;
    }

    public getSelectedNodes(): ThyTreeNode[] {
        return this._selectionModel ? this._selectionModel.selected : [];
    }

    public getExpandedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getExpandedNodes();
    }

    public getCheckedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getCheckedNodes();
    }

    public addTreeNode(node: ThyTreeNodeData, parent?: ThyTreeNode, index = -1) {
        if (parent) {
            parent.addChildren(node, index);
        } else {
            if (index > -1) {
                this.treeNodes.splice(index, 0, new ThyTreeNode(node, null, this.thyTreeService));
            } else {
                this.treeNodes.push(new ThyTreeNode(node, null, this.thyTreeService));
            }
        }
    }

    public deleteTreeNode(node: ThyTreeNode) {
        if (this.isSelected(node)) {
            this._selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
    }

    public expandAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(true, true));
    }

    public collapsedAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(false, true));
    }

    // endregion
}
