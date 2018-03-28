import { Component, NgModule } from '@angular/core';
import { ThyButtonModule } from './button/button.module';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';

import { ThyAvatarModule } from './avatar/avatar.module';
import { ThyBadgeModule } from './badge/badge.module';
import { ThyLabelModule } from './label/label.module';



@NgModule({
    declarations: [
        FirstComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule
    ],
    providers: [
    ],
    imports: [
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule
    ]
})
export class NgxTethysModule {

}

