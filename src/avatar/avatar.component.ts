import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { isNumber } from '../util/helpers';
import { AvatarMemberInfo } from './avatar-member-info';

const sizeArray = [24, 30, 38, 48, 68, 110, 160, 320];
const avatarSizeMap = [40, 80, 160, 320];

@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {

    @Input() src: string;
    @Input() name: string;
    @Input() size: number;
    @Input() shape: string;
    @Input() showName: boolean;
    @Input() member?: AvatarMemberInfo;

    public avatarSrc: string;
    public avatarSize?: number;
    public avatarName?: string;

    constructor() { }

    ngOnInit() {
        this.getAvatarSize();
        this.getAvatarName();
        this.getAvatarSrc();
    }

    private getAvatarSize() {
        if (isNumber(this.size * 1)) {
            if (sizeArray.indexOf(this.size * 1) > -1) {
                this.avatarSize = this.size;
            } else if (this.size * 1 > sizeArray[sizeArray.length - 1]) {
                this.avatarSize = sizeArray[sizeArray.length - 1];
            } else {
                this.avatarSize = sizeArray[0];
            }
        }
    }

    private getAvatarName() {
        this.avatarName = this.name || (this.member && this.member.display_name);
    }

    private getAvatarSrc() {
        this.avatarSrc = this.src || (this.member && this.member.avatar);
    }

}
