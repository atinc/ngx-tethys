import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyInputBasicExampleComponent implements OnInit {
    public value;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
