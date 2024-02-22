import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatar } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';
import { ThyAvatarService, ThyDefaultAvatarService } from './avatar.service';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAvatarList } from './avatar-list/avatar-list.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyAvatar, ThyAvatarList, AvatarPipes],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: ThyDefaultAvatarService
        }
    ],
    exports: [ThyAvatar, ThyAvatarList, AvatarPipes]
})
export class ThyAvatarModule {}
