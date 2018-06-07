import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';
import { ThyAvatarService, ThyDefaultAvatarService } from './avatar.service';

@NgModule({
    declarations: [
        ThyAvatarComponent,
        AvatarPipes
    ],
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: ThyDefaultAvatarService
        }
    ],
    exports: [
        ThyAvatarComponent,
        AvatarPipes
    ]
})
export class ThyAvatarModule {

}
