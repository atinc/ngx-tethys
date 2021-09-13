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

type Size = 'sm' | 'md' | 'lg' | number;

const SIZE_SPACE_MAP = {
    sm: 10,
    md: 20,
    lg: 30
};

const DEFAULT_SIZE: Size = 'md';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

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

    @Input() set thySize(size: Size) {
        if (isString(size)) {
            this.space = SIZE_SPACE_MAP[size] || SIZE_SPACE_MAP[DEFAULT_SIZE];
        } else {
            this.space = size;
        }
    }

    @HostBinding(`class.thy-space-vertical`)
    @Input()
    @InputBoolean()
    thyVertical: boolean = false;

    // @ClassBinding(`align-items-{{value}}`)
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
