import {
    Directive,
    HostBinding,
    Input,
    OnChanges,
    ElementRef,
    Optional,
    Host,
    AfterContentInit,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    OnInit
} from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';
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

@Directive({
    selector: '[thyCol]',
    providers: [UpdateHostClassService],
    host: {
        class: 'thy-col'
    }
})
export class ThyColDirective extends _MixinBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() thyFlex: string | number | null = null;
    @Input() thySpan: number | null = 24;
    @Input() thyOrder: number | null = null;
    @Input() thyOffset: number | null = null;
    @Input() thyPush: number | null = null;
    @Input() thyPull: number | null = null;
    @Input() thyXs: number | ThyColEmbeddedProperty | null = null;
    @Input() thySm: number | ThyColEmbeddedProperty | null = null;
    @Input() thyMd: number | ThyColEmbeddedProperty | null = null;
    @Input() thyLg: number | ThyColEmbeddedProperty | null = null;
    @Input() thyXl: number | ThyColEmbeddedProperty | null = null;
    @Input() thyXXl: number | ThyColEmbeddedProperty | null = null;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private updateHostClassService: UpdateHostClassService,
        @Optional() @Host() public thyRowDirective: ThyRowDirective
    ) {
        super();
        this.updateHostClassService.initializeElement(this.elementRef);
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
                    const nativeElement = this.elementRef.nativeElement;
                    this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
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
        this.updateHostClassService.updateClassByMap({
            [`thy-col-${this.thySpan}`]: true
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
