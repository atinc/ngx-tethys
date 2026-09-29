import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-tree-select {
                width: 100%;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTreeSelect, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThyTreeSelectAppearanceExampleComponent {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';
}
