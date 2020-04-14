import { NgModule, Component } from '@angular/core';
import { THY_FORM_CONFIG } from '../form.class';
import { ThyFormModule } from '../module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'test-bed-form-directive',
    template: `
        <form thyForm [thyLayout]="thyLayout"></form>
    `
})
export class TestBedFormDirectiveComponent {
    thyLayout = '';
}

@NgModule({
    imports: [ThyFormModule, FormsModule],
    declarations: [TestBedFormDirectiveComponent],
    providers: [
        {
            provide: THY_FORM_CONFIG,
            useValue: {
                layout: 'vertical'
            }
        }
    ]
})
export class FormTestModule {}
