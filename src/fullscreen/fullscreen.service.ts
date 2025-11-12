
import { Injectable, NgZone, inject, DOCUMENT } from '@angular/core';
import { ThyFullscreenRef } from './fullscreen-ref';
import { ThyFullscreenConfig, ThyFullscreenMode } from './fullscreen.config';

@Injectable({
    providedIn: 'root'
})
export class ThyFullscreen {
    protected document = inject(DOCUMENT);
    private ngZone = inject(NgZone);

    private fullscreenRefs: ThyFullscreenRef[] = [];

    /**
     * 开始全屏
     * @param config
     */
    launch<TResult = unknown>(config: ThyFullscreenConfig): ThyFullscreenRef<TResult> {
        config.mode = config.mode || ThyFullscreenMode.immersive;
        const fullscreenRef = new ThyFullscreenRef<TResult>(this.document, this.ngZone);
        fullscreenRef.fullscreenConfig = config;
        fullscreenRef.launch();
        this.fullscreenRefs.push(fullscreenRef);
        fullscreenRef.afterExited().subscribe(() => {
            const index = this.fullscreenRefs.indexOf(fullscreenRef);
            if (index > -1) {
                this.fullscreenRefs.splice(index, 1);
            }
        });

        return fullscreenRef;
    }

    /**
     * 退出最后一个 ThyFullscreenRef 的全屏
     * @param config
     */
    exit() {
        const lastFullscreenRef = this.fullscreenRefs[this.fullscreenRefs.length - 1];
        lastFullscreenRef?.exit();
    }
}
