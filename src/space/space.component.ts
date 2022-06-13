import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { isString } from 'ngx-tethys/util';
import { takeUntil } from 'rxjs/operators';

import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    QueryList,
    TemplateRef
} from '@angular/core';

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

type Size = 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | number;

const SIZE_SPACE_MAP = {
    zero: 0,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xlg: 24
};

const DEFAULT_SIZE: Size = 'md';

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
    },
    providers: [UpdateHostClassService]
})
export class ThySpaceComponent extends _MixinBase implements OnInit, AfterContentInit {
    public space: number = SIZE_SPACE_MAP[DEFAULT_SIZE];

    /**
     * 大小，支持 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' 和自定义数字大小
     * @type string | number
     */
    @Input() set thySize(size: Size) {
        if (isString(size)) {
            this.space = SIZE_SPACE_MAP[size] === undefined ? SIZE_SPACE_MAP[DEFAULT_SIZE] : SIZE_SPACE_MAP[size];
        } else {
            this.space = size;
        }
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
        this.updateHostClassService.updateClass(align ? [`align-items-${align}`] : []);
    }

    @ContentChildren(ThySpaceItemDirective, { read: TemplateRef }) items!: QueryList<TemplateRef<HTMLElement>>;

    constructor(
        private cdr: ChangeDetectorRef,
        private updateHostClassService: UpdateHostClassService,
        elementRef: ElementRef<HTMLElement>
    ) {
        super();
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit(): void {}

    ngAfterContentInit(): void {
        this.items.changes.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}
