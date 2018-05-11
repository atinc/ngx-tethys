import { Component, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ThyButtonModule } from '../button/button.module';

import { ThyDatepickerPipe } from './pipe';
import { ThyDatepickerDirective } from './datepicker.directive';
import { ThyDatepickerContainerComponent } from './datepicker-container.component';
import { ThyDatepickerConfig } from './datepicker.config';
import { ThyDatepickerService } from './datepicker.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ThyDatepickerContainerComponent,
        ThyDatepickerDirective,
        ThyDatepickerPipe,
    ],
    entryComponents: [
        ThyDatepickerContainerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
    ],
    exports: [
        BsDatepickerModule,
        ThyDatepickerDirective,
        ThyDatepickerPipe,
    ],
    providers: [
        ThyDatepickerConfig,
        ThyDatepickerService,
    ]
})
export class ThyDatepickerModule {

}

