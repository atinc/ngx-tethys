import { NgModule } from '@angular/core';

import { ThyFullscreenComponent } from './fullscreen.component';
import { ThyFullscreenLaunchDirective } from './fullscreen-launch.directive';

@NgModule({
    declarations: [ThyFullscreenComponent, ThyFullscreenLaunchDirective],
    exports: [ThyFullscreenComponent, ThyFullscreenLaunchDirective]
})
export class ThyFullscreenModule {}
