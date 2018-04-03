import { Directive, Component, Input } from '@angular/core';
import { isNumber } from '../util/helpers';

export type ThyBadgeStatusTypes = 'primary' | 'danger' | 'dot';

const badgeStatusTypeClassesMap: any = {
    'primary': 'badge-primary',
    'danger': 'badge-danger'
};

// @Directive({
//     selector: '[thyBadge]'
// })

@Component({
    selector: 'thy-badge,thyBadge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.scss']
})

export class ThyBadgeComponent {

    // @Input() thyCount?: any;    // 标记显示的数字
    // @Input() thyMaxCount?: number; // thyCount > thyMaxCount 时，显示 {{thyMaxCount}}+
    // @Input() thyType: string;   // 标记的状态
    // @Input() thySize?: string; // 标记的大小

    private _count?: number | string;
    private _maxCount?: number;
    private _type?: string;
    private _size?: string;
    private _isDot?:boolean;

    public displayContent = '';
    public badgeClass = '';



    constructor() {
    }

    @Input()
    set thyCount(value: number | string) {
        this._count = value;
        this.getDisplayContent();
        this.getBadgeClass();
    }

    @Input()
    set thyMaxCount(value: number) {
        this._maxCount = value;
        this.getDisplayContent();
        this.getBadgeClass();
    }

    @Input()
    set thyType(value: string) {
        this._type = value;
        this.getBadgeClass();
    }

    @Input()
    set thyBadge(value: string) {
        this._type = value;
        this.getBadgeClass();
    }

    @Input()
    set thySize(value: string) {
        this._size = value;
    }

    @Input()
    set thyIsDot(value: boolean) {  // 右上角是点
        this._isDot = value;
        this.badgeClass = value ? `${this.badgeClass} badge-dot-content` : this.badgeClass;
        this.getDisplayContent();
        this.getBadgeClass();
    }

    private getDisplayContent(): void {
        if (this._isDot) {
            this.displayContent = '';
            return;
        }
        if (this._count && isNumber(this._count)) {
            this.displayContent = this._count > this._maxCount ? `${this._maxCount}+` : `${this._count}`;
            return;
        } else {
            this.displayContent = `${this._count}`;
            return;
        }
    }

    private getBadgeClass() {
        if (this._type) {
            this.badgeClass = `${this.badgeClass} ${badgeStatusTypeClassesMap[this._type]}`;
        }
        if (this._isDot) {

        } else if (!this.displayContent) {
            this.badgeClass = `${this.badgeClass} badge-dot`;
        }
        this.badgeClass = this._size ? `${this.badgeClass} badge-${this._size}` : this.badgeClass;
    }
}
