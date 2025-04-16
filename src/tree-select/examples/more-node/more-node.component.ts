import { Component, OnInit } from '@angular/core';
import { moreOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'app-tree-select-more-node-example',
    templateUrl: './more-node.component.html',
    imports: [ThyTreeSelect, FormsModule, ThySwitch, ThyIcon]
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
