import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-form-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyFormBasicExampleComponent implements OnInit {
    model = {
        name: '',
        password: ''
    };

    saving = false;

    constructor() {}

    ngOnInit(): void {}

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
            name: '',
            password: ''
        };
    }
}
