import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule, ThyResultModule } from 'ngx-tethys';

import { ThyResultSuccessExampleComponent } from './success/success.component';
import { ThyResultErrorExampleComponent } from './error/error.component';
import { ThyResultWarningExampleComponent } from './warning/warning.component';
import { ThyResultCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [
    ThyResultSuccessExampleComponent,
    ThyResultErrorExampleComponent,
    ThyResultWarningExampleComponent,
    ThyResultCustomExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, ThyResultModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyResultExamplesModule {
    constructor() {}
}
