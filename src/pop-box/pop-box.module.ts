import { Component, NgModule } from '@angular/core';
import { ThyPopBoxService } from './pop-box.service';
import { PopBoxRef } from './pop-box-ref.service';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ThySharedModule } from '../shared';
import { ThyPopBoxHeader } from './header/pop-box-header.component';
import { ThyPopBoxBody } from './body/pop-box-body.component';
import { ThyPopBoxFooter } from './footer/pop-box-footer.component';

@NgModule({
    declarations: [
        PopBoxContainerComponent,
        ThyPopBoxHeader,
        ThyPopBoxBody,
        ThyPopBoxFooter
    ],
    entryComponents: [
        PopBoxContainerComponent
    ],
    imports: [
        ThySharedModule
    ],
    exports: [
        ThyPopBoxHeader,
        ThyPopBoxBody,
        ThyPopBoxFooter
    ],
    providers: [
        ThyPopBoxService,
        PopBoxRef,
        ComponentLoaderFactory
    ]
})
export class NgxPopBoxModule {

}

