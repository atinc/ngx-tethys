import { Component, Input, HostBinding } from '@angular/core';
import { isBoolean } from '../util/helpers';

@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html'
})
export class ThyLoadingComponent {

    public isDone: boolean | string;

    public tip: string;

    @HostBinding('style.display')
    @Input()
    get thyDone() {
        return this.setDisplay(this.isDone);
    }
    set thyDone(value: boolean | string) {
        this.isDone = value;
    }

    @Input()
    set thyTip(value: string) {
        this.tip = value;
    }

    private setDisplay(value: boolean | string): boolean | string {
        if (isBoolean(value)) {
            return value ? 'none' : 'block';
        } else {
            return value === 'true' ? 'none' : 'block';
        }
    }

    constructor() { }
}
