import { Component } from '@angular/core';

@Component({
    selector: 'thy-fullscreen-normal-example',
    templateUrl: './normal.component.html',
    standalone: false
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
