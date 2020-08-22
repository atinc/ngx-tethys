import { Component, Input, Output, EventEmitter, ElementRef, HostBinding, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { isNumber, coerceBooleanProperty } from '../util/helpers';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ThyAvatarService } from './avatar.service';
import { helpers } from '../util';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const sizeArray = [22, 24, 28, 32, 36, 48, 68, 110, 160];

const DEFAULT_SIZE = 36;

export const thyAvatarSizeMap = {
    xxs: 22,
    xs: 24,
    sm: 32,
    md: 36,
    lg: 48
};

@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyAvatarComponent implements OnInit {
    _src: string;
    _name: string;
    _size: number;
    _showRemove = false;

    public avatarSrc: string;
    public avatarName?: string;
    public avatarNameSafeHtml?: SafeHtml;

    @HostBinding('class.thy-avatar') _isAvatar = true;

    @Output() thyOnRemove = new EventEmitter();

    @Input() thyShowName: boolean;

    @Input()
    set thySrc(value: string) {
        this._setAvatarSrc(value);
    }

    @Input()
    set thyName(value: string) {
        // this._name = value;
        this._setAvatarName(value);
    }

    @Input()
    set thySize(value: number | string) {
        if (thyAvatarSizeMap[value]) {
            this._setAvatarSize(thyAvatarSizeMap[value]);
        } else {
            this._setAvatarSize((value as number) * 1);
        }
    }

    @Input()
    set thyShowRemove(value: boolean) {
        this._showRemove = coerceBooleanProperty(value);
    }

    @Input() thyImgClass: string;

    @Input() thyDisabled: boolean;

    private _setAvatarSize(size: number) {
        if (sizeArray.indexOf(size) > -1) {
            this._size = size;
        } else if (size > sizeArray[sizeArray.length - 1]) {
            this._size = sizeArray[sizeArray.length - 1];
        } else {
            this._size = DEFAULT_SIZE;
        }
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
        if (helpers.isString(name)) {
            this.avatarName = name as string;
        } else {
            this.avatarName = value;
            this.avatarNameSafeHtml = name;
        }
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef,
        private thyAvatarService: ThyAvatarService,
        private domSanitizer: DomSanitizer
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        if (!this._size) {
            this._setAvatarSize(DEFAULT_SIZE);
        }
        this.updateHostClassService.updateClass([`thy-avatar-${this._size}`]);
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
    }
}
