import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyRootComponent } from './notify.root.component';
import { ThyNotifyService } from './notify.service';

@NgModule({
    declarations: [
        ThyNotifyRootComponent,
        ThyNotifyComponent,
    ],
    entryComponents: [
    ],
    providers: [
        ThyNotifyService
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ThyNotifyRootComponent,
        ThyNotifyComponent,
    ]
})
export class ThyNotifyModule {

}
