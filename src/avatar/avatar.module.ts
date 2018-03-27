import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';

@NgModule({
    declarations: [
        AvatarComponent,
        AvatarPipes
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AvatarComponent,
        AvatarPipes
    ]
})
export class ThyAvatarModule {

}
