import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-pre-suffix-example',
    templateUrl: './pre-suffix.component.html'
})
export class ThyInputPreSuffixExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    alert(a: any) {
        window.alert(a);
    }
}
