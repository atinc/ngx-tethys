import { Component, OnInit } from '@angular/core';
import { moreOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';

@Component({
    selector: 'app-tree-select-more-node-example',
    templateUrl: './more-node.component.html',
    imports: [ThyTreeSelect]
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
