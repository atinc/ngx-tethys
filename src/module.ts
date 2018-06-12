import { Component, NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThySharedModule } from './shared';
import { ThyButtonModule } from './button';
import { ThyLayoutModule } from './layout';
import { NgxPopBoxModule } from './pop-box/pop-box.module';
import { ThyGridModule } from './grid/grid.module';
import { ThyAvatarModule } from './avatar';
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
import { ThyDatepickerModule } from './datepicker/datepicker.module';
import { ThyNotifyModule } from './notify/notify.module';
import { ThyEmptyModule } from './empty';
import { ThySwitchModule } from './switch/switch.module';
import { ThyTransferModule } from './transfer/transfer.module';
import { ThyFormModule } from './form';
import { ThyInputModule } from './input';
import { ThyDropdownModule } from './dropdown';
import { ThyDirectiveModule } from './directive';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ThyCheckboxModule } from './checkbox';
import { ThyRadioModule } from './radio';
import { ThySelectModule } from './select';
import { ThySlideModule } from './slide/slide.module';
import { ThyPropertyOperationModule } from './property-operation';
import { ThyUploaderModule } from './uploader/index';
import { ThyEditorModule } from './editor';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserAnimationsModule,
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
        ThyDatepickerModule,
        ThyActionMenuModule,
        ThyConfirmModule,
        ThyEmptyModule,
        ThySwitchModule,
        ThyTransferModule,
        ThyFormModule,
        ThyInputModule,
        ThyDropdownModule,
        ThyDirectiveModule,
        ProgressbarModule.forRoot(),
        ThyCheckboxModule,
        ThySelectModule,
        ThySlideModule,
        ThyRadioModule,
        ThySelectModule,
        ThyPropertyOperationModule
    ],
    exports: [
        BrowserAnimationsModule,
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
        ThyDatepickerModule,
        ThyActionMenuModule,
        ThyConfirmModule,
        ThyTreeModule,
        ThyEmptyModule,
        ThySwitchModule,
        ThyTransferModule,
        ThyFormModule,
        ThyInputModule,
        ThyDropdownModule,
        ThyDirectiveModule,
        ProgressbarModule,
        ThyCheckboxModule,
        ThySelectModule,
        ThySlideModule,
        ThyRadioModule,
        ThySelectModule,
        ThyPropertyOperationModule,
        ThyUploaderModule,
        ThyEditorModule
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
