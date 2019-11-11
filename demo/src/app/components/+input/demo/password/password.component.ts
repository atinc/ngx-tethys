import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-input-password',
    templateUrl: 'password.component.html'
})
export class DemoInputPasswordComponent implements OnInit {
    public value = '123456';

    constructor() {}

    ngOnInit() {}
}
