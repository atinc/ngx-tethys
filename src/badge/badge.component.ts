import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { isNumber } from '../util/helpers';

export type ThyBadgeStatusTypes = 'primary' | 'danger' | 'dot';

const badgeStatusTypeClassesMap: any = {
    'primary': 'badge-primary',
    'danger': 'badge-danger'
};

@Component({
    selector: 'thy-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.scss']
})

export class ThyBadgeComponent implements OnInit, OnChanges {

    @Input() thyCount?: any;    // 标记显示的数字
    @Input() thyMaxCount?: number; // thyCount > thyMaxCount 时，显示 {{thyMaxCount}}+
    @Input() thyStatus: string;   // 标记的状态
    @Input() thySize?: string; // 标记的大小

    displayContent?: string;
    badgeClass?: string;

    constructor() {
        this.displayContent = '';
        this.badgeClass = '';
    }

    ngOnChanges() {

    }

    ngOnInit() {
        this.getDisplayContent();
        this.getBadgeClass();
    }

    @Input()
    set thyIsDot(value: boolean) {  // 右上角是点
        this.badgeClass = value ? `${this.badgeClass} badge-dot-content` : this.badgeClass;
    }

    private getDisplayContent(): void {
        if (this.thyIsDot) {
            this.displayContent = '';
            return;
        }
        if (isNumber(this.thyCount)) {
            this.displayContent = this.thyCount > this.thyMaxCount ? `${this.thyMaxCount}+` : this.thyCount;
            return;
        } else {
            this.displayContent = this.thyCount;
            return;
        }
    }

    private getBadgeClass() {
        if (this.thyStatus) {
            this.badgeClass = `${this.badgeClass} ${badgeStatusTypeClassesMap[this.thyStatus]}`;
        }
        if (this.thyIsDot) {

        } else if (!this.displayContent) {
            this.badgeClass = `${this.badgeClass} badge-dot`;
        }
        this.badgeClass = this.thySize ? `${this.badgeClass} badge-${this.thySize}` : this.badgeClass;
    }
}
