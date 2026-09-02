import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormDirective, ThyFormGroup, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { ThyInputDirective } from 'ngx-tethys/input';
import { AppChildComponent } from './app-child.component';

@Component({
    selector: 'app-parent',
    template: `
        <form thyForm name="demoForm" #ngForm="ngForm">
            <thy-form-group thyLabelText="用户名" thyLabelRequired>
                <input thyInput name="username" [(ngModel)]="model.username" required autocomplete="username" placeholder="父组件内的 ngModel" />
            </thy-form-group>

            <thy-form-group thyLabelText="昵称" thyLabelRequired>
                <app-child />
            </thy-form-group>

            <p class="text-muted" style="padding-left: 120px;">
                表单校验 ngForm.valid：<code>{{ ngForm.valid }}</code
                >，表单 ngForm.value：<code>{{ ngForm.value | json }}</code>
            </p>

            <thy-form-group-footer>
                <button [thyButton]="'primary'" (thyFormSubmit)="submit(ngForm)">提交</button>
            </thy-form-group-footer>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        FormsModule,
        JsonPipe,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective,
        AppChildComponent
    ]
})
export class AppParentComponent {
    model = {
        username: ''
    };

    submit(ngForm: NgForm) {
        console.log('form value:', ngForm.value);
        console.log('form valid:', ngForm.valid);
    }
}
