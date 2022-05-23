import { ThyResultModule } from 'ngx-tethys/result';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyResultCustomExampleComponent } from './custom/custom.component';
import { ThyResultErrorExampleComponent } from './error/error.component';
import { ThyResultSuccessExampleComponent } from './success/success.component';
import { ThyResultWarningExampleComponent } from './warning/warning.component';

const COMPONENTS = [
    ThyResultSuccessExampleComponent,
    ThyResultErrorExampleComponent,
    ThyResultWarningExampleComponent,
    ThyResultCustomExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyResultModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyResultExamplesModule {
    constructor() {}
}
