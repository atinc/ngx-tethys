import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';

@Component({
    selector: 'app-tree-select-empty-selection-example',
    templateUrl: './empty-selection.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTreeSelect]
})
export class ThyTreeSelectEmptySelectionExampleComponent {}
