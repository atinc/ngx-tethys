import { Component, NgModule } from '@angular/core';
import { ThyButtonComponent } from './button/button.component';

import { FirstComponent } from './first/first.component';

@NgModule({
    declarations: [
        FirstComponent,
        ThyButtonComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonComponent
    ]
})
export class NgxTethysModule {

}

