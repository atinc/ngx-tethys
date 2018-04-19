import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation, TemplateRef, OnInit, EventEmitter, ContentChild
} from '@angular/core';

@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeComponent implements OnInit {

    @Input() thyNodes: any[];

    @Input() thyLevel = 0;

    @Input() thyChildrenPropName = 'children';

    @Input()
    set thyTemplate(value: TemplateRef<any>) {
        if (value) {
            this.templateRef = value;
        }
    }

    @ContentChild('treeNodeTemplate') templateRef: TemplateRef<any>;

    ngOnInit(): void {
    }

    public createNodeContext(node: any) {
        return {
            $implicit: node,
            node: node,
            level: this.thyLevel
        };
    }
}

