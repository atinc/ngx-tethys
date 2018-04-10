import { Component, Input, HostBinding } from '@angular/core';
import { isBoolean } from '../util/helpers';

@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html'
})
export class ThyLoadingComponent {

    public isDone: boolean;

    public tip: string;

    @Input()
    set thyDone(value: boolean) {
        this.isDone = value;
    }

    @Input()
    set thyTip(value: string) {
        this.tip = value;
    }

    // 不传或穿false,没有遮罩层，加载完成出现内容
    @Input() thyIsMask:boolean;

    constructor() { }
}
