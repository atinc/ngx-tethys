import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySlideModule } from 'ngx-tethys/slide';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySlideBasicExampleComponent } from './basic/basic.component';
import { ThySlideDirectionExampleComponent } from './direction/direction.component';
import { ThySlideDrawerContainerExampleComponent } from './drawer-container/drawer-container.component';
import { ThySlideLayoutExampleComponent } from './layout/layout.component';
import { ThySlideModeExampleComponent } from './mode/mode.component';
import { ThySlideDemoContentComponent } from './slide-content.component';

const COMPONENTS = [
    ThySlideBasicExampleComponent,
    ThySlideDirectionExampleComponent,
    ThySlideModeExampleComponent,
    ThySlideLayoutExampleComponent,
    ThySlideDemoContentComponent,
    ThySlideDrawerContainerExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, ThySlideModule, ThyButtonModule, ThyFormModule, ThyGridModule, ThyRadioModule],
    exports: COMPONENTS
})
export class ThySlideExamplesModule {}
