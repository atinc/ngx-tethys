import { Component, OnInit } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { THY_DROPDOWN_DEFAULT_WIDTH } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-input-count-example',
    templateUrl: './input-count.component.html',
    styleUrls: ['./input-count.component.scss']
})
export class ThyInputCountExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    model = {
        username: 'Alice',
        nickname: ''
    };

    saving = false;

    login() {
        if (this.saving) {
            return;
        }
        this.saving = true;
        setTimeout(() => {
            this.saving = false;
        }, 2000);
    }

    cancel() {
        this.model = {
            username: 'Alice',
            nickname: ''
        };
    }
}
