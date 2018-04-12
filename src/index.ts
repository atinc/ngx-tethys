import { Component, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

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
import { ThyCardModule } from './card/card.module';
import { ThyLoadingModule } from './loading/loading.module';


@NgModule({
    declarations: [
    ],
    imports: [
        ModalModule.forRoot(),
        ThyLayoutModule,
        ThyButtonModule,
        NgxPopBoxModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule,
        ThyNavModule,
        ThyPaginationModule,
        ThyModalModule,
        ThyCardModule,
        ThyLoadingModule
    ],
    exports: [
        ThyLayoutModule,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule,
        ThyNavModule,
        ThyPaginationModule,
        ThyModalModule,
        ThyCardModule,
        ThyLoadingModule
    ],
    providers: [
    ]
})
export class NgxTethysModule {

}


export {
    ThyPopBoxService
} from './pop-box';

export {
    ThyModalService
} from './modal';
