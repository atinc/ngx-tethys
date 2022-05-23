import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimelineModule } from 'ngx-tethys/timeline';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTimelineBasicExampleComponent } from './basic/basic.component';
import { ThyTimelineCustomColorExampleComponent } from './custom-color/custom-color.component';
import { ThyTimelineCustomDescriptionExampleComponent } from './custom-description/custom-description.component';
import { ThyTimelineCustomHorizontalExampleComponent } from './custom-horizontal/custom-horizontal.component';
import { ThyTimelineCustomPositionExampleComponent } from './custom-position/custom-position.component';

const COMPONENTS = [
    ThyTimelineBasicExampleComponent,
    ThyTimelineCustomDescriptionExampleComponent,
    ThyTimelineCustomPositionExampleComponent,
    ThyTimelineCustomColorExampleComponent,
    ThyTimelineCustomHorizontalExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyTimelineModule, ThyFormModule, ThyAvatarModule, ThyIconModule],
    exports: COMPONENTS
})
export class ThyTimelineExamplesModule {}
