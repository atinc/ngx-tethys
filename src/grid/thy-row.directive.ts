import { Directive, Input, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

export type ThyRowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type ThyRowAlign = 'top' | 'middle' | 'bottom';

/**
 * 栅格行指令
 * @name thyRow
 */
@Directive({
    selector: '[thyRow]',
    host: {
        class: 'thy-row'
    },
    standalone: true
})
export class ThyRowDirective implements OnInit, OnChanges, AfterViewInit {
    /**
     * 栅格的间距
     */
    @Input() thyGutter: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };

    public actualGutter$ = new ReplaySubject<[number, number]>(1);

    private hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit() {
        this.setGutterStyle();
    }

    ngOnChanges() {
        this.setGutterStyle();
    }

    ngAfterViewInit(): void {}

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
        if (isString(this.thyGutter)) {
            throw Error(`thyGutter value can not be string type`);
        }
        return [this.thyGutter as number, 0];
    }
}
