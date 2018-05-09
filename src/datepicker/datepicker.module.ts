import { Component, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ThyButtonModule } from '../button/button.module';

import { ThyDatepickerDirective } from './datepicker.directive';
import { ThyDatepickerContainerComponent } from './datepicker-container.component';
import { ThyDatepickerConfig } from './datepicker.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ThyDatepickerContainerComponent,
        ThyDatepickerDirective,
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
    ],
    providers: [
        ThyDatepickerConfig,
    ]
})
export class ThyDatepickerModule {

}

