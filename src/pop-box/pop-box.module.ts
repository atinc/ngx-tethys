import { Component, NgModule } from '@angular/core';
import { ThyPopBoxService } from './pop-box.service';
import { PopBoxRef } from './pop-box-ref.service';
import { PopBoxContainerComponent } from './pop-box-container.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ThyPositioningService } from '../positioning/positioning.service';

@NgModule({
    declarations: [
        PopBoxContainerComponent
    ],
    entryComponents: [
        PopBoxContainerComponent
    ],
    exports: [
    ],
    providers: [
        ThyPopBoxService,
        PopBoxRef,
        ComponentLoaderFactory,
        PositioningService,
        ThyPositioningService
    ]
})
export class NgxPopBoxModule {

}

