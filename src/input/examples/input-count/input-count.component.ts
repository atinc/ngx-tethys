import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyFormGroup, ThyFormDirective, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { ThyInputCount, ThyInputDirective, ThyInputGroup } from 'ngx-tethys/input';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-input-count-example',
    templateUrl: './input-count.component.html',
    styleUrls: ['./input-count.component.scss'],
    imports: [
        ThyFormGroup,
        ThyFormGroupFooter,
        ThyInputDirective,
        ThyButton,
        ThyFormGroup,
        ThyFormDirective,
        ThyInputGroup,
        ThyInputCount,
        FormsModule,
        ThyFormSubmitDirective
    ]
})
export class ThyInputCountExampleComponent {
    model = {
        username: 'Alice',
        nickname: '',
        hobby: '',
        address: '北京市海淀区'
    };

    saving = signal<boolean>(false);

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
            username: 'Alice',
            nickname: '',
            hobby: '',
            address: '北京市海淀区'
        };
    }
}
