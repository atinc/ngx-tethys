import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-select-empty-option-example',
    templateUrl: './empty-option.component.html'
})
export class ThySelectEmptyOptionExampleComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
