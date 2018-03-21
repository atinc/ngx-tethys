import { Component, NgModule } from '@angular/core';
import { ThyButtonComponent } from './button/button.component';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';

@NgModule({
    declarations: [
        FirstComponent,
        ThyButtonComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonComponent
    ],
    providers: [
    ],
    imports: [
        NgxPopBoxModule
    ]
})
export class NgxTethysModule {

}

