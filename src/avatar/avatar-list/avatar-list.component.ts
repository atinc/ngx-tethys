import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, effect, input, Signal, TemplateRef, contentChildren } from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';
import { DEFAULT_SIZE, ThyAvatar } from '../avatar.component';

export const THY_AVATAR_ITEM_SPACE = 4;

export const THY_OVERLAP_AVATAR_ITEM_SPACE = -8;

export const enum ThyAvatarListMode {
    overlap = 'overlap',
    default = 'default'
}

export type ThyAvatarListModeType = 'overlap' | 'default';
/**
 * 头像列表组件
 * @name thy-avatar-list
 * @order 20
 */
@Component({
    selector: 'thy-avatar-list',
    templateUrl: `./avatar-list.component.html`,
    host: {
        class: 'thy-avatar-list',
        '[class.thy-avatar-list-overlap]': 'isOverlapMode()'
    },
    providers: [UpdateHostClassService],
    imports: [NgTemplateOutlet]
})
export class ThyAvatarList {
    public avatarItems: ThyAvatar[] = [];

    /**
     * 展示方式
     * @type  overlap | default
     */
    readonly thyMode = input<ThyAvatarListMode>(ThyAvatarListMode.default);

    readonly isOverlapMode = computed(() => {
        return this.thyMode() === ThyAvatarListMode.overlap;
    });

    /**
     * 头像大小
     * @type 16 | 22 | 24 | 28 | 32 | 36 | 44 | 48 | 68 | 110 | 160 | xxs(22px) | xs(24px) | sm(32px) | md(36px) | lg(48px)
     * @default 36
     */
    readonly thyAvatarSize = input<number | string>(DEFAULT_SIZE);

    /**
     *  append 自定义操作
     */
    readonly append = contentChild<TemplateRef<SafeAny>>('append');

    /**
     * @private
     */
    readonly avatarComponents = contentChildren<ThyAvatar>(ThyAvatar);

    constructor() {
        effect(() => {
            this.updateAvatarItems();
        });
    }

    private updateAvatarItems() {
        this.avatarItems = Array.from(this.avatarComponents());
        this.avatarItems.forEach((item, index) => {
            item.thySize.set(this.thyAvatarSize());
            item.elementRef.nativeElement.style.zIndex = this.avatarItems.length - index;
        });
    }
}
