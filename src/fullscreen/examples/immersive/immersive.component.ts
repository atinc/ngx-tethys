import { Component, signal } from '@angular/core';
import { ThyFullscreenComponent, ThyFullscreenLaunchDirective } from 'ngx-tethys/fullscreen';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-fullscreen-immersive-example',
    templateUrl: './immersive.component.html',
    imports: [ThyFullscreenLaunchDirective, ThyFullscreenComponent, ThyButton]
})
export class ThyFullscreenImmersiveExampleComponent {
    btnContent = signal<string>('全屏');

    changeFullscreen(isFullscreen: boolean) {
        if (isFullscreen) {
            this.btnContent.set('退出全屏');
        } else {
            this.btnContent.set('全屏');
        }
    }
}
