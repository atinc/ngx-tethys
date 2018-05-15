import { Component, OnInit } from '@angular/core';

@Component({
    selector: '',
    templateUrl: './switch-section.component.html'
})

export class DemoSwitchSectionComponent implements OnInit {

    public isChecked: Boolean = true;

    constructor() {

    }

    switchChange() {
        console.log(this.isChecked+'11');
    }

    ngOnInit() {

    }
}
