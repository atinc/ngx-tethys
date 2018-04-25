import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation, TemplateRef, OnInit,
    EventEmitter, ContentChild, ViewChild,
    ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { INHERITED_CLASS } from '@angular/core/src/reflection/reflection_capabilities';

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

    @Input()
    set thyInstance(value: any) {
        if (value) {
            this.thyNodes = value.node[this.thyChildrenPropName];
            this.thyLevel = value.level + 1;
            this.flexibleTemplateRef = value.template;
        }
    }

    @ContentChild('treeNodeTemplate') templateRef: TemplateRef<any>;

    @ContentChild('treeNodeFlexibleTemplate') flexibleTemplateRef: TemplateRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    ngOnInit(): void {
    }

    public createNodeContext(node: any) {
        const instance = {
            node: node,
            level: this.thyLevel,
            template: this.flexibleTemplateRef || this.templateRef
        };
        return {
            ...instance,
            $implicit: node,
            instance: instance
        };
    }

    public createTreeComponent(viewRef: ViewContainerRef, instance: object) {
        viewRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ThyTreeComponent);
        const componentRef = viewRef.createComponent(componentFactory);
        const componentInstance = (<ThyTreeComponent>componentRef.instance);
        componentInstance.thyInstance = instance;
    }
}

