import { Component, OnInit } from '@angular/core';
import { moreOptionTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-more-node-example',
    templateUrl: './more-node.component.html',
    standalone: false
})
export class ThyTreeSelectMoreNodeExampleComponent implements OnInit {
    public treeSelectNodes = moreOptionTreeSelectData;

    public moreSetting = {
        isAllowClear: false,
        isDisabled: false,
        isMultiple: false,
        isHidden: false,
        selectedValue: '',
        showWholeName: ''
    };

    constructor() {}

    ngOnInit() {}
}
