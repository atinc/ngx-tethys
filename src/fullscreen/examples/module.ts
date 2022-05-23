import { ThyFullscreenModule } from 'ngx-tethys/fullscreen';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyFullscreenContainerExampleComponent } from './container/container.component';
import { ThyFullscreenImmersiveExampleComponent } from './immersive/immersive.component';
import { ThyFullscreenNormalExampleComponent } from './normal/normal.component';

const COMPONENTS = [ThyFullscreenImmersiveExampleComponent, ThyFullscreenNormalExampleComponent, ThyFullscreenContainerExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyFullscreenModule],
    exports: [...COMPONENTS]
})
export class ThyFullscreenExamplesModule {}
