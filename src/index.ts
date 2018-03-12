import { Component, NgModule } from '@angular/core';
import { AppButtonComponent } from './button/button.component';

import { FirstComponent } from './first/first.component';

@NgModule({
    declarations: [
        FirstComponent,
        AppButtonComponent
    ],
    exports: [
        FirstComponent
    ]
})
export class NgxTethysModule {

}

