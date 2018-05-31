import { Component, Input, HostBinding } from '@angular/core';
import { isNumber } from '../util/helpers';
import { AvatarMemberInfo } from './avatar-member-info';

const sizeArray = [22, 24, 30, 38, 48, 68, 110, 160, 320];

@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html'
})
export class AvatarComponent {

    @HostBinding('attr.class') avatarClass = 'avatar';

    @Input() thyShowName: boolean;

    private _src: string;
    private _name: string;
    private _size: number;
    private _member: AvatarMemberInfo;

    public avatarSrc: string;
    public avatarSize?: number;
    public avatarName?: string;

    constructor() { }

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
        this._size = value;
        this.getAvatarSize();
    }

    @Input()
    set thyMember(value: AvatarMemberInfo) {
        this._member = value;
        this.getAvatarSrc();
        this.getAvatarName();
    }

    private getAvatarSize() {
        if (isNumber(this._size * 1)) {
            if (sizeArray.indexOf(this._size * 1) > -1) {
                this.avatarSize = this._size;
            } else if (this._size * 1 > sizeArray[sizeArray.length - 1]) {
                this.avatarSize = sizeArray[sizeArray.length - 1];
            } else {
                this.avatarSize = sizeArray[0];
            }
        }
    }

    private getAvatarName() {
        this.avatarName = this._name || (this._member && this._member.display_name);
    }

    private getAvatarSrc() {
        this.avatarSrc = this._src || (this._member && this._member.avatar);
    }

}
