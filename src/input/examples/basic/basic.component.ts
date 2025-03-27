import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyInputBasicExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
