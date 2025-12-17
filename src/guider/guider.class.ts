import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

/**
 * @public
 * @order 30
 */
export interface ThyGuiderStep<TData = any> {
    /**
     * 步骤的唯一标识符
     */
    key: string;

    /**
     * 步骤的目标DOM selectors，如果为 [number,number] 类型则是相对浏览器视窗的位置
     * @type string | string[] | { x: number; y: number }
     */
    target?: string | string[] | { x: number; y: number };

    /**
     * 新手引导内容组件的值
     */
    data: TData;

    /**
     * 步骤对应的路由
     */
    route?: string;

    /**
     * 当前步骤内容组件基于 target 元素的方位
     */
    hintPlacement?: ThyPlacement;

    /**
     * 当前步骤内容组件基于位置的偏移量（与 popover 中 offset 相同作用）
     */
    hintOffset?: number;

    /**
     * 当前步骤高亮圆圈基于默认位置的偏移量
     */
    pointOffset?: [number, number];
}

/**
 * 新手引导服务的配置项
 * @public
 * @order 20
 */
export class ThyGuiderConfig {
    /**
     * 新手引导内容组件
     */
    hintComponent?: Type<unknown>;

    /**
     * 新手引导步骤信息
     * @type ThyGuiderStep[]
     */
    steps!: ThyGuiderStep[];

    /**
     * 新手引导内容组件基于 target 元素的方位
     */
    hintPlacement?: ThyPlacement;

    /**
     * 新手引导内容组件默认位置（基于浏览器视窗，优先级小于 hintPlacement
     */
    defaultPosition?: { x: number; y: number };

    /**
     * 新手引导高亮圆圈基于默认位置的偏移量
     */
    pointOffset?: [number, number];

    /**
     * 新手引导内容组件基于位置的偏移量（与 popover 中 offset 相同作用）
     */
    hintOffset?: number;

    /**
     * 新手引导弹窗的自定义类
     * @type string | string[]
     */
    hintClass?: string | string[];

    /**
     * 新手引导point的自定义类
     * @type string | string[]
     */
    pointClass?: string | string[];
}

export const defaultGuiderPositionConfig = {
    hintComponent: null as unknown as Type<unknown>,
    hintPlacement: 'rightBottom',
    defaultPosition: { x: 0, y: 0 },
    pointOffset: [0, 0],
    hintOffset: 4
};
