import { Directive, Component, Input, HostBinding, Renderer2, ElementRef, OnInit } from '@angular/core';
import { isNumber } from '../util/helpers';

export type ThyBadgeStatusTypes = 'primary' | 'danger' | 'dot';

const badgeStatusTypeClassesMap: any = {
    'primary': 'thy-badge-primary',
    'danger': 'thy-badge-danger'
};


@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
})

export class ThyBadgeComponent implements OnInit {

    private _count?: number | string;

    private _maxCount?: number;

    private _type?: string;

    private _size?: string;

    private _isDot?: boolean;

    private nativeElement: any;

    public displayContent = '';

    public badgeClass = '';

    public isElement = true;

    private _initialized = false;

    private _badgeClasses: string[] = [];

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
    }

    @Input()
    set thyCount(value: number | string) {
        this._count = value;
        if (this._initialized) {
            this.getDisplayContent();
            this.getBadgeClass();
        }
    }

    @Input()
    set thyMaxCount(value: number) {
        this._maxCount = value;
        if (this._initialized) {
            this.getDisplayContent();
            this.getBadgeClass();
        }
    }

    @Input()
    set thyType(value: string) {
        this._type = value;
        if (this._initialized) {
            this.getBadgeClass();
        }
    }

    @HostBinding('attr.class')
    @Input()
    get thyBadge(): string {
        return this.isElement ? 'badge-body' : `badge${this.badgeClass}`;
    }
    set thyBadge(value: string) {
        this._type = value;
        this.isElement = false;
        if (this._initialized) {
            this.getBadgeClass();
        }
    }

    @Input()
    set thySize(value: string) {
        this._size = value;
    }

    @Input()
    set thyIsDot(value: boolean) {  // 右上角是点
        this._isDot = value;
        this.badgeClass = value ? `${this.badgeClass} thy-badge-dot-content` : this.badgeClass;
        if (this._initialized) {
            this.getDisplayContent();
            this.getBadgeClass();
        }
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
            this._badgeClasses.push(badgeStatusTypeClassesMap[this._type]);
        }

        if (this._isDot || this.isElement && !this.displayContent) {
            this._badgeClasses.push('thy-badge-dot');
        }

        if (this._size) {
            this._badgeClasses.push(`thy-badge-${this._size}`);
        }

        if (this._badgeClasses.length > 0) {
            this.badgeClass = this._badgeClasses.join(' ');
        }
    }

    ngOnInit() {
        this.getDisplayContent();
        this.getBadgeClass();
        this._initialized = true;
    }


}
