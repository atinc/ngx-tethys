import { Component, NgModule } from '@angular/core';
import { ThyButtonModule } from './button/button.module';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';

@NgModule({
    declarations: [
        FirstComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonModule,
        ThyGridModule
    ],
    providers: [
    ],
    imports: [
        ThyButtonModule,
        NgxPopBoxModule,
        ThyGridModule
    ]
})
export class NgxTethysModule {

}

