import { Component, signal } from '@angular/core';
import { ThyFullscreenLaunchDirective, ThyFullscreenComponent } from 'ngx-tethys/fullscreen';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-fullscreen-normal-example',
    templateUrl: './normal.component.html',
    imports: [ThyFullscreenLaunchDirective, ThyFullscreenComponent, ThyButton]
})
export class ThyFullscreenNormalExampleComponent {
    btnContent = signal<string>('全屏');

    changeFullscreen(isFullscreen: boolean) {
        if (isFullscreen) {
            this.btnContent.set('退出全屏');
        } else {
            this.btnContent.set('全屏');
        }
    }
}
