import { Directive, Input, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { mixinUnsubscribe, MixinBase, Constructor, ThyUnsubscribe } from 'ngx-tethys/core';
import { isString } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

export type ThyRowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type ThyRowAlign = 'top' | 'middle' | 'bottom';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

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
export class ThyRowDirective extends _MixinBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    /**
     * 栅格的间距
     */
    @Input() thyGutter: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };

    public actualGutter$ = new ReplaySubject<[number, number]>(1);

    private hostRenderer = useHostRenderer();

    constructor() {
        super();
    }

    ngOnInit() {
        this._setGutterStyle();
    }

    ngOnChanges() {
        this._setGutterStyle();
    }

    ngAfterViewInit(): void {}

    private _setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this._getGutter();
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

    private _getGutter() {
        if (isString(this.thyGutter)) {
            throw Error(`thyGutter value can not be string type`);
        }
        return [this.thyGutter as number, 0];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
