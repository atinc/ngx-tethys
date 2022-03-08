import { Directive, HostBinding, Input, Component, HostListener, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';

export type ThyDropdownMenuItemType = 'default' | 'danger' | 'success' | '';

/**
 * 菜单项
 */
@Directive({
    selector: '[thyDropdownMenuItem]',
    providers: [UpdateHostClassService]
})
export class ThyDropdownMenuItemDirective implements OnInit {
    @HostBinding('class.dropdown-menu-item') className = true;

    @HostBinding('class.dropdown-menu-item--disabled') disabled = false;

    @HostBinding('class.dropdown-menu-item--danger') danger = false;

    @HostBinding('class.dropdown-menu-item--success') success = false;

    /**
     * 菜单项类型
     * @default default
     */
    @Input()
    set thyType(value: ThyDropdownMenuItemType) {
        this[value] = true;
    }

    /**
     * 菜单项是否处于禁用状态
     */
    @Input()
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    constructor(private elementRef: ElementRef<HTMLElement>, private updateHostClassService: UpdateHostClassService) {}

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    updateClass(classes: string[]) {
        this.updateHostClassService.updateClass(classes);
    }

    getElement() {
        return this.elementRef.nativeElement;
    }

    bindMouseenterEvent() {
        return fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(debounceTime(100), shareReplay());
    }
}

/**
 * 设置为菜单项图标
 */
@Directive({
    selector: '[thyDropdownMenuItemIcon]'
})
export class ThyDropdownMenuItemIconDirective {
    @HostBinding('class.icon') className = true;

    constructor() {}
}

/**
 * 设置为菜单项名称
 */
@Directive({
    selector: '[thyDropdownMenuItemName]'
})
export class ThyDropdownMenuItemNameDirective {
    @HostBinding('class.name') className = true;

    constructor() {}
}

/**
 * 设置为菜单项名称后的补充信息
 */
@Directive({
    selector: '[thyDropdownMenuItemMeta]'
})
export class ThyDropdownMenuItemMetaDirective {
    @HostBinding('class.meta') className = true;

    constructor() {}
}

/**
 * 设置为菜单项的描述
 */
@Directive({
    selector: '[thyDropdownMenuItemDesc]'
})
export class ThyDropdownMenuItemDescDirective {
    @HostBinding('class.desc') className = true;

    constructor() {}
}

/**
 * 菜单项的后置扩展图标，用于显示是否选中或者子菜单示意
 */
@Directive({
    selector: '[thyDropdownMenuItemExtendIcon]'
})
export class ThyDropdownMenuItemExtendIconDirective {
    @HostBinding('class.extend-icon') className = true;

    constructor() {}
}

/**
 * 菜单项是否激活指令
 */
@Directive({
    selector: '[thyDropdownMenuItemActive]'
})
export class ThyDropdownMenuItemActiveDirective {
    /**
     * 是否激活
     * @default false
     */
    @HostBinding('class.active')
    @Input()
    @InputBoolean()
    thyDropdownMenuItemActive: boolean | string;

    constructor() {}
}
