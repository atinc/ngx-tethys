import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ThyButtonModule } from 'ngx-tethys/button';

import { ThyDatepickerFormatPipe } from './pipe';
import { ThyDatepickerDirective } from './datepicker.directive';
import { ThyDaterangepickerDirective } from './daterangepicker.directive';
import { ThyDatepickerContainerComponent } from './datepicker-container.component';
import { ThyDaterangepickerContainerComponent } from './daterangepicker-container.component';
import { ThyDatepickerConfig } from './datepicker.config';
import { ThyDatepickerService } from './datepicker.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDaterangepickerConfig } from './daterangepicker.config';

@NgModule({
    declarations: [
        ThyDatepickerContainerComponent,
        ThyDaterangepickerContainerComponent,
        ThyDatepickerDirective,
        ThyDaterangepickerDirective,
        ThyDatepickerFormatPipe
    ],
    entryComponents: [ThyDatepickerContainerComponent, ThyDaterangepickerContainerComponent],
    imports: [CommonModule, FormsModule, ThyButtonModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot()],
    exports: [BsDatepickerModule, ThyDatepickerDirective, ThyDaterangepickerDirective, ThyDatepickerFormatPipe],
    providers: [ThyDatepickerConfig, ThyDaterangepickerConfig, ThyDatepickerService]
})
export class ThyDatepickerModule {}
