import { Component } from '@angular/core';

@Component({
    selector: 'thy-fullscreen-container-example',
    templateUrl: './container.component.html'
})
export class ThyFullscreenContainerExampleComponent {
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
