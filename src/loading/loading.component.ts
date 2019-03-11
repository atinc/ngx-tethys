import { Component, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyLoadingComponent {
    public isDone: boolean;

    public tip: string;

    public isMask: boolean;

    @Input()
    set thyDone(value: boolean | string) {
        this.isDone = inputValueToBoolean(value);
        this.changeDetectorRef.markForCheck();
    }

    @Input()
    set thyTip(value: string) {
        this.tip = value;
        this.changeDetectorRef.markForCheck();
    }

    // 不传或穿false,没有遮罩层，加载完成出现内容
    @Input()
    set thyIsMask(value: boolean | string) {
        this.isMask = inputValueToBoolean(value);
        this.changeDetectorRef.markForCheck();
    }

    @HostBinding('class.thy-loading') loadingClassName = true;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}
}
