import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'app-child-reactive',
    template: `<input thyInput name="nickname" formControlName="nickname" autocomplete="nickname" placeholder="子组件内的 formControlName" />`,
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, ThyInputDirective]
})
export class AppChildReactiveComponent {}
