import { Component, NgModule } from '@angular/core';
import { ThyButtonDirective } from './button/button.component';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';

@NgModule({
    declarations: [
        FirstComponent,
        ThyButtonDirective
    ],
    exports: [
        FirstComponent,
        ThyButtonDirective
    ],
    providers: [
    ],
    imports: [
        NgxPopBoxModule
    ]
})
export class NgxTethysModule {

}

