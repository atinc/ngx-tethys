import { Injectable } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { ThyDropPosition } from './drag-drop.class';

/**
 * 自定义可放置区域内容
 */
@Injectable({ providedIn: 'root' })
export class ThyDragDropService<T = any> {
    /**
     * 当前拖拽项，dragEnd 后重置为 undefined
     */
    public previousDrag: ThyDragDirective<T>;

    /**
     * 拖拽的时候，针对 dragOver 的节点有三种情况，即拖拽到节点之上 before ，拖拽到节点上 in ，拖拽到节点之下 after
     * @type ThyDropPosition
     */
    public dropPosition: ThyDropPosition;

    /**
     * 用于拖动过程对 dragover 的元素设置相应的样式
     * @type Map<Element, string>
     */
    public classMap = new Map<Element, string>();
    constructor() {}
}
