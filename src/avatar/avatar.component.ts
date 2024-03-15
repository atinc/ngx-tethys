import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyAvatarService } from './avatar.service';
import { AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe } from './avatar.pipe';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgClass, NgStyle } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgClass, NgStyle, ThyIcon, AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe]
})
export class ThyAvatar implements OnInit {
    _src: string;
    _name: string;
    _size: number;
    _showRemove = false;

    public avatarSrc: string;
    public avatarName?: string;
    public avatarNameSafeHtml?: SafeHtml;

    @HostBinding('class.thy-avatar') _isAvatar = true;

    /**
     * * 已废弃，请使用 thyRemove
     * @deprecated
     */
    @Output() thyOnRemove = new EventEmitter();

    /**
     *  移除按钮的事件, 当 thyRemovable 为 true 时起作用
     */
    @Output() thyRemove = new EventEmitter();

    /**
     *  头像 img 加载 error 时触发
     */
    @Output() thyError: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * 是否展示人员名称
     * @default false
     */
    @Input() @InputBoolean() thyShowName: boolean;

    /**
     * 头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 srcTransform 方法实现转换
     *
     */
    @Input()
    set thySrc(value: string) {
        this._setAvatarSrc(value);
    }

    /**
     * 人员名称（可设置自定义名称，需通过自定义服务 ThyAvatarService，重写 nameTransform 方法去实现转换）
     */
    @Input()
    set thyName(value: string) {
        // this._name = value;
        this._setAvatarName(value);
    }

    /**
     * 头像大小
     * @type 16 | 22 | 24 | 28 | 32 | 36 | 44 | 48 | 68 | 110 | 160 | xxs(22px) | xs(24px) | sm(32px) | md(36px) | lg(48px)
     * @default md
     */
    @Input()
    set thySize(value: number | string) {
        if (thyAvatarSizeMap[value]) {
            this._setAvatarSize(thyAvatarSizeMap[value]);
        } else {
            this._setAvatarSize((value as number) * 1);
        }
    }

    /**
     * 已废弃，请使用 thyRemovable
     * @deprecated
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyShowRemove(value: boolean) {
        this._showRemove = coerceBooleanProperty(value);
    }

    /**
     * 是否展示移除按钮
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyRemovable(value: boolean) {
        this._showRemove = coerceBooleanProperty(value);
    }

    /**
     * 图片自定义类
     */
    @Input() thyImgClass: string;

    /**
     * 是否禁用
     * @default false
     */
    @Input() @InputBoolean() thyDisabled: boolean;

    /**
     * 图片加载策略
     * @type eager(立即加载) | lazy(延迟加载)
     */
    @Input() thyLoading?: ThyAvatarLoading;

    /**
     * 图片加载优先级
     * @type auto(默认) | high(高) | low(低)
     */
    @Input() thyFetchPriority?: ThyAvatarFetchPriority;

    private _setAvatarSize(size: number) {
        if (sizeArray.indexOf(size) > -1) {
            this._size = size;
        } else {
            this._size = this.findClosestSize(sizeArray, size);
        }
        this.hostRenderer.updateClass([`thy-avatar-${this._size}`]);
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

    private _setAvatarSrc(src: string) {
        if (src && this.thyAvatarService.ignoreAvatarSrcPaths.indexOf(src) < 0) {
            this._src = src;
        } else {
            this._src = null;
        }
    }

    private _setAvatarName(value: string) {
        const name = this.thyAvatarService.nameTransform(value);
        if (isString(name)) {
            this.avatarName = name as string;
        } else {
            this.avatarName = value;
            this.avatarNameSafeHtml = name;
        }
    }

    private hostRenderer = useHostRenderer();

    constructor(private thyAvatarService: ThyAvatarService, public elementRef: ElementRef) {}

    ngOnInit() {
        if (!this._size) {
            this._setAvatarSize(DEFAULT_SIZE);
        }
        this.hostRenderer.updateClass([`thy-avatar-${this._size}`]);
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
        this.thyRemove.emit($event);
    }

    avatarImgError($event: Event) {
        this._setAvatarSrc(null);
        this.thyError.emit($event);
    }
}
