import { Injectable, ElementRef } from '@angular/core';


@Injectable()
export class PopBoxOptions {

    /**
     * 弹出 box 目标所在的参考物
     */
    target?: ElementRef | any;
    /**
     * 传入的位置，当位置传入后，不自动根据 target 计算弹出框的位置, top, left, bottom, right,
     */
    position?: {
        top: number,
        left: number
    };
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboardESCClose?: boolean;
    /**
     * Css class for opened modal
     */
    class?: string;
    /**
     * 初始化 data
     */
    initialState?: Object;
    /**
     * Placement of a pop-box
     * Default: "bottom left"
     * Accepts:
     * "top", "top left", "top right",
     * "bottom", "bottom left", "bottom right",
     * "left", "left top", "left bottom",
     * "right", "right top", "right bottom".
     */
    placement?: string;

    offset?: number;

    /**
     * 是否有 arrow
     */
    arrow?: boolean;

    /**
     * 外部点击自动关闭
     */
    outsideAutoClose?: boolean;

    /**
     * 内部点击自动关闭
     */
    insideAutoClose?: boolean;

    // 点击弹出的组件是否阻止冒泡
    stopPropagation?: boolean;
}

export const popBoxConfigDefaults: PopBoxOptions = {
    placement: 'bottom center',
    arrow: false,
    keyboardESCClose: true,
    outsideAutoClose: true,
    insideAutoClose: false,
    offset: 2,
    stopPropagation: false
};
