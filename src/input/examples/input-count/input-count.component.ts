import { Component, OnInit } from '@angular/core';

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
        nickname: '',
        hobby: '',
        address: '北京市海淀区'
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
            nickname: '',
            hobby: '',
            address: '北京市海淀区'
        };
    }
}
