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

    public treeRegionViewRef: ViewContainerRef;

    @Input() thyNodes: any[];

    @Input() thyLevel = 0;

    @Input() thyChildrenPropName = 'children';

    @Input() thyAutoLoop = true;

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
            this.thyTemplate = value.template;
            this.thyAutoLoop = value.autoLoop;
        }
    }

    @ContentChild('treeNodeTemplate') templateRef: TemplateRef<any>;

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
            template: this.templateRef,
            autoLoop: this.thyAutoLoop
        };
        return {
            ...instance,
            $implicit: node,
            instance: instance
        };
    }

    public createTreeComponent(viewRef: ViewContainerRef, node: any) {
        viewRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ThyTreeComponent);
        const componentRef = viewRef.createComponent(componentFactory);
        const componentInstance = (<ThyTreeComponent>componentRef.instance);
        componentInstance.thyTemplate = this.templateRef;
        componentInstance.thyNodes = node[this.thyChildrenPropName];
        componentInstance.thyLevel = this.thyLevel + 1;
    }
}

