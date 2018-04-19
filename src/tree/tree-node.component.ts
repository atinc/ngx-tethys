import { Component, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { ThyTreeComponent } from './tree.component';

@Component({
    selector: 'thy-tree-node',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent {

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    constructor() {

    }
}

