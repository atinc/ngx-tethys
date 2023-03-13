import { NgModule } from '@angular/core';

import { ThyFullscreenComponent } from './fullscreen.component';
import { ThyFullscreenLaunchDirective } from './fullscreen-launch.directive';

@NgModule({
    imports: [ThyFullscreenComponent, ThyFullscreenLaunchDirective],
    exports: [ThyFullscreenComponent, ThyFullscreenLaunchDirective]
})
export class ThyFullscreenModule {}
