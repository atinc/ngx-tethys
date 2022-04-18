import { Component, ViewChild } from '@angular/core';

import { bigTreeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-visual-scrolling-example',
    templateUrl: './visual-scrolling.component.html'
})
export class ThyTreeVisualScrollingExampleComponent {
    bigTreeNodes = bigTreeNodes;

    @ViewChild('tree', { static: true }) tree: any;

    constructor() {}
}
