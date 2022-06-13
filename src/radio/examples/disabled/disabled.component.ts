import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-radio-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyRadioDisabledExampleComponent implements OnInit {
    public checkedValue = 1;

    disabled: boolean;

    ngOnInit() {
        setTimeout(() => {
            this.disabled = true;
        }, 0);
    }
}
