import { Directive, Component, Input, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { isNumber } from '../util/helpers';

export type ThyBadgeStatusTypes = 'primary' | 'danger' | 'dot';

const badgeStatusTypeClassesMap: any = {
    'primary': 'badge-primary',
    'danger': 'badge-danger'
};


@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
})

export class ThyBadgeComponent {

    private _count?: number | string;

    private _maxCount?: number;

    private _type?: string;

    private _size?: string;

    private _isDot?: boolean;

    private nativeElement: any;

    public displayContent = '';

    public badgeClass = '';

    public isElement = true;

    @HostBinding('attr.class') bodyclass = `badge-body`;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
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
        this.isElement = false;
        this.getBadgeClass();
        this.renderer.addClass(this.nativeElement, `badge-body`);
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
        if (this._isDot || this.isElement && !this.displayContent) {
            this.badgeClass = `${this.badgeClass} badge-dot`;
        }
        this.badgeClass = this._size ? `${this.badgeClass} badge-${this._size}` : this.badgeClass;
    }
}
