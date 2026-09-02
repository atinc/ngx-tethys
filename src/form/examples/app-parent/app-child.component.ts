import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'app-child',
    template: `<input thyInput name="nickname" [(ngModel)]="nickname" required autocomplete="nickname" placeholder="子组件内的 ngModel" />`,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ThyInputDirective]
})
export class AppChildComponent {
    nickname = '';
}
