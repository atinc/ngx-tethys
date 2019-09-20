import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
    selector: 'select-control-size-section',
    templateUrl: `./select-control-section.component.html`
})
export class SelectControlSizeSectionComponent implements OnInit {
    thyMode = 'multiple';

    placeholder = 'select a person';

    thySize = 'sm';

    listOfOption: Array<{ label: string; value: string }> = [];

    listOfSelectedValue = ['a10', 'c12'];

    constructor() {}

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
