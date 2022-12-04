import { Component } from '@angular/core';

@Component({
    selector: 'thy-grid-collapse-example',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss']
})
export class ThyGridCollapseExampleComponent {
    public gridItemCount = 4;

    public isCollapsed = true;

    public showSuffix = true;

    public collapsedRows = 1;

    get gridItems() {
        return Array.from({ length: this.gridItemCount }, (v, k) => k);
    }

    trackByFn(index: number) {
        return index;
    }
}
