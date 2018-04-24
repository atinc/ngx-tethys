import { Component, ViewEncapsulation, ContentChild, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { ThyTreeComponent } from './tree.component';

@Component({
    selector: '[thyTreeChildRegion]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeChildRegionComponent implements OnInit {


    @Input() thyNode: any;

    constructor(
        private root: ThyTreeComponent,
        private viewRef: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
        this.root.createTreeComponent(this.viewRef, this.thyNode);
    }
}

