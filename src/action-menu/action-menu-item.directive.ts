import { Directive, HostBinding, Input, ElementRef, OnInit, NgZone, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, shareReplay, takeUntil } from 'rxjs/operators';

export type ThyActionMenuItemType = 'danger' | 'success';

/**
 * 操作菜单项
 * @name thyActionMenuItem
 */
@Directive({
    selector: '[thyActionMenuItem]',
    standalone: true
})
export class ThyActionMenuItemDirective implements OnInit, OnDestroy {
    @HostBinding('class.action-menu-item') className = true;

    @HostBinding('class.action-menu-item--disabled') disabled = false;

    @HostBinding('class.action-menu-item--danger') danger = false;

    @HostBinding('class.action-menu-item--success') success = false;

    /**
     * 是否禁用
     * @default false
     */
    @Input()
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    /**
     * 菜单的类型
     * @type danger | success
     */
    @Input()
    set thyType(value: ThyActionMenuItemType) {
        this[value] = true;
    }

    private destroy$ = new Subject<void>();

    private hostRenderer = useHostRenderer();

    constructor(private elementRef: ElementRef<HTMLElement>, ngZone: NgZone) {
        ngZone.runOutsideAngular(() =>
            fromEvent(elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (this.disabled) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                })
        );
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    updateClass(classes: string[]) {
        this.hostRenderer.updateClass(classes);
    }

    getWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }

    getElement() {
        return this.elementRef.nativeElement;
    }

    bindMouseenterEvent() {
        return fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(debounceTime(100), shareReplay());
    }
}

/**
 * @name thyActionMenuItemIcon
 */
@Directive({
    selector: '[thyActionMenuItemIcon]',
    standalone: true
})
export class ThyActionMenuItemIconDirective {
    @HostBinding('class.icon') className = true;

    constructor() {}
}

/**
 * @name thyActionMenuItemName
 */
@Directive({
    selector: '[thyActionMenuItemName]',
    standalone: true
})
export class ThyActionMenuItemNameDirective {
    @HostBinding('class.name') className = true;

    constructor() {}
}

/**
 * @name thyActionMenuItemMeta
 */
@Directive({
    selector: '[thyActionMenuItemMeta]',
    standalone: true
})
export class ThyActionMenuItemMetaDirective {
    @HostBinding('class.meta') className = true;

    constructor() {}
}

/**
 * @name thyActionMenuItemInfo
 */
@Directive({
    selector: '[thyActionMenuItemInfo]',
    standalone: true
})
export class ThyActionMenuItemInfoDirective {
    @HostBinding('class.info') className = true;

    constructor() {}
}

/**
 * @name thyActionMenuItemExtendIcon
 */
@Directive({
    selector: '[thyActionMenuItemExtendIcon]',
    standalone: true
})
export class ThyActionMenuItemExtendIconDirective {
    @HostBinding('class.extend-icon') className = true;

    constructor() {}
}

/**
 * 操作菜单项激活指令
 * @name thyActionMenuItemActive
 */
@Directive({
    selector: '[thyActionMenuItemActive]',
    standalone: true
})
export class ThyActionMenuItemActiveDirective {
    @HostBinding('class.active') _isActive = false;

    /**
     * 是否激活的表达式
     * @default false
     */
    @Input()
    set thyActionMenuItemActive(value: boolean) {
        this._isActive = coerceBooleanProperty(value);
    }

    constructor() {}
}
