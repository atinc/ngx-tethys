import {
    Component,
    ViewEncapsulation,
    ContentChild,
    TemplateRef,
    ViewContainerRef,
    Input,
    OnInit
} from '@angular/core';
import { ThyTreeComponent } from './tree.component';

@Component({
    selector: '[ThyTreeReplaceRegion]',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeReplaceRegionComponent implements OnInit {
    @Input() thyInstance: any;

    constructor(
        private root: ThyTreeComponent,
        private viewRef: ViewContainerRef
    ) {}

    ngOnInit(): void {}
}
