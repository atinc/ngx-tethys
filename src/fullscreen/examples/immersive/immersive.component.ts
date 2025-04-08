import { Component } from '@angular/core';
import { ThyFullscreenComponent, ThyFullscreenLaunchDirective } from 'ngx-tethys/fullscreen';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-fullscreen-immersive-example',
    templateUrl: './immersive.component.html',
    imports: [ThyFullscreenLaunchDirective, ThyFullscreenComponent, ThyButton]
})
export class ThyFullscreenImmersiveExampleComponent {
    btnContent = '全屏';

    constructor() {}

    changeFullscreen(isFullscreen: boolean) {
        if (isFullscreen) {
            this.btnContent = '退出全屏';
        } else {
            this.btnContent = '全屏';
        }
    }
}
