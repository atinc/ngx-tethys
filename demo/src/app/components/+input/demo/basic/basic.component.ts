import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-input-basic',
    templateUrl: 'basic.component.html'
})
export class DemoInputBasicComponent implements OnInit {
    public value;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
