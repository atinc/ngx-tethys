import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormDirective, ThyFormGroup, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { ThyInputDirective } from 'ngx-tethys/input';
import { AppChildReactiveComponent } from './app-child-reactive.component';

@Component({
    selector: 'app-parent-reactive',
    template: `
        <form thyForm name="demoForm" [formGroup]="form">
            <thy-form-group thyLabelText="用户名" thyLabelRequired>
                <input thyInput name="username" formControlName="username" autocomplete="username" placeholder="父组件内的 formControlName" />
            </thy-form-group>

            <thy-form-group thyLabelText="昵称" thyLabelRequired>
                <app-child-reactive />
            </thy-form-group>

            <p class="text-muted" style="padding-left: 120px;">
                表单校验 form.valid：<code>{{ form.valid }}</code
                >，表单 form.value：<code>{{ form.value | json }}</code>
            </p>

            <thy-form-group-footer>
                <button [thyButton]="'primary'" (thyFormSubmit)="submit()">提交</button>
            </thy-form-group-footer>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ReactiveFormsModule,
        JsonPipe,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective,
        AppChildReactiveComponent
    ]
})
export class AppParentReactiveComponent {
    private formBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        username: ['', Validators.required],
        nickname: ['', Validators.required]
    });

    submit() {
        console.log('form value:', this.form.value);
        console.log('form valid:', this.form.valid);
    }
}
