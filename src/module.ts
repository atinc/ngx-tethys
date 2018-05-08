import { Component, NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ThySharedModule } from './shared';
import { ThyButtonModule } from './button';
import { ThyLayoutModule } from './layout';
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
import { ThyActionMenuModule } from './action-menu/action-menu.module';
import { ThyConfirmModule } from './confirm/confirm.module';
import { ThyTreeModule } from './tree/tree.module';
import { ThyNotifyModule } from './notify/notify.module';
import { ThyEmptyModule } from './empty';
import { ThySwitchModule } from './switch/switch.module';
import { ThyTransferModule } from './transfer/transfer.module';
import { ThyFormModule } from './form';
import { ThyInputModule } from './input';
import { ThyDirectiveModule } from './directive';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserAnimationsModule,
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
        ThyNotifyModule,
        ThyCardModule,
        ThyLoadingModule,
        ThyActionMenuModule,
        ThyConfirmModule,
        ThyEmptyModule,
        ThySwitchModule,
        ThyTransferModule,
        ThyFormModule,
        ThyInputModule,
        ThyDirectiveModule
    ],
    exports: [
        BrowserAnimationsModule,
        ThyLayoutModule,
        ThyButtonModule,
        ThyBadgeModule,
        ThyGridModule,
        ThyAvatarModule,
        ThyLabelModule,
        ThyNavModule,
        ThyPaginationModule,
        ThyModalModule,
        ThyNotifyModule,
        ThyCardModule,
        ThyLoadingModule,
        ThyActionMenuModule,
        ThyConfirmModule,
        ThyTreeModule,
        ThyEmptyModule,
        ThySwitchModule,
        ThyTransferModule,
        ThyFormModule,
        ThyInputModule,
        ThyDirectiveModule
    ],
    providers: [
    ]
})
export class NgxTethysModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxTethysModule,
            providers: []
        };
    }
}
