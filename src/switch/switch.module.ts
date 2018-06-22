import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySwitchComponent } from './switch.component';

@NgModule({
    declarations: [
        ThySwitchComponent
    ],
    entryComponents: [
        ThySwitchComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThySwitchComponent
    ]
})
export class ThySwitchModule {

}
