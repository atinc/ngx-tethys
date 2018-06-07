import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';

@NgModule({
    declarations: [
        ThyAvatarComponent,
        AvatarPipes
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyAvatarComponent,
        AvatarPipes
    ]
})
export class ThyAvatarModule {

}
