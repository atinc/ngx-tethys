import { ThyFormDirective, ThyFormGroup, ThyFormGroupError, ThyFormGroupFooter, ThyFormSubmitDirective } from 'ngx-tethys/form';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyDatePicker } from 'ngx-tethys/date-picker';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-form-columns-example',
    templateUrl: './columns.component.html',
    imports: [
        FormsModule,
        ThyFormDirective,
        ThyRowDirective,
        ThyFormGroup,
        ThyColDirective,
        ThyInputDirective,
        ThyDatePicker,
        ThyFormGroupError,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective
    ]
})
export class ThyFormColumnsExampleComponent {
    save(form: ThyFormDirective) {
        console.log(`submit success!`);
    }
}
