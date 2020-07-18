import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyAvatarModule, NgxTethysModule } from 'ngx-tethys';
import { ThyAvatarSizeExampleComponent } from './size/size.component';
import { ThyAvatarDisabledExampleComponent } from './disabled/disabled.component';
import { ThyAvatarHasBadgeExampleComponent } from './has-badge/has-badge.component';
import { ThyAvatarNameExampleComponent } from './name/name.component';
import { ThyAvatarRemoveExampleComponent } from './remove/remove.component';
import { ThyAvatarBasicExampleComponent } from './basic/basic.component';
import { ThyAvatarCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [
    ThyAvatarBasicExampleComponent,
    ThyAvatarSizeExampleComponent,
    ThyAvatarDisabledExampleComponent,
    ThyAvatarHasBadgeExampleComponent,
    ThyAvatarNameExampleComponent,
    ThyAvatarRemoveExampleComponent,
    ThyAvatarCustomExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule, ThyAvatarModule],
    exports: COMPONENTS,
    providers: [],
    entryComponents: COMPONENTS
})
export class ThyAvatarExamplesModule {}
