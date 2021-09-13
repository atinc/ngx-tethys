import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-select-multiple-example',
    templateUrl: './multiple.component.html'
})
export class ThySelectMultipleExampleComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    listOfSelectedValue = ['a10', 'b11'];

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
