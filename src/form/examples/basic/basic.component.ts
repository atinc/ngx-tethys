import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormDirective, ThyFormGroup, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-form-basic-example',
    templateUrl: './basic.component.html',
    imports: [FormsModule, ThyFormDirective, ThyFormGroup, ThyInputDirective, ThyFormGroupFooter, ThyButton, ThyFormSubmitDirective]
})
export class ThyFormBasicExampleComponent {
    model = {
        name: '',
        password: ''
    };

    saving = signal(false);

    login() {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        setTimeout(() => {
            this.saving.set(false);
        }, 2000);
    }

    cancel() {
        this.model = {
            name: '',
            password: ''
        };
    }
}
