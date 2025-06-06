import { Directive, effect, input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

export type ThyRowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type ThyRowAlign = 'top' | 'middle' | 'bottom';
export interface ThyGutterType {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}

/**
 * 栅格行指令
 * @name thyRow
 * @order 30
 */
@Directive({
    selector: '[thyRow]',
    host: {
        class: 'thy-row'
    }
})
export class ThyRowDirective {
    /**
     * 栅格的间距
     */
    readonly thyGutter = input<ThyGutterType | number>();

    public actualGutter$ = new ReplaySubject<[number, number]>(1);

    private hostRenderer = useHostRenderer();

    constructor() {
        effect(() => {
            this.setGutterStyle();
        });
    }

    private setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this.getGutter();
        this.actualGutter$.next([horizontalGutter, verticalGutter]);
        const renderGutter = (name: string, gutter: number) => {
            this.hostRenderer.setStyle(name, `-${gutter / 2}px`);
        };
        if (horizontalGutter > 0) {
            renderGutter('margin-left', horizontalGutter);
            renderGutter('margin-right', horizontalGutter);
        }
        if (verticalGutter > 0) {
            renderGutter('margin-top', verticalGutter);
            renderGutter('margin-bottom', verticalGutter);
        }
    }

    private getGutter() {
        const thyGutter = this.thyGutter();
        if (isString(thyGutter)) {
            throw Error(`thyGutter value can not be string type`);
        }
        return [thyGutter as number, 0];
    }
}
