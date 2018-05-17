import { Component, NgModule } from '@angular/core';
import { ThyPopBoxService } from './pop-box.service';
import { PopBoxRef } from './pop-box-ref.service';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ThySharedModule } from '../shared';

@NgModule({
    declarations: [
        PopBoxContainerComponent
    ],
    entryComponents: [
        PopBoxContainerComponent
    ],
    imports: [
        ThySharedModule
    ],
    exports: [
    ],
    providers: [
        ThyPopBoxService,
        PopBoxRef,
        ComponentLoaderFactory
    ]
})
export class NgxPopBoxModule {

}

