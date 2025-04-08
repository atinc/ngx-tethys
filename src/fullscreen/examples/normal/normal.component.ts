import { Component } from '@angular/core';
import { ThyFullscreenLaunchDirective, ThyFullscreenComponent } from 'ngx-tethys/fullscreen';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-fullscreen-normal-example',
    templateUrl: './normal.component.html',
    imports: [ThyFullscreenLaunchDirective, ThyFullscreenComponent, ThyButton]
})
export class ThyFullscreenNormalExampleComponent {
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
