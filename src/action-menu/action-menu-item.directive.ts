import { Directive, HostBinding, Input, ElementRef, OnInit, NgZone, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, shareReplay, takeUntil } from 'rxjs/operators';
import { UpdateHostClassService } from 'ngx-tethys/core';

export type ThyActionMenuItemType = 'danger' | 'success';

@Directive({
    selector: '[thyActionMenuItem]',
    providers: [UpdateHostClassService]
})
export class ThyActionMenuItemDirective implements OnInit, OnDestroy {
    @HostBinding('class.action-menu-item') className = true;

    @HostBinding('class.action-menu-item--disabled') disabled = false;

    @HostBinding('class.action-menu-item--danger') danger = false;

    @HostBinding('class.action-menu-item--success') success = false;

    @Input()
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    @Input()
    set thyType(value: ThyActionMenuItemType) {
        this[value] = true;
    }

    private destroy$ = new Subject<void>();

    constructor(private elementRef: ElementRef<HTMLElement>, private updateHostClassService: UpdateHostClassService, ngZone: NgZone) {
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

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    updateClass(classes: string[]) {
        this.updateHostClassService.updateClass(classes);
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

@Directive({
    selector: '[thyActionMenuItemIcon]'
})
export class ThyActionMenuItemIconDirective {
    @HostBinding('class.icon') className = true;

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuItemName]'
})
export class ThyActionMenuItemNameDirective {
    @HostBinding('class.name') className = true;

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuItemMeta]'
})
export class ThyActionMenuItemMetaDirective {
    @HostBinding('class.meta') className = true;

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuItemInfo]'
})
export class ThyActionMenuItemInfoDirective {
    @HostBinding('class.info') className = true;

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuItemExtendIcon]'
})
export class ThyActionMenuItemExtendIconDirective {
    @HostBinding('class.extend-icon') className = true;

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuItemActive]'
})
export class ThyActionMenuItemActiveDirective {
    @HostBinding('class.active') _isActive = false;

    @Input()
    set thyActionMenuItemActive(value: boolean) {
        this._isActive = coerceBooleanProperty(value);
    }

    constructor() {}
}
