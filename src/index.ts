import { Component, NgModule } from '@angular/core';

import { ThyButtonModule } from './button/button.module';
import { ThyLayoutModule } from './layout/layout.module';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';
import { ThyAvatarModule } from './avatar/avatar.module';
import { ThyBadgeModule } from './badge/badge.module';
import { ThyLabelModule } from './label/label.module';


@NgModule({
    declarations: [
    ],
    imports: [
        ThyLayoutModule,
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule
    ],
    exports: [
        ThyLayoutModule,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule
    ],
    providers: [
    ]
})
export class NgxTethysModule {

}

