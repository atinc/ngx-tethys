import { Component, NgModule } from '@angular/core';
import { ThyButtonModule } from './button/button.module';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';

import { ThyBadgeModule } from './badge/badge.module';

@NgModule({
    declarations: [
        FirstComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonModule,
        ThyBadgeModule
    ],
    providers: [
    ],
    imports: [
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule
    ]
})
export class NgxTethysModule {

}

