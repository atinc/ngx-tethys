import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html'
})
export class ThyLoadingComponent {

    public isDone: boolean;

    public tip: string;

    public isMask: boolean;

    @Input()
    set thyDone(value: boolean | string) {
        this.isDone = inputValueToBoolean(value);
    }

    @Input()
    set thyTip(value: string) {
        this.tip = value;
    }

    // 不传或穿false,没有遮罩层，加载完成出现内容
    @Input()
    set thyIsMask(value: boolean | string) {
        this.isMask = inputValueToBoolean(value);
    }

    @HostBinding('class.thy-loading') loadingClassName = true;

    constructor() { }
}
