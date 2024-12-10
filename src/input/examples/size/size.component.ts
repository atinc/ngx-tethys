import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyInputSizeExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
