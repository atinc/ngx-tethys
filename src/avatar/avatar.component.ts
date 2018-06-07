import { Component, Input, ElementRef, HostBinding, OnInit } from '@angular/core';
import { isNumber } from '../util/helpers';
import { AvatarMemberInfo } from './avatar-member-info';
import { UpdateHostClassService } from '../shared/update-host-class.service';

const sizeArray = [22, 24, 30, 38, 48, 68, 110, 160, 320];
const DEFAULT_SIZE = 38;

@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html',
    providers: [
        UpdateHostClassService
    ]
})
export class ThyAvatarComponent implements OnInit {
    private _src: string;
    private _name: string;
    private _size: number;
    private _member: AvatarMemberInfo;

    public avatarSrc: string;
    public avatarName?: string;

    @HostBinding('class.thy-avatar') _isAvatar = true;

    @Input() thyShowName: boolean;

    @Input()
    set thySrc(value: string) {
        this._src = value;
        this.getAvatarSrc();
    }

    @Input()
    set thyName(value: string) {
        this._name = value;
        this.getAvatarName();
    }

    @Input()
    set thySize(value: number) {
        this._setAvatarSize(value * 1);
    }

    @Input()
    set thyMember(value: AvatarMemberInfo) {
        this._member = value;
        this.getAvatarSrc();
        this.getAvatarName();
    }

    private _setAvatarSize(size: number) {
        if (sizeArray.indexOf(size) > -1) {
            this._size = size;
        } else if (size > sizeArray[sizeArray.length - 1]) {
            this._size = sizeArray[sizeArray.length - 1];
        } else {
            this._size = DEFAULT_SIZE;
        }
    }

    private getAvatarName() {
        this.avatarName = this._name || (this._member && this._member.display_name);
    }

    private getAvatarSrc() {
        this.avatarSrc = this._src || (this._member && this._member.avatar);
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        if (!this._size) {
            this._setAvatarSize(DEFAULT_SIZE);
        }
        this.updateHostClassService.updateClass([`thy-avatar-${this._size}`]);
    }
}
