import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-input-size',
    templateUrl: 'size.component.html'
})
export class DemoInputSizeComponent implements OnInit {
    public value;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
