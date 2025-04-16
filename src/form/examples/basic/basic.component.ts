import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormDirective, ThyFormGroup, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-form-basic-example',
    templateUrl: './basic.component.html',
    imports: [FormsModule, ThyFormDirective, ThyFormGroup, ThyInputDirective, ThyFormGroupFooter, ThyButton, ThyFormSubmitDirective]
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
