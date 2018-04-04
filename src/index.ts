import { Component, NgModule } from '@angular/core';

import { ThySharedModule } from './shared/shared.module';
import { ThyButtonModule } from './button/button.module';
import { ThyLayoutModule } from './layout/layout.module';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';
import { ThyAvatarModule } from './avatar/avatar.module';
import { ThyBadgeModule } from './badge/badge.module';
import { ThyLabelModule } from './label/label.module';
import { ThyNavModule } from './nav/nav.module';
import { ThyPaginationModule } from './pagination/pagination.module';
import { ThyModalModule } from './modal/modal.module';


@NgModule({
    declarations: [
    ],
    imports: [
        ThySharedModule,
        ThyLayoutModule,
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule,
        ThyNavModule,
        ThyPaginationModule,
        ThyModalModule
    ],
    exports: [
        ThySharedModule,
        ThyLayoutModule,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule,
        ThyNavModule,
        ThyPaginationModule,
        ThyModalModule
    ],
    providers: [
    ]
})
export class NgxTethysModule {

}

