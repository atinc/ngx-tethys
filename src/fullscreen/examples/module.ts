import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { ThyFullscreenImmersiveExampleComponent } from './immersive/immersive.component';
import { ThyFullscreenNormalExampleComponent } from './normal/normal.component';
import { ThyFullscreenContainerExampleComponent } from './container/container.component';

const COMPONENTS = [ThyFullscreenImmersiveExampleComponent, ThyFullscreenNormalExampleComponent, ThyFullscreenContainerExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyFullscreenExamplesModule {}
