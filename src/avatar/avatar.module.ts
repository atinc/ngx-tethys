import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';
import { ThyAvatarService, ThyDefaultAvatarService } from './avatar.service';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAvatarListComponent } from './avatar-list/avatar-list.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyAvatarComponent, ThyAvatarListComponent, AvatarPipes],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: ThyDefaultAvatarService
        }
    ],
    exports: [ThyAvatarComponent, ThyAvatarListComponent, AvatarPipes]
})
export class ThyAvatarModule {}
