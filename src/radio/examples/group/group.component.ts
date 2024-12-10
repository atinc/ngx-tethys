import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-radio-group-example',
    templateUrl: './group.component.html',
    standalone: false
})
export class ThyRadioGroupExampleComponent implements OnInit {
    public checkedValue = 1;

    constructor() {}

    ngOnInit() {}
}
