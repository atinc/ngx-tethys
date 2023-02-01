import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { takeUntil } from 'rxjs/operators';

import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    HostBinding,
    Input,
    OnInit,
    QueryList,
    TemplateRef
} from '@angular/core';
import { ThySpacingSize, getNumericSize } from 'ngx-tethys/core';

/**
 * 间距组件项，使用结构性指令 *thySpaceItem 传入模板
 */
@Directive({
    selector: '[thySpaceItem]',
    host: {
        class: 'thy-space-item'
    }
})
export class ThySpaceItemDirective implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

const DEFAULT_SIZE: ThySpacingSize = 'md';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

/**
 * 间距组件
 */
@Component({
    selector: 'thy-space',
    templateUrl: './space.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-space'
    }
})
export class ThySpaceComponent extends _MixinBase implements OnInit, AfterContentInit {
    public space: number = getNumericSize(DEFAULT_SIZE);

    private hostRenderer = useHostRenderer();

    /**
     * 大小，支持 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' 和自定义数字大小
     * @type string | number
     */
    @Input() set thySize(size: ThySpacingSize) {
        this.space = getNumericSize(size, DEFAULT_SIZE);
    }

    /**
     * 间距垂直方向，默认是水平方向
     */
    @HostBinding(`class.thy-space-vertical`)
    @Input()
    @InputBoolean()
    thyVertical: boolean = false;

    // @ClassBinding(`align-items-{{value}}`)
    /**
     * 对齐方式，可选择 'start' | 'end' | 'baseline' | 'center'
     * @type string
     */
    @Input()
    set thyAlign(align: string) {
        this.hostRenderer.updateClass(align ? [`align-items-${align}`] : []);
    }

    @ContentChildren(ThySpaceItemDirective, { read: TemplateRef }) items!: QueryList<TemplateRef<HTMLElement>>;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {}

    ngAfterContentInit(): void {
        this.items.changes.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}
