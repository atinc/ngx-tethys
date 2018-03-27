import { Component, NgModule } from '@angular/core';
import { ThyButtonModule } from './button/button.module';

import { FirstComponent } from './first/first.component';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';

import { ThyAvatarModule } from './avatar/avatar.module';
import { ThyBadgeModule } from './badge/badge.module';



@NgModule({
    declarations: [
        FirstComponent
    ],
    exports: [
        FirstComponent,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule
    ],
    providers: [
    ],
    imports: [
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule
    ]
})
export class NgxTethysModule {

}

