import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyTimelineBasicExampleComponent } from './basic/basic.component';
import { ThyTimelineCustomDescriptionExampleComponent } from './custom-description/custom-description.component';
import { ThyTimelineCustomPositionExampleComponent } from './custom-position/custom-position.component';
import { ThyTimelineCustomColorExampleComponent } from './custom-color/custom-color.component';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyTimelineCustomHorizontalExampleComponent } from './custom-horizontal/custom-horizontal.component';
const COMPONENTS = [
    ThyTimelineBasicExampleComponent,
    ThyTimelineCustomDescriptionExampleComponent,
    ThyTimelineCustomPositionExampleComponent,
    ThyTimelineCustomColorExampleComponent,
    ThyTimelineCustomHorizontalExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS
})
export class ThyTimelineExamplesModule {}
