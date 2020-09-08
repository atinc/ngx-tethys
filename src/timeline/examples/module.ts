import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyTimelineBasicExampleComponent } from './basic/basic.component';
import { ThyTimelineCustomExampleComponent } from './custom/custom.component';
import { NgxTethysModule } from 'ngx-tethys';

const COMPONENTS = [ThyTimelineBasicExampleComponent, ThyTimelineCustomExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS
})
export class ThyTimelineExamplesModule {}
