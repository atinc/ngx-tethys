import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyActionModule } from 'ngx-tethys/action';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAvatarBasicExampleComponent } from './basic/basic.component';
import { ThyAvatarCustomExampleComponent } from './custom/custom.component';
import { ThyAvatarDisabledExampleComponent } from './disabled/disabled.component';
import { ThyAvatarHasBadgeExampleComponent } from './has-badge/has-badge.component';
import { ThyAvatarImgErrorExampleComponent } from './img-error/img-error.component';
import { ThyAvatarNameExampleComponent } from './name/name.component';
import { ThyAvatarRemoveExampleComponent } from './remove/remove.component';
import { ThyAvatarSizeExampleComponent } from './size/size.component';
import { ThyAvatarListExampleComponent } from './list/list.component';

const COMPONENTS = [
    ThyAvatarBasicExampleComponent,
    ThyAvatarSizeExampleComponent,
    ThyAvatarDisabledExampleComponent,
    ThyAvatarHasBadgeExampleComponent,
    ThyAvatarNameExampleComponent,
    ThyAvatarRemoveExampleComponent,
    ThyAvatarCustomExampleComponent,
    ThyAvatarImgErrorExampleComponent,
    ThyAvatarListExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyAvatarModule, ThyBadgeModule, ThyActionModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyAvatarExamplesModule {}
