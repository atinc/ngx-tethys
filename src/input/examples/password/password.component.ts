import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-password-example',
    templateUrl: './password.component.html',
    standalone: false
})
export class ThyInputPasswordExampleComponent implements OnInit {
    public value = '123456';

    constructor() {}

    ngOnInit() {}
}
