import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Signal,
    WritableSignal,
    computed,
    effect,
    inject,
    input,
    model,
    output,
    signal
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { isString, coerceBooleanProperty } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyAvatarService } from './avatar.service';
import { AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe } from './avatar.pipe';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgStyle } from '@angular/common';

const sizeArray = [16, 22, 24, 28, 32, 36, 44, 48, 68, 110, 160];

export const DEFAULT_SIZE = 36;

export const thyAvatarSizeMap = {
    xxs: 22,
    xs: 24,
    sm: 32,
    md: 36,
    lg: 48
};

/** https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading */
export type ThyAvatarLoading = 'eager' | 'lazy';

/** https://wicg.github.io/priority-hints/#idl-index */
export type ThyAvatarFetchPriority = 'high' | 'low' | 'auto';

/**
 * 头像组件
 * @name thy-avatar
 * @order 10
 */
@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html',
    host: {
        class: 'thy-avatar'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, NgStyle, ThyIcon, AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe]
})
export class ThyAvatar {
    private thyAvatarService = inject(ThyAvatarService);
    elementRef = inject(ElementRef);

    /**
     * * 已废弃，请使用 thyRemove
     * @deprecated
     */
    readonly thyOnRemove = output<Event>();

    /**
     *  移除按钮的事件，当 thyRemovable 为 true 时起作用
     */
    readonly thyRemove = output<Event>();

    /**
     *  头像 img 加载 error 时触发
     */
    readonly thyError = output<Event>();

    /**
     * 是否展示人员名称
     */
    readonly thyShowName = input(false, { transform: coerceBooleanProperty });

    /**
     * 头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 srcTransform 方法实现转换
     */
    readonly thySrc = input<string>();

    readonly src = computed(() => {
        if (this.isAvatarImgError()) {
            return null;
        }
        if (this.thySrc() && this.thyAvatarService.ignoreAvatarSrcPaths.indexOf(this.thySrc()) < 0) {
            return this.thySrc();
        }
        return null;
    });

    /**
     * 人员名称（可设置自定义名称，需通过自定义服务 ThyAvatarService，重写 nameTransform 方法去实现转换）
     */
    readonly thyName = input<string>();

    readonly avatarName: Signal<string> = computed(() => {
        const name = this.thyAvatarService.nameTransform(this.thyName());
        return isString(name) ? name : this.thyName();
    });

    readonly avatarNameSafeHtml: Signal<SafeHtml> = computed(() => {
        const name = this.thyAvatarService.nameTransform(this.thyName());
        if (!isString(name)) {
            return name;
        }
        return null;
    });

    /**
     * 头像大小
     * @type 16 | 22 | 24 | 28 | 32 | 36 | 44 | 48 | 68 | 110 | 160 | xxs(22px) | xs(24px) | sm(32px) | md(36px) | lg(48px)
     * @default md
     */
    readonly thySize = model<number | string>('md');

    readonly size: Signal<number> = computed(() => {
        const sizeKey = this.thySize() as 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
        if (thyAvatarSizeMap[sizeKey]) {
            return thyAvatarSizeMap[sizeKey];
        } else {
            const size = (this.thySize() as number) * 1;
            return sizeArray.indexOf(size) > -1 ? size : this.findClosestSize(sizeArray, size);
        }
    });

    /**
     * 已废弃，请使用 thyRemovable
     * @deprecated
     */
    readonly thyShowRemove = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否展示移除按钮
     */
    readonly thyRemovable = input(false, { transform: coerceBooleanProperty });

    readonly showRemove: Signal<boolean> = computed(() => this.thyRemovable() || this.thyShowRemove());

    /**
     * 图片自定义类
     */
    readonly thyImgClass = input<string>();

    /**
     * 是否禁用
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * 图片加载策略
     * @type eager(立即加载) | lazy(延迟加载)
     */
    readonly thyLoading = input<ThyAvatarLoading>();

    /**
     * 图片加载优先级
     * @type auto(默认) | high(高) | low(低)
     */
    readonly thyFetchPriority = input<ThyAvatarFetchPriority>();

    private isAvatarImgError: WritableSignal<boolean> = signal(false);

    private hostRenderer = useHostRenderer();

    constructor() {
        effect(() => {
            this.hostRenderer.updateClass([`thy-avatar-${this.size()}`]);
        });
    }

    private findClosestSize(sizeArray: number[], currentSize: number): number {
        let closestValue = sizeArray[0];
        let closestDifference = Math.abs(closestValue - currentSize);

        for (let i = 1; i < sizeArray.length; i++) {
            const currentDifference = Math.abs(sizeArray[i] - currentSize);
            if (currentDifference <= closestDifference) {
                closestValue = sizeArray[i];
                closestDifference = currentDifference;
            }
        }

        return closestValue;
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
        this.thyRemove.emit($event);
    }

    avatarImgError($event: Event) {
        this.isAvatarImgError.set(true);
        this.thyError.emit($event);
    }
}
