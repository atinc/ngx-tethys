import { ElementRef } from '@angular/core';

export interface ThyFullscreenConfig {
    /**
     * immersive 模式使用了浏览器提供的全屏，整个窗体都全屏，emulated 模式为仿真的，只会在 body 区域全屏，默认 immersive
     */
    mode?: ThyFullscreenMode;
    /**
     * 需要全屏的目标元素，可以是选择器，可以是 HTML Element, 也可以是 Angular 的 ElementRef
     */
    target: string | Element | ElementRef;
    /**
     * 目标元素已经打开全屏的样式
     */
    targetLaunchededClasse?: string;
    /**
     * emulated 模式下的目标元素全屏的容器，默认是 body
     */
    emulatedContainer?: string | Element | ElementRef;
}

export enum ThyFullscreenMode {
    immersive = 'immersive',
    emulated = 'emulated'
}
