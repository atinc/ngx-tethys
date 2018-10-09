import { ElementRef } from '@angular/core';

export interface KeySelectConfig {
    scrollContainer: HTMLElement | ElementRef | string;
    eventContainer: HTMLElement | ElementRef | string;
    hoverClass?: string;
    selectedClass?: string;
    itemSelector?: string;
    filterSelector?: string;
    callbacks?: {
        beforeHover?: (event: Event) => Boolean
        hover?: (event?: Event, keyHover?: any) => void,
        select?: () => void
    };
    preventDefault: boolean;
    scrollMargin: number;
    delay?: number;
    keyActions?: [{
        keyCode: number,
        action: string
    }];
    globalKey?: boolean;
}

export const defaultConfig = {
    hoverClass: 'key-hover',
    selectedClass: 'selected',
    itemSelector: '',
    filterSelector: '.hide',
    callbacks: {
        beforeHover: function () {
            return true;
        },
        hover: () => { },
        select: () => { }
    },
    preventDefault: true,
    scrollMargin: 5,
    scrollContainer: 'body',
    autoDeleteHoverAfterSelect: true,// 选中后自动删除 hover 元素，否则会影响下次继续选择
    delay: 0, // 初始化延迟的毫秒数,有时候angular模板没有编译结束,通过选择器找不到元素
    eventContainer: '',// 事件绑定的区域,当 globalKey 设置为 false 时起作用,默认为 scrollContainer
    globalKey: false,// 是否是全局事件，如果为false,则会在 scrollContainer 绑定 keydown 事件，否则会在 document 上绑定
    keyActions: [ // use any and as many keys you want. available actions: 'select', 'up', 'down'
        { keyCode: 13, action: 'select' }, // enter
        { keyCode: 38, action: 'up' }, // up
        { keyCode: 40, action: 'down' }, // down
        { keyCode: 37, action: 'up' }, // left
        { keyCode: 39, action: 'down' } // right
    ]
};
