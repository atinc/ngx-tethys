import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyFlexibleTextModule } from '../flexible-text';
import { ThyTooltipModule } from '../tooltip';
import { ThyAvatarListComponent } from './avatar-list/avatar-list.component';
import { ThyAvatarComponent } from './avatar.component';
import { AvatarPipes } from './avatar.pipe';
import { ThyAvatarService, ThyDefaultAvatarService } from './avatar.service';

@NgModule({
    imports: [
        CommonModule,
        ThyIconModule,
        ThyAvatarComponent,
        ThyAvatarListComponent,
        AvatarPipes,
        ThyFlexibleTextModule,
        ThyTooltipModule
    ],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: ThyDefaultAvatarService
        }
    ],
    exports: [ThyAvatarComponent, ThyAvatarListComponent, AvatarPipes]
})
export class ThyAvatarModule {}
