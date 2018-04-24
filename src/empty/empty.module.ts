import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyEmptyComponent } from './empty.component';
import { ThyEmptyConfig } from './empty.config';
import { ThySharedModule } from '../shared';
@NgModule({
    declarations: [
        ThyEmptyComponent
    ],
    imports: [
        CommonModule,
        ThySharedModule
    ],
    exports: [
        ThyEmptyComponent
    ],
    providers: [
        ThyEmptyConfig
    ]
})
export class ThyEmptyModule {

}
