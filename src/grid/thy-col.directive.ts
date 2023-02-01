import { Directive, Input, OnChanges, Optional, Host, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyRowDirective } from './thy-row.directive';
import { takeUntil } from 'rxjs/operators';
import { mixinUnsubscribe, MixinBase, Constructor, ThyUnsubscribe } from 'ngx-tethys/core';

export interface ThyColEmbeddedProperty {
    span?: number;
    pull?: number;
    push?: number;
    offset?: number;
    order?: number;
}

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

/**
 * 栅格列指令
 */
@Directive({
    selector: '[thyCol]',
    host: {
        class: 'thy-col'
    }
})
export class ThyColDirective extends _MixinBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    /**
     * 栅格项的占位列数
     * @default 24
     */
    @Input() thySpan: number | null = 24;

    private hostRenderer = useHostRenderer();

    constructor(@Optional() @Host() public thyRowDirective: ThyRowDirective) {
        super();
    }

    ngOnInit() {
        this._setHostClassMap();
    }

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        this._setHostClassMap();
    }

    ngAfterViewInit(): void {
        if (this.thyRowDirective) {
            this.thyRowDirective.actualGutter$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name: string, gutter: number) => {
                    this.hostRenderer.setStyle(name, `${gutter / 2}px`);
                };
                if (horizontalGutter > 0) {
                    renderGutter('padding-left', horizontalGutter);
                    renderGutter('padding-right', horizontalGutter);
                }
                if (verticalGutter > 0) {
                    renderGutter('padding-top', verticalGutter);
                    renderGutter('padding-bottom', verticalGutter);
                }
            });
        }
    }

    private _setHostClassMap() {
        this.hostRenderer.updateClassByMap({
            [`thy-col-${this.thySpan}`]: true
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
